import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOADER } from "@core/interceptors";
import { Observable } from "rxjs";
import { IRequestGameTeamFindRequest } from "./models/find/request-game-team-find.request";
import { IRequestGameTeamFindResponse } from "./models/find/request-game-team-find.response";
import { RequestServiceConstants } from "../../request-service.constants";
import { RequestGameServiceConstants } from "../request-game-service.constants";
import { RequestGameTeamServiceConstants } from "./request-game-team-service.constants";
import { buildHttpParams } from "ngx-sfc-common";
import { IRequestGameTeamAcceptResponse } from "./models/accept/request-game-team-accept.response";
import { IRequestGameTeamDeclineRequest } from "./models/decline/request-game-team-decline.request";
import { IRequestGameTeamDeclineResponse } from "./models/decline/request-game-team-decline.response";

@Injectable({
    providedIn: 'root'
})
export class RequestGameTeamService {

    constructor(private http: HttpClient) { }

    public accept(requestId: number, gameId: number, playerId: number): Observable<IRequestGameTeamAcceptResponse> {
        return this.http.put<IRequestGameTeamAcceptResponse>(
            `${RequestServiceConstants.URI_PART}/${requestId}/${RequestGameServiceConstants.URI_PART}/${gameId}/${RequestGameTeamServiceConstants.URI_PART}/${playerId}/accept`,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public decline(requestId: number, gameId: number, playerId: number, request: IRequestGameTeamDeclineRequest): Observable<IRequestGameTeamDeclineResponse> {
        return this.http.put<IRequestGameTeamDeclineResponse>(
            `${RequestServiceConstants.URI_PART}/${requestId}/${RequestGameServiceConstants.URI_PART}/${gameId}/${RequestGameTeamServiceConstants.URI_PART}/${playerId}/decline`,
            request,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public find(gameId: number, request: IRequestGameTeamFindRequest): Observable<HttpResponse<IRequestGameTeamFindResponse>> {
        return this.http.get<IRequestGameTeamFindResponse>(
            `${RequestServiceConstants.URI_PART}/${RequestGameServiceConstants.URI_PART}/${gameId}/${RequestGameTeamServiceConstants.URI_PART}/find`,
            {
                context: new HttpContext().set(LOADER, { show: false }),
                params: buildHttpParams(request),
                observe: 'response'
            }
        );
    }
}