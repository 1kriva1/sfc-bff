import { inject, Injectable } from '@angular/core';
import { Router, CanMatchFn } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerViewService } from '@share/services';
import { ProfileRoute } from '@share/enums';
import { RouteKey } from '@core/enums';

@Injectable({ providedIn: 'root' })
class OnlyNewProfileService {

    constructor(private playerViewService: PlayerViewService, private router: Router) { }

    public canMatch(): Observable<boolean> | boolean {
        if (this.playerViewService.playerCreated) {
            this.router.navigate([`${ProfileRoute.Profiles}/${this.playerViewService.playerId.value}/${RouteKey.Edit}`]);
            return false;
        }

        return true;
    }
}

export const CanMatchOnlyNewProfile: CanMatchFn = (): Observable<boolean> | boolean =>
    inject(OnlyNewProfileService).canMatch();