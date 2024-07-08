import { inject, Injectable } from '@angular/core';
import { Router, CanMatchFn } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RoutKey } from '../../enums';
import { buildPath } from '../../utils';
import { IdentityService } from '@share/services';

@Injectable({
    providedIn: 'root'
})
class OnlyAnonymousService {

    constructor(private router: Router, private identityService: IdentityService) { }

    public canMatch(): Observable<boolean> {
        return this.identityService.getIsAnonymous().pipe(            
            map((isAnonymous: boolean) => {
                if (!isAnonymous) {
                    this.router.navigate([buildPath(RoutKey.Home)]);
                }

                return isAnonymous;
            })
        )
    }
}

export const CanMatchOnlyAnonymous: CanMatchFn = (): Observable<boolean> =>
    inject(OnlyAnonymousService).canMatch();