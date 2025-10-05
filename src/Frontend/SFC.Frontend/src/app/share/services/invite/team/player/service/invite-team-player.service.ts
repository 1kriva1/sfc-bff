import { HttpClient, HttpContext, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOADER } from "@core/interceptors";
import { Observable } from "rxjs";
import { InviteServiceConstants } from "../../../invite-service.constants";
import { InviteTeamPlayerServiceConstants } from "./invite-team-player-service.constants";
import { buildHttpParams } from "ngx-sfc-common";
import { ITeamPlayerInviteExistRequest } from "./models/exist/team-player-invite-exist.request";
import { ITeamPlayerInviteExistResponse } from "./models/exist/team-player-invite-exist.response";
import { InviteTeamServiceConstants } from "../../invite-team-service.constants";
import { ICreateTeamPlayerInviteRequest } from "./models/create/create-team-player-invite.request";
import { ICreateTeamPlayerInviteResponse } from "./models/create/create-team-player-invite.response";
import { ICreateTeamPlayerInvitesRequest } from "./models/create-range/create-team-player-invites.request";
import { ICreateTeamPlayerInvitesResponse } from "./models/create-range/create-team-player-invites.response";
import { IUpdateTeamPlayerInviteRequest } from "./models/update/update-team-player-invite.request";
import { IUpdateTeamPlayerInviteResponse } from "./models/update/update-team-player-invite.response";
import { ICancelTeamPlayerInviteResponse } from "./models/cancel/cancel-team-player-invite.response";
import { IGetTeamPlayerInviteResponse } from "./models/get/get-team-player-invite.response";
import { IGetAllTeamPlayerInvitesResponse } from "./models/get-all/get-all-team-player-invites.response";
import { IFindTeamPlayerInvitesResponse } from "./models/find/find-team-player-invites.response";
import { IFindTeamPlayerInvitesRequest } from "./models/find/find-team-player-invites.request";

@Injectable({
    providedIn: 'root'
})
export class InviteTeamPlayerService {

    constructor(private http: HttpClient) { }

    public exist(teamId: number, playerId: number, request?: ITeamPlayerInviteExistRequest): Observable<ITeamPlayerInviteExistResponse> {
        return this.http.get<ITeamPlayerInviteExistResponse>(
            `${InviteServiceConstants.URI_PART}/${InviteTeamServiceConstants.URI_PART}/${teamId}/${InviteTeamPlayerServiceConstants.URI_PART}/${playerId}`,
            {
                context: new HttpContext().set(LOADER, { show: false }),
                params: buildHttpParams(request),
            }
        );
    }

    public create(teamId: number, playerId: number, request: ICreateTeamPlayerInviteRequest): Observable<ICreateTeamPlayerInviteResponse> {
        return this.http.post<ICreateTeamPlayerInviteResponse>(
            `${InviteServiceConstants.URI_PART}/${InviteTeamServiceConstants.URI_PART}/${teamId}/${InviteTeamPlayerServiceConstants.URI_PART}/${playerId}`,
            request,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public createRange(teamId: number, request: ICreateTeamPlayerInvitesRequest): Observable<ICreateTeamPlayerInvitesResponse> {
        return this.http.post<ICreateTeamPlayerInvitesResponse>(
            `${InviteServiceConstants.URI_PART}/${InviteTeamServiceConstants.URI_PART}/${teamId}`,
            request,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public update(inviteId: number, teamId: number, playerId: number, request: IUpdateTeamPlayerInviteRequest): Observable<IUpdateTeamPlayerInviteResponse> {
        return this.http.put<IUpdateTeamPlayerInviteResponse>(
            `${InviteServiceConstants.URI_PART}/${inviteId}/${InviteTeamServiceConstants.URI_PART}/${teamId}/${InviteTeamPlayerServiceConstants.URI_PART}/${playerId}`,
            request,
            { context: new HttpContext().set(LOADER, { show: true }) }
        )
    }

    public cancel(inviteId: number, teamId: number, playerId: number): Observable<ICancelTeamPlayerInviteResponse> {
        return this.http.put<ICancelTeamPlayerInviteResponse>(
            `${InviteServiceConstants.URI_PART}/${inviteId}/${InviteTeamServiceConstants.URI_PART}/${teamId}/${InviteTeamPlayerServiceConstants.URI_PART}/${playerId}/cancel`,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public get(inviteId: number, teamId: number, playerId: number): Observable<IGetTeamPlayerInviteResponse> {
        return this.http.get<IGetTeamPlayerInviteResponse>(
            `${InviteServiceConstants.URI_PART}/${inviteId}/${InviteTeamServiceConstants.URI_PART}/${teamId}/${InviteTeamPlayerServiceConstants.URI_PART}/${playerId}`,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public getAll(teamId: number): Observable<IGetAllTeamPlayerInvitesResponse> {
        return this.http.get<IGetAllTeamPlayerInvitesResponse>(
            `${InviteServiceConstants.URI_PART}/${InviteTeamServiceConstants.URI_PART}/${teamId}/${InviteTeamPlayerServiceConstants.URI_PART}`,
            { context: new HttpContext().set(LOADER, { show: false }) }
        );
    }

    public find(teamId: number, request: IFindTeamPlayerInvitesRequest): Observable<HttpResponse<IFindTeamPlayerInvitesResponse>> {
        return this.http.get<IFindTeamPlayerInvitesResponse>(
            `${InviteServiceConstants.URI_PART}/${InviteTeamServiceConstants.URI_PART}/${teamId}/${InviteTeamPlayerServiceConstants.URI_PART}/find`,
            {
                context: new HttpContext().set(LOADER, { show: false }),
                params: buildHttpParams(request),
                observe: 'response'
            }
        );
    }
}