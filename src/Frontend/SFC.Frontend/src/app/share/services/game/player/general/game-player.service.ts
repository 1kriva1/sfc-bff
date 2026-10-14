import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { buildHttpParams } from "ngx-sfc-common";
import { Observable } from "rxjs";
import { IGamePlayerFindRequest } from "./models/find/game-player-find.request";
import { IGamePlayerFindResponse } from "./models/find/game-player-find.response";
import { INCLUDE, LOADER } from "@core/interceptors";
import { GameServiceConstants } from "../../game-service.constants";
import { GamePlayerServiceConstants } from "../game-player-service.constants";
import { GamePlayerInclude } from "@share/enums";

@Injectable({
    providedIn: 'root'
})
export class GamePlayerService {

    constructor(private http: HttpClient) { }

    public find(gameId: number, request: IGamePlayerFindRequest, include: GamePlayerInclude[] = []): Observable<HttpResponse<IGamePlayerFindResponse>> {
        return this.http.get<IGamePlayerFindResponse>(
            `${GameServiceConstants.URI_PART}/${gameId}/${GamePlayerServiceConstants.URI_PART}/find`,
            {
                context: new HttpContext().set(LOADER, { show: false }).set(INCLUDE, include),
                params: buildHttpParams(request),
                observe: 'response'
            }
        );
    }
}