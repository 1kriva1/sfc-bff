import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { catchError, Observable, of, map, forkJoin } from "rxjs";
import { BaseErrorResponse, IResolverModel } from "@core/models";
import { buildErrorResolverModel, buildResolverModelMultiple, getRouteId } from "@core/utils";
import { EnumService, GameService, SchemeGameTeamService, TeamService } from "@share/services";
import { mapGameModel } from "@share/mappers/game/general/game.mapper";
import { ISchemeGameTeamEditPageModel } from "./models/scheme-game-team-edit-page.model";
import { GameConstants, TeamConstants } from "@share/constants";
import { mapSchemeGameTeamModel, mapTeamModel } from "@share/mappers";

export const SchemeGameTeamEditPageResolver: ResolveFn<IResolverModel<ISchemeGameTeamEditPageModel>> =
    (snapshot: ActivatedRouteSnapshot): Observable<IResolverModel<ISchemeGameTeamEditPageModel>> => {
        const schemeId: number = getRouteId(snapshot),
            gameId: number = getRouteId(snapshot, GameConstants.ID_ROUTE_PATH),
            teamId: number = getRouteId(snapshot, TeamConstants.ID_ROUTE_PATH),
            schemeGameTeamService: SchemeGameTeamService = inject(SchemeGameTeamService),
            gameService: GameService = inject(GameService),
            teamService: TeamService = inject(TeamService),
            enumService: EnumService = inject(EnumService);

        return forkJoin({
            scheme: schemeGameTeamService.get(schemeId, gameId, teamId),
            game: gameService.get(gameId),
            team: teamService.get(teamId)
        }).pipe(
            map(response => {
                const model: ISchemeGameTeamEditPageModel = {
                    scheme: mapSchemeGameTeamModel(response.scheme.Scheme, enumService),
                    game: mapGameModel(response.game.Game, enumService),
                    team: mapTeamModel(response.team.Team, enumService)
                };

                return buildResolverModelMultiple(response, model)
            }),
            catchError((error: BaseErrorResponse) => of(buildErrorResolverModel<ISchemeGameTeamEditPageModel>(error)))
        );
    };