import { inject, Injectable } from '@angular/core';
import { Router, CanMatchFn } from '@angular/router';
import { Observable } from 'rxjs';
import { RoutKey } from '@core/enums';
import { PlayerService } from '@share/services';

@Injectable({ providedIn: 'root' })
class OnlyNewProfileService {

    constructor(private playerService: PlayerService, private router: Router) { }

    public canMatch(): Observable<boolean> | boolean {
        if (this.playerService.playerCreated) {
            this.router.navigate([`${RoutKey.Profiles}/${this.playerService.playerId.value}/${RoutKey.Edit}`]);
            return false;
        }

        return true;
    }
}

export const CanMatchOnlyNewProfile: CanMatchFn = (): Observable<boolean> | boolean =>
    inject(OnlyNewProfileService).canMatch();