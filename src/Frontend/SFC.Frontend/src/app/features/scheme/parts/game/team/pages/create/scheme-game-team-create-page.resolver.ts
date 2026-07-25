import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { catchError, Observable, of, map, forkJoin } from "rxjs";
import { BaseErrorResponse, IResolverModel } from "@core/models";
import { buildErrorResolverModel, buildResolverModelMultiple, getRouteId } from "@core/utils";
import { EnumService, GameService, TeamService } from "@share/services";
import { ISchemeGameTeamCreatePageModel } from "./models/scheme-game-team-create-page.model";
import { GameConstants, TeamConstants } from "@share/constants";
import { mapGameModel, mapTeamModel } from "@share/mappers";

export const SchemeGameTeamCreatePageResolver: ResolveFn<IResolverModel<ISchemeGameTeamCreatePageModel>> =
    (snapshot: ActivatedRouteSnapshot): Observable<IResolverModel<ISchemeGameTeamCreatePageModel>> => {
        const gameId: number = getRouteId(snapshot, GameConstants.ID_ROUTE_PATH),
            teamId: number = getRouteId(snapshot, TeamConstants.ID_ROUTE_PATH),
            gameService: GameService = inject(GameService),
            teamService: TeamService = inject(TeamService),
            enumService: EnumService = inject(EnumService);

        return forkJoin({
            game: gameService.get(gameId),
            team: teamService.get(teamId)
        }).pipe(
            map(response => {
                const model: ISchemeGameTeamCreatePageModel = {
                    game: mapGameModel(response.game.Game, enumService),
                    team: mapTeamModel(response.team.Team, enumService)
                };

                return buildResolverModelMultiple(response, model)
            }),
            catchError((error: BaseErrorResponse) => of(buildErrorResolverModel<ISchemeGameTeamCreatePageModel>(error)))
        );
    };