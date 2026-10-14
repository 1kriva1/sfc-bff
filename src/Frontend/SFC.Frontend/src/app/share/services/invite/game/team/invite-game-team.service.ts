import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOADER } from "@core/interceptors";
import { Observable } from "rxjs";
import { ICreateGameTeamInvitesResponse } from "./models/create-range/invite-game-team-create-range.response";
import { ICreateGameTeamInvitesRequest } from "./models/create-range/invite-game-team-create-range.request";
import { InviteServiceConstants } from "../../invite-service.constants";
import { InviteGameTeamServiceConstants } from "./invite-game-team-service.constants";
import { InviteGameServiceConstants } from "../invite-game-service.constants";
import { IInviteGameTeamFindRequest } from "./models/find/invite-game-player-find.request";
import { IInviteGameTeamFindResponse } from "./models/find/invite-game-player-find.response";
import { buildHttpParams } from "ngx-sfc-common";
import { IInviteGameTeamCancelResponse } from "./models/cancel/invite-game-team-cancel.response";

@Injectable({
    providedIn: 'root'
})
export class InviteGameTeamService {

    constructor(private http: HttpClient) { }

    public creates(gameId: number, request: ICreateGameTeamInvitesRequest): Observable<ICreateGameTeamInvitesResponse> {
        return this.http.post<ICreateGameTeamInvitesResponse>(
            `${InviteServiceConstants.URI_PART}/${InviteGameServiceConstants.URI_PART}/${gameId}/${InviteGameTeamServiceConstants.URI_PART}`,
            request,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public cancel(inviteId: number, gameId: number, teamId: number): Observable<IInviteGameTeamCancelResponse> {
        return this.http.put<IInviteGameTeamCancelResponse>(
            `${InviteServiceConstants.URI_PART}/${inviteId}/${InviteGameServiceConstants.URI_PART}/${gameId}/${InviteGameTeamServiceConstants.URI_PART}/${teamId}/cancel`,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public find(gameId: number, request: IInviteGameTeamFindRequest): Observable<HttpResponse<IInviteGameTeamFindResponse>> {
        return this.http.get<IInviteGameTeamFindResponse>(
            `${InviteServiceConstants.URI_PART}/${InviteGameServiceConstants.URI_PART}/${gameId}/${InviteGameTeamServiceConstants.URI_PART}/find`,
            {
                context: new HttpContext().set(LOADER, { show: false }),
                params: buildHttpParams(request),
                observe: 'response'
            }
        );
    }
}