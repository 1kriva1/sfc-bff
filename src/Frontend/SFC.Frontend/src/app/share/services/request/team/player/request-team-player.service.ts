import { HttpClient, HttpContext, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOADER } from "@core/interceptors";
import { buildHttpParams } from "ngx-sfc-common";
import { Observable } from "rxjs";
import { RequestServiceConstants } from "../../request-service.constants";
import { RequestTeamServiceConstants } from "../request-team-service.constants";
import { IAcceptTeamPlayerRequestResponse } from "./models/accept/accept-team-player-request.response";
import { IDeclineTeamPlayerRequestRequest } from "./models/decline/decline-team-player-request.request";
import { IDeclineTeamPlayerRequestResponse } from "./models/decline/decline-team-player-request.response";
import { IFindTeamPlayerRequestsRequest } from "./models/find/find-team-player-requests.request";
import { IFindTeamPlayerRequestsResponse } from "./models/find/find-team-player-requests.response";
import { IGetAllTeamPlayerRequestsResponse } from "./models/get-all/get-all-team-player-requests.response";
import { IGetTeamPlayerRequestResponse } from "./models/get/get-team-player-request.response";
import { RequestTeamPlayerServiceConstants } from "./request-team-player-service.constants";

@Injectable({
    providedIn: 'root'
})
export class RequestTeamPlayerService {

    constructor(private http: HttpClient) { }

    public accept(inviteId: number, teamId: number, playerId: number): Observable<IAcceptTeamPlayerRequestResponse> {
        return this.http.put<IAcceptTeamPlayerRequestResponse>(
            `${RequestServiceConstants.URI_PART}/${inviteId}/${RequestTeamServiceConstants.URI_PART}/${teamId}/${RequestTeamPlayerServiceConstants.URI_PART}/${playerId}/accept`,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public decline(inviteId: number, teamId: number, playerId: number, request: IDeclineTeamPlayerRequestRequest): Observable<IDeclineTeamPlayerRequestResponse> {
        return this.http.put<IDeclineTeamPlayerRequestResponse>(
            `${RequestServiceConstants.URI_PART}/${inviteId}/${RequestTeamServiceConstants.URI_PART}/${teamId}/${RequestTeamPlayerServiceConstants.URI_PART}/${playerId}/decline`,
            request,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public get(requestId: number, teamId: number, playerId: number): Observable<IGetTeamPlayerRequestResponse> {
        return this.http.get<IGetTeamPlayerRequestResponse>(
            `${RequestServiceConstants.URI_PART}/${requestId}/${RequestTeamServiceConstants.URI_PART}/${teamId}/${RequestTeamPlayerServiceConstants.URI_PART}/${playerId}`,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public getAll(teamId: number): Observable<IGetAllTeamPlayerRequestsResponse> {
        return this.http.get<IGetAllTeamPlayerRequestsResponse>(
            `${RequestServiceConstants.URI_PART}/${RequestTeamServiceConstants.URI_PART}/${teamId}/${RequestTeamPlayerServiceConstants.URI_PART}`,
            { context: new HttpContext().set(LOADER, { show: false }) }
        );
    }

    public find(teamId: number, request: IFindTeamPlayerRequestsRequest): Observable<HttpResponse<IFindTeamPlayerRequestsResponse>> {
        return this.http.get<IFindTeamPlayerRequestsResponse>(
            `${RequestServiceConstants.URI_PART}/${RequestTeamServiceConstants.URI_PART}/${teamId}/${RequestTeamPlayerServiceConstants.URI_PART}/find`,
            {
                context: new HttpContext().set(LOADER, { show: false }),
                params: buildHttpParams(request),
                observe: 'response'
            }
        );
    }
}