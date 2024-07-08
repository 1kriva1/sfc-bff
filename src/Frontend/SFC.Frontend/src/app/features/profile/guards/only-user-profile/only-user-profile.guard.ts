import { inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, UrlTree, CanActivateFn } from '@angular/router';
import { isNullOrEmptyString } from 'ngx-sfc-common';
import { Observable } from 'rxjs';
import { RoutKey } from '@core/enums';
import { buildPath } from '@core/utils';
import { PlayerService } from '@share/services';

@Injectable({ providedIn: 'root' })
class OnlyUserProfileService {

    constructor(private playerService: PlayerService, private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot)
        : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if (this.playerService.playerCreated) {
            const playerId: string | null = route.paramMap.get('id');

            if (isNullOrEmptyString(playerId))
                return this.redirectToPlayerProfile();

            const storedPlayerId: number = this.playerService.playerId.value!,
                urlPlayerId: number = +playerId!;

            return storedPlayerId != urlPlayerId
                ? this.redirectToPlayerProfile()
                : true;
        }

        this.router.navigate([buildPath(`${RoutKey.Profiles}/${RoutKey.Create}`)]);
        return false;
    }

    private redirectToPlayerProfile(): boolean {
        this.router.navigate([`${RoutKey.Profiles}/${this.playerService.playerId.value}/${RoutKey.Edit}`]);
        return false;
    }
}

export const CanActivateOnlyUserProfile: CanActivateFn = (route: ActivatedRouteSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> =>
    inject(OnlyUserProfileService).canActivate(route);