import { APP_INITIALIZER, Injectable } from "@angular/core";
import { catchError, EMPTY, Observable, switchMap } from "rxjs";
import { PlayerService, IdentityService } from "@share/services";

@Injectable({
    providedIn: 'root',
})
export class PlayerInitializer {

    constructor(private identityService: IdentityService, private playerService: PlayerService) { }

    public init(): Observable<any> {
        return this.identityService.getIsAuthenticated().pipe(
            switchMap((isAuthenticated: boolean) => (isAuthenticated
                ? this.playerService.get()
                    .pipe(catchError(() => this.identityService.logout()))
                : EMPTY))
        );
    }
}

function init() {
    return {
        provide: APP_INITIALIZER,
        useFactory: (initializer: PlayerInitializer) => () => initializer.init(),
        deps: [PlayerInitializer],
        multi: true,
    };
}

export const PlayerModule = { init: init };