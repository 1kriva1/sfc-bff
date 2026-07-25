import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { catchError, Observable, of, map } from "rxjs";
import { BaseErrorResponse, IResolverModel } from "@core/models";
import { buildErrorResolverModel, buildResolverModel, getRouteId } from "@core/utils";
import { EnumService, GameService, IGetGameResponse } from "@share/services";
import { IGameTeamCreatePageModel } from "./models/game-team-create-page.model";
import { mapGameModel } from "@share/mappers";

export const GameTeamCreatePageResolver: ResolveFn<IResolverModel<IGameTeamCreatePageModel>> =
    (snapshot: ActivatedRouteSnapshot): Observable<IResolverModel<IGameTeamCreatePageModel>> => {
        const gameId: number = getRouteId(snapshot),
            gameService: GameService = inject(GameService),
            enumService: EnumService = inject(EnumService);

        return gameService.get(gameId).pipe(
            map((gameResponse: IGetGameResponse) => {
                const model: IGameTeamCreatePageModel = {
                    game: mapGameModel(gameResponse.Game, enumService)
                };

                return buildResolverModel(gameResponse, model)
            }),
            catchError((error: BaseErrorResponse) => of(buildErrorResolverModel<IGameTeamCreatePageModel>(error)))
        );
    };