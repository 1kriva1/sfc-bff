import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { WINDOW } from 'ngx-sfc-common';
import {
    catchError, filter, map,
    Observable, of, shareReplay, tap
} from 'rxjs';
import { Claim } from './claim.model';
import { IdentityConstants } from './identity.constants';
import { Session } from './session.type';

@Injectable({
    providedIn: 'root'
})
export class IdentityService {

    private session$: Observable<Session> | null = null

    constructor(private http: HttpClient, @Inject(WINDOW) private window: Window) { }

    public getSession(ignoreCache: boolean = false): Observable<Session> {
        if (!this.session$ || ignoreCache) {
            this.session$ = this.http.get<Session>(IdentityConstants.IDENTITY_USER_URL).pipe(
                catchError(() => of(IdentityConstants.ANONYMOUS)),
                shareReplay(IdentityConstants.CACHE_SIZE)
            );
        }

        return this.session$;
    }

    public getIsAuthenticated(ignoreCache: boolean = false): Observable<boolean> {
        return this.getSession(ignoreCache).pipe(
            map(this.userIsAuthenticated)
        );
    }

    public getIsAnonymous(ignoreCache: boolean = false): Observable<boolean> {
        return this.getSession(ignoreCache).pipe(
            map(this.userIsAnonymous)
        );
    }

    public getUserName(ignoreCache: boolean = false): Observable<string | undefined> {
        return this.getSession(ignoreCache).pipe(
            filter(this.userIsAuthenticated),
            map(s => s.find(c => c.type === IdentityConstants.USERNAME_CLAIM_NAME)?.value)
        );
    }

    public getLogoutUrl(ignoreCache: boolean = false): Observable<string | undefined> {
        return this.getSession(ignoreCache).pipe(
            filter(this.userIsAuthenticated),
            map(s => s.find(c => c.type === IdentityConstants.LOGOUT_URL_CLAIM_NAME)?.value)
        );
    }

    public authenticate(): void {
        this.window.location.href = IdentityConstants.LOGIN_URL;
    }

    public logout(): Observable<string | undefined> {
        return this.getLogoutUrl().pipe(
            tap((logoutUrl: string | undefined) => {
                if (logoutUrl) {
                    this.window.location.href = logoutUrl;
                }
            })
        );
    }

    private userIsAuthenticated(session: Session): session is Claim[] {
        return session !== null;
    }

    private userIsAnonymous(session: Session): session is null {
        return session === null;
    }
}