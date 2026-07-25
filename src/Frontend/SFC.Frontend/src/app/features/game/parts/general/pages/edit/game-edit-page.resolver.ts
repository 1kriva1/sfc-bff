import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { catchError, Observable, of, map, switchMap } from "rxjs";
import { BaseErrorResponse, IResolverModel } from "@core/models";
import { buildErrorResolverModel, buildResolverModel, getRouteId } from "@core/utils";
import { EnumService, GameService, GameTeamService, IGetGameResponse, IGetGameTeamsResponse } from "@share/services";
import { mapGameModel } from "@share/mappers";
import { IGameEditPageModel } from "./models/game-edit-page.model";
import { mapGameEditPageTeamModel } from "./game-edit-page.mapper";

export const GameEditPageResolver: ResolveFn<IResolverModel<IGameEditPageModel>> =
    (snapshot: ActivatedRouteSnapshot): Observable<IResolverModel<IGameEditPageModel>> => {
        const gameId: number = getRouteId(snapshot),
            gameService: GameService = inject(GameService),
            gameTeamService: GameTeamService = inject(GameTeamService),
            enumService: EnumService = inject(EnumService);

        return gameService.get(gameId).pipe(
            switchMap((gameResponse: IGetGameResponse) => {
                return gameTeamService.gets(gameResponse.Game.Id).pipe(
                    map((gameTeamResponse: IGetGameTeamsResponse) => {
                        const model: IGameEditPageModel = {
                            game: mapGameModel(gameResponse.Game, enumService),
                            gameTeam: mapGameEditPageTeamModel(gameTeamResponse, enumService)
                        };

                        return buildResolverModel(gameResponse, model)
                    })
                )
            }),
            catchError((error: BaseErrorResponse) => of(buildErrorResolverModel<IGameEditPageModel>(error)))
        );
    };