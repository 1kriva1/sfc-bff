import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { catchError, Observable, of, map } from "rxjs";
import { BaseErrorResponse, IResolverModel } from "@core/models";
import { buildErrorResolverModel, buildResolverModel, getRouteId } from "@core/utils";
import { EnumService, IGetTeamPlayerRequestResponse, RequestTeamPlayerService } from "@share/services";
import { ITeamPlayerRequestModel } from "@share/models/request/team-player-request.model";
import { mapTeamPlayerRequestModel } from "@share/mappers/team-player-request.mapper";
import { PlayerConstants, TeamConstants } from "@share/constants";

export const RequestTeamPlayerViewPageResolver: ResolveFn<IResolverModel<ITeamPlayerRequestModel>> =
    (snapshot: ActivatedRouteSnapshot): Observable<IResolverModel<ITeamPlayerRequestModel>> => {
        const id: number | null = getRouteId(snapshot),
            teamId: number = getRouteId(snapshot, TeamConstants.ID_ROUTE_PATH),
            playerId: number = getRouteId(snapshot, PlayerConstants.ID_ROUTE_PATH),
            enumService: EnumService = inject(EnumService),
            requestTeamPlayerService: RequestTeamPlayerService = inject(RequestTeamPlayerService);

        return requestTeamPlayerService.get(id, teamId, playerId).pipe(
            map((response: IGetTeamPlayerRequestResponse) => buildResolverModel(response, mapTeamPlayerRequestModel(response.Request, enumService))),
            catchError((error: BaseErrorResponse) => of(buildErrorResolverModel<ITeamPlayerRequestModel>(error)))
        );
    };