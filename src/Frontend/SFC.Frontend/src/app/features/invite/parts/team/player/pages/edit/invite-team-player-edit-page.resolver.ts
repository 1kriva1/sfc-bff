import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { catchError, Observable, of, map } from "rxjs";
import { BaseErrorResponse, IResolverModel } from "@core/models";
import { buildErrorResolverModel, buildResolverModel, getRouteId } from "@core/utils";
import { EnumService, IGetTeamPlayerInviteResponse, InviteTeamPlayerService } from "@share/services";
import { mapTeamPlayerInviteModel } from "@share/mappers/team-player-invite.mapper";
import { ITeamPlayerInviteModel } from "@share/models/invite/team-player-invite.model";
import { PlayerConstants, TeamConstants } from "@share/constants";

export const InviteTeamPlayerEditPageResolver: ResolveFn<IResolverModel<ITeamPlayerInviteModel>> =
    (route: ActivatedRouteSnapshot): Observable<IResolverModel<ITeamPlayerInviteModel>> => {
        const id: number = getRouteId(route),
            teamId: number = getRouteId(route, TeamConstants.ID_ROUTE_PATH),
            playerId: number = getRouteId(route, PlayerConstants.ID_ROUTE_PATH),
            enumService: EnumService = inject(EnumService),
            teamPlayerInviteService: InviteTeamPlayerService = inject(InviteTeamPlayerService);

        return teamPlayerInviteService.get(id, teamId, playerId).pipe(
            map((response: IGetTeamPlayerInviteResponse) => buildResolverModel(response, mapTeamPlayerInviteModel(response.Invite, enumService))),
            catchError((error: BaseErrorResponse) => of(buildErrorResolverModel<ITeamPlayerInviteModel>(error)))
        );
    };