import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { catchError, Observable, of, map } from "rxjs";
import { BaseErrorResponse, IResolverModel } from "@core/models";
import { buildErrorResolverModel, buildResolverModel, getRouteId } from "@core/utils";
import { EnumService, IGetTeamSchemeResponse, SchemeTeamService } from "@share/services";
import { ISchemeTeamModel } from "@share/models";
import { mapTeamSchemeModel } from "@share/mappers";
import { SchemeConstants } from "@share/constants";

export const SchemeTeamEditPageResolver: ResolveFn<IResolverModel<ISchemeTeamModel>> =
    (snapshot: ActivatedRouteSnapshot): Observable<IResolverModel<ISchemeTeamModel>> => {
        const id: number = getRouteId(snapshot, SchemeConstants.ID_ROUTE_PATH),
            enumService: EnumService = inject(EnumService),
            schemeTeamService: SchemeTeamService = inject(SchemeTeamService);

        return schemeTeamService.get(id).pipe(
            map((response: IGetTeamSchemeResponse) => buildResolverModel(response, mapTeamSchemeModel(response.Scheme, enumService))),
            catchError((error: BaseErrorResponse) => of(buildErrorResolverModel<ISchemeTeamModel>(error)))
        );
    };