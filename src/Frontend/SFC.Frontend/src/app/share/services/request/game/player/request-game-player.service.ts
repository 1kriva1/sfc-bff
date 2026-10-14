import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOADER } from "@core/interceptors";
import { Observable } from "rxjs";
import { buildHttpParams } from "ngx-sfc-common";
import { IRequestGamePlayerFindRequest } from "./models/find/request-game-player-find.request";
import { IRequestGamePlayerFindResponse } from "./models/find/request-game-player-find.response";
import { RequestServiceConstants } from "../../request-service.constants";
import { RequestGameServiceConstants } from "../request-game-service.constants";
import { RequestGamePlayerServiceConstants } from "./request-game-player-service.constants";
import { IRequestGamePlayerAcceptResponse } from "./models/accept/request-game-player-accept.response";
import { IRequestGamePlayerDeclineRequest } from "./models/decline/request-game-player-decline.request";
import { IRequestGamePlayerDeclineResponse } from "./models/decline/request-game-player-decline.response";

@Injectable({
    providedIn: 'root'
})
export class RequestGamePlayerService {

    constructor(private http: HttpClient) { }

    public accept(requestId: number, gameId: number, playerId: number): Observable<IRequestGamePlayerAcceptResponse> {
        return this.http.put<IRequestGamePlayerAcceptResponse>(
            `${RequestServiceConstants.URI_PART}/${requestId}/${RequestGameServiceConstants.URI_PART}/${gameId}/${RequestGamePlayerServiceConstants.URI_PART}/${playerId}/accept`,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public decline(requestId: number, gameId: number, playerId: number, request: IRequestGamePlayerDeclineRequest): Observable<IRequestGamePlayerDeclineResponse> {
        return this.http.put<IRequestGamePlayerDeclineResponse>(
            `${RequestServiceConstants.URI_PART}/${requestId}/${RequestGameServiceConstants.URI_PART}/${gameId}/${RequestGamePlayerServiceConstants.URI_PART}/${playerId}/decline`,
            request,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public find(gameId: number, request: IRequestGamePlayerFindRequest): Observable<HttpResponse<IRequestGamePlayerFindResponse>> {
        return this.http.get<IRequestGamePlayerFindResponse>(
            `${RequestServiceConstants.URI_PART}/${RequestGameServiceConstants.URI_PART}/${gameId}/${RequestGamePlayerServiceConstants.URI_PART}/find`,
            {
                context: new HttpContext().set(LOADER, { show: false }),
                params: buildHttpParams(request),
                observe: 'response'
            }
        );
    }
}