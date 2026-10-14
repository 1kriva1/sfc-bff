import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { catchError, Observable, of, map } from "rxjs";
import { BaseErrorResponse, IResolverModel } from "@core/models";
import { buildErrorResolverModel, buildResolverModel, getRouteId } from "@core/utils";
import { EnumService, GameService, IGetGameResponse } from "@share/services";
import { mapGameModel } from "@share/mappers";
import { IGameEditPageModel } from "./models/game-edit-page.model";
import { mapGameEditPageTeamModel } from "./game-edit-page.mapper";
import { GameInclude } from "@share/enums";

export const GameEditPageResolver: ResolveFn<IResolverModel<IGameEditPageModel>> =
    (snapshot: ActivatedRouteSnapshot): Observable<IResolverModel<IGameEditPageModel>> => {
        const gameId: number = getRouteId(snapshot),
            gameService: GameService = inject(GameService),
            enumService: EnumService = inject(EnumService);

        return gameService.get(gameId, [GameInclude.Profile, GameInclude.GameTeamsWithTeamProfile, GameInclude.GameTeamsWithTeamWithTeamPlayersWithPlayerProfile]).pipe(
            map((gameResponse: IGetGameResponse) => {
                const model: IGameEditPageModel = {
                    game: mapGameModel(gameResponse.Game, enumService),
                    gameTeam: mapGameEditPageTeamModel(gameResponse.Game.Teams!, enumService)
                };

                return buildResolverModel(gameResponse, model);
            }),
            catchError((error: BaseErrorResponse) => of(buildErrorResolverModel<IGameEditPageModel>(error)))
        );
    };