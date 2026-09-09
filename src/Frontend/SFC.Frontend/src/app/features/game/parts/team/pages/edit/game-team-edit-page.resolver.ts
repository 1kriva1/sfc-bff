import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { catchError, Observable, of, map, switchMap } from "rxjs";
import { BaseErrorResponse, IResolverModel } from "@core/models";
import { buildErrorResolverModel, buildResolverModel, getRouteId } from "@core/utils";
import { EnumService, GameService, GameTeamService, IGetGameResponse, IGetGameTeamResponse } from "@share/services";
import { mapGameModel } from "@share/mappers/game/general/game.mapper";
import { IGameTeamEditPageModel } from "./models/game-team-edit-page.model";
import { mapGameTeamModel } from "@share/mappers/game";
import { TeamConstants } from "@share/constants";
import { GameTeamIncludes } from "@share/enums";

export const GameTeamEditPageResolver: ResolveFn<IResolverModel<IGameTeamEditPageModel>> =
    (snapshot: ActivatedRouteSnapshot): Observable<IResolverModel<IGameTeamEditPageModel>> => {
        const gameId: number = getRouteId(snapshot),
            teamId: number = getRouteId(snapshot, TeamConstants.ID_ROUTE_PATH),
            gameService: GameService = inject(GameService),
            gameTeamService: GameTeamService = inject(GameTeamService),
            enumService: EnumService = inject(EnumService);

        return gameService.get(gameId).pipe(
            switchMap((gameResponse: IGetGameResponse) => {
                return gameTeamService.get(gameResponse.Game.Id, teamId, [GameTeamIncludes.WithTeamWithPlayersWithPlayer, GameTeamIncludes.WithGameTeamPlayersWithTeamWithPlayersWithPlayer]).pipe(
                    map((gameTeamResponse: IGetGameTeamResponse) => {
                        const model: IGameTeamEditPageModel = {
                            game: mapGameModel(gameResponse.Game, enumService),
                            gameTeam: mapGameTeamModel(gameTeamResponse.GameTeam, enumService)
                        };

                        return buildResolverModel(gameTeamResponse, model)
                    })
                );
            }),
            catchError((error: BaseErrorResponse) => of(buildErrorResolverModel<IGameTeamEditPageModel>(error)))
        );
    };