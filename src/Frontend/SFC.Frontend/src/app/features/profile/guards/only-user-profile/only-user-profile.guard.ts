import { inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, UrlTree, CanActivateFn } from '@angular/router';
import { isNullOrEmptyString } from 'ngx-sfc-common';
import { Observable } from 'rxjs';
import { RouteKey } from '@core/enums';
import { buildPath } from '@core/utils';
import { PlayerViewService } from '@share/services';
import { ProfileRoute } from '@share/enums';

@Injectable({ providedIn: 'root' })
class OnlyUserProfileService {

    constructor(private playerViewService: PlayerViewService, private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot)
        : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if (this.playerViewService.playerCreated) {
            const playerId: string | null = route.paramMap.get('id');

            if (isNullOrEmptyString(playerId))
                return this.redirectToPlayerProfile();

            const storedPlayerId: number = this.playerViewService.playerId.value!,
                urlPlayerId: number = +playerId!;

            return storedPlayerId != urlPlayerId
                ? this.redirectToPlayerProfile()
                : true;
        }

        this.router.navigate([buildPath(`${ProfileRoute.Profiles}/${RouteKey.Create}`)]);
        return false;
    }

    private redirectToPlayerProfile(): boolean {
        this.router.navigate([`${ProfileRoute.Profiles}/${this.playerViewService.playerId.value}/${RouteKey.Edit}`]);
        return false;
    }
}

export const CanActivateOnlyUserProfile: CanActivateFn = (route: ActivatedRouteSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> =>
    inject(OnlyUserProfileService).canActivate(route);