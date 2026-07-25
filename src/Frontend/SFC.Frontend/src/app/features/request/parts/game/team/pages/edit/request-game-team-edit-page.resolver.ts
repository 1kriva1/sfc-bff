import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { Observable, of } from "rxjs";
import { IResolverModel } from "@core/models";
import { buildResolverModel, getRouteId } from "@core/utils";
import { EnumService } from "@share/services";
import { IRequestGameTeamEditPageModel } from "./models/request-game-team-edit-page.model";

export const RequestGameTeamEditPageResolver: ResolveFn<IResolverModel<IRequestGameTeamEditPageModel>> =
    (snapshot: ActivatedRouteSnapshot): Observable<IResolverModel<IRequestGameTeamEditPageModel>> => {
        const id: number = getRouteId(snapshot),
            enumService: EnumService = inject(EnumService);

        return of(buildResolverModel({ Message: '', Errors: null, Success: true }, {}));
    };