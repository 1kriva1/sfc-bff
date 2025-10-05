import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { catchError, switchMap, Observable, of } from "rxjs";
import { BaseErrorResponse, IResolverModel } from "@core/models";
import { buildErrorResolverModel, buildResolverModel, getRouteId } from "@core/utils";
import { TeamEditPageFormModel } from "./team-edit-page-form.model";
import { mapTeamEditPageFormModelAsync } from "./team-edit-page.mapper";
import { IGetTeamResponse, TeamService } from "@share/services";

export const TeamEditPageResolver: ResolveFn<IResolverModel<TeamEditPageFormModel>> =
    (snapshot: ActivatedRouteSnapshot): Observable<IResolverModel<TeamEditPageFormModel>> => {
        const teamId: number = getRouteId(snapshot),
            teamService: TeamService = inject(TeamService);

        return teamService.get(teamId).pipe(
            switchMap(async (response: IGetTeamResponse) => buildResolverModel(response, await mapTeamEditPageFormModelAsync(response.Team))),
            catchError((error: BaseErrorResponse) => of(buildErrorResolverModel<TeamEditPageFormModel>(error)))
        );
    };