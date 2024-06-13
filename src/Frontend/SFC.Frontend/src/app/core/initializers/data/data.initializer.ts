import { APP_INITIALIZER, Injectable } from "@angular/core";
import { IEnumsModel } from "@share/services/enum/models/enums.model";
import { EnumService, IdentityService } from "@share/services";
import { EMPTY, Observable, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class DataInitializer {

    constructor(private identityService: IdentityService, private enumService: EnumService) { }

    init(): Observable<IEnumsModel> {
        return this.identityService.getIsAuthenticated().pipe(
            switchMap((isAuthenticated: boolean) => (isAuthenticated
                ? this.enumService.load()
                : EMPTY))
        );
    }
}

function init() {
    return {
        provide: APP_INITIALIZER,
        useFactory: (initializer: DataInitializer) => () => initializer.init(),
        deps: [DataInitializer],
        multi: true,
    };
}

export const DataModule = { init: init };