import { inject, Injectable } from '@angular/core';
import { Router, CanMatchFn } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RoutKey } from '../../enums';
import { IdentityService } from '@share/services/identity/identity.service';
import { buildPath } from '@core/utils';

@Injectable({
    providedIn: 'root'
})
class OnlyAuthenticatedService {

    constructor(private router: Router, private identityService: IdentityService) { }

    public canMatch(): Observable<boolean> {
        return this.identityService.getIsAuthenticated().pipe(
            map((isAuthenticated: boolean) => {
                if (!isAuthenticated) {
                    this.router.navigate([buildPath(RoutKey.Welcome)]);
                    this.identityService.authenticate();
                }

                return isAuthenticated;
            })
        );
    }
}

export const CanMatchOnlyAuthenticated: CanMatchFn = (): Observable<boolean> =>
    inject(OnlyAuthenticatedService).canMatch();