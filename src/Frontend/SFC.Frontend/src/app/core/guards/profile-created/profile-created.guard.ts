import { inject, Injectable } from '@angular/core';
import { Router, CanMatchFn } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerViewService } from '@share/services';
import { RouteKey } from '../../enums';
import { ProfileRoute } from '@share/enums';

@Injectable({ providedIn: 'root' })
class ProfileCreatedService {

    constructor(private playerViewService: PlayerViewService, private router: Router) { }

    public canMatch(): Observable<boolean> | boolean {
        if (!this.playerViewService.playerCreated) {
            this.router.navigate([`${ProfileRoute.Profiles}/${RouteKey.Create}`]);
            return false;
        }

        return true;
    }
}

export const CanMatchOnlyCreatedProfile: CanMatchFn = (): Observable<boolean> | boolean =>
    inject(ProfileCreatedService).canMatch();