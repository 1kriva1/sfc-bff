import { inject, Injectable } from '@angular/core';
import { Router, CanMatchFn } from '@angular/router';
import { map, Observable } from 'rxjs';
import { buildPath } from '../../utils';
import { IdentityService } from '@share/services';
import { HomeRoute } from '@share/enums';

@Injectable({
    providedIn: 'root'
})
class OnlyAnonymousService {

    constructor(private router: Router, private identityService: IdentityService) { }

    public canMatch(): Observable<boolean> {
        return this.identityService.getIsAnonymous().pipe(            
            map((isAnonymous: boolean) => {
                if (!isAnonymous) {
                    this.router.navigate([buildPath(HomeRoute.Home)]);
                }

                return isAnonymous;
            })
        )
    }
}

export const CanMatchOnlyAnonymous: CanMatchFn = (): Observable<boolean> =>
    inject(OnlyAnonymousService).canMatch();