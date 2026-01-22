import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { catchError, Observable, of, map } from "rxjs";
import { IResolverModel } from "@core/models";
import { buildErrorResolverModel, buildResolverModel, getRouteId } from "@core/utils";
import { EnumService, IGetTeamResponse, TeamService } from "@share/services";
import { ISchemeTeamCreatePageResolveModel } from "./models/scheme-team-create-page-resolve.model";
import { mapTeamModel } from "@share/mappers/team/general/team.mapper";
import { TeamConstants } from "@share/constants";

export const SchemeTeamCreatePageResolver: ResolveFn<IResolverModel<ISchemeTeamCreatePageResolveModel>> =
    (route: ActivatedRouteSnapshot): Observable<IResolverModel<ISchemeTeamCreatePageResolveModel>> => {
        const teamId: number = getRouteId(route, TeamConstants.ID_ROUTE_PATH),
            enumService: EnumService = inject(EnumService),
            teamService: TeamService = inject(TeamService);

        return teamService.get(teamId).pipe(
            map((response: IGetTeamResponse) => buildResolverModel(response, { team: mapTeamModel(response.Team, enumService) })),
            catchError((response: IGetTeamResponse) => of(buildErrorResolverModel<ISchemeTeamCreatePageResolveModel>(response)))
        );
    };