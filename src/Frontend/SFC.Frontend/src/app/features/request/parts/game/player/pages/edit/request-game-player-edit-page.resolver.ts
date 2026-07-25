import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { Observable, of } from "rxjs";
import { IResolverModel } from "@core/models";
import { buildResolverModel, getRouteId } from "@core/utils";
import { EnumService } from "@share/services";
import { IRequestGamePlayerEditPageModel } from "./models/request-game-player-edit-page.model";

export const RequestGamePlayerEditPageResolver: ResolveFn<IResolverModel<IRequestGamePlayerEditPageModel>> =
    (snapshot: ActivatedRouteSnapshot): Observable<IResolverModel<IRequestGamePlayerEditPageModel>> => {
        const id: number = getRouteId(snapshot),
            enumService: EnumService = inject(EnumService);

        return of(buildResolverModel({ Message: '', Errors: null, Success: true }, {}));
    };