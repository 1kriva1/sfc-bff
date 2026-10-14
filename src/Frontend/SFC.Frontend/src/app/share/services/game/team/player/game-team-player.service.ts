import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { buildHttpParams } from "ngx-sfc-common";
import { Observable } from "rxjs";
import { GameServiceConstants } from "../../game-service.constants";
import { GameTeamServiceConstants } from "../game-team-service.constants";
import { INCLUDE, LOADER } from "@core/interceptors";
import { ICreatesGameTeamPlayerRequest } from "./models/creates/creates-game-team-player.request";
import { ICreatesGameTeamPlayerResponse } from "./models/creates/creates-game-team-player.response";
import { IGameTeamPlayerFindRequest } from "./models/find/game-team-player-find.request";
import { IGameTeamPlayerFindResponse } from "./models/find/game-team-player-find.response";
import { GameTeamPlayerServiceConstants } from "./game-team-player-service.constants";
import { ICreateGameTeamPlayerResponse } from "./models/create/create-game-team-player.response";
import { IDeleteGameTeamPlayerResponse } from "./models/delete/delete-game-team-player.response";
import { IDeletesGameTeamPlayerRequest } from "./models/deletes/deletes-game-team-player.request";
import { IDeletesGameTeamPlayerResponse } from "./models/deletes/deletes-game-team-player.response";
import { GameTeamPlayerInclude } from "@share/enums";
import { ICreateGameTeamPlayerRequest } from "./models/create/create-game-team-player.request";
@Injectable({
    providedIn: 'root'
})
export class GameTeamPlayerService {

    constructor(private http: HttpClient) { }

    public create(gameId: number, teamId: number, playerId: number, request: ICreateGameTeamPlayerRequest): Observable<ICreateGameTeamPlayerResponse> {
        return this.http.post<ICreateGameTeamPlayerResponse>(
            `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}/${teamId}/${GameTeamPlayerServiceConstants.URI_PART}/${playerId}`,
            request,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public creates(gameId: number, teamId: number, request: ICreatesGameTeamPlayerRequest): Observable<ICreatesGameTeamPlayerResponse> {
        return this.http.post<ICreatesGameTeamPlayerResponse>(
            `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}/${teamId}/${GameTeamPlayerServiceConstants.URI_PART}`,
            request,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public delete(gameId: number, teamId: number, playerId: number): Observable<IDeleteGameTeamPlayerResponse> {
        return this.http.delete<IDeleteGameTeamPlayerResponse>(
            `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}/${teamId}/${GameTeamPlayerServiceConstants.URI_PART}/${playerId}`,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public deletes(gameId: number, teamId: number, request: IDeletesGameTeamPlayerRequest): Observable<IDeletesGameTeamPlayerResponse> {
        return this.http.delete<IDeletesGameTeamPlayerResponse>(
            `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}/${teamId}/${GameTeamPlayerServiceConstants.URI_PART}`,
            {
                body: request,
                context: new HttpContext().set(LOADER, { show: true })
            }
        );
    }

    public find(gameId: number, teamId: number, request: IGameTeamPlayerFindRequest, include: GameTeamPlayerInclude[] = []): Observable<HttpResponse<IGameTeamPlayerFindResponse>> {
        return this.http.get<IGameTeamPlayerFindResponse>(
            `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}/${teamId}/${GameTeamPlayerServiceConstants.URI_PART}/find`,
            {
                context: new HttpContext().set(LOADER, { show: false }).set(INCLUDE, include),
                params: buildHttpParams(request),
                observe: 'response'
            }
        );
    }
}