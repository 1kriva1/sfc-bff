import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { catchError, switchMap, Observable, of } from "rxjs";
import { BaseErrorResponse, IResolverModel } from "@core/models";
import { buildErrorResolverModel, buildResolverModel, getRouteId } from "@core/utils";
import { EnumService, IGetTeamResponse, TeamService } from "@share/services";
import { ITeamModel } from "@share/models";
import { mapTeamModel } from "@share/mappers";

export const TeamViewPageResolver: ResolveFn<IResolverModel<ITeamModel>> =
    (snapshot: ActivatedRouteSnapshot): Observable<IResolverModel<ITeamModel>> => {
        const teamId: number = getRouteId(snapshot),
            teamService: TeamService = inject(TeamService),
            enumService: EnumService = inject(EnumService);

        return teamService.get(teamId).pipe(
            switchMap(async (response: IGetTeamResponse) => buildResolverModel(response, mapTeamModel(response.Team, enumService))),
            catchError((error: BaseErrorResponse) => of(buildErrorResolverModel<ITeamModel>(error)))
        );
    };