import { HttpClient, HttpContext, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOADER } from "@core/interceptors";
import { Observable } from "rxjs";
import { buildHttpParams } from "ngx-sfc-common";
import { IFindInviteGamePlayerRequest } from "./models/find/find-invite-game-player.request";
import { IFindInviteGamePlayerResponse } from "./models/find/find-invite-game-player.response";
import { InviteServiceConstants } from "../../invite-service.constants";
import { InviteGamePlayerServiceConstants } from "./invite-game-player-service.constants";
import { InviteGameServiceConstants } from "../invite-game-service.constants";
import { IInviteGamePlayerCancelResponse } from "./models/cancel/invite-game-player-cancel.response";

@Injectable({
    providedIn: 'root'
})
export class InviteGamePlayerService {

    constructor(private http: HttpClient) { }

    public cancel(inviteId: number, gameId: number, playerId: number): Observable<IInviteGamePlayerCancelResponse> {
        return this.http.put<IInviteGamePlayerCancelResponse>(
            `${InviteServiceConstants.URI_PART}/${inviteId}/${InviteGameServiceConstants.URI_PART}/${gameId}/${InviteGamePlayerServiceConstants.URI_PART}/${playerId}/cancel`,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public find(gameId: number, request: IFindInviteGamePlayerRequest): Observable<HttpResponse<IFindInviteGamePlayerResponse>> {
        return this.http.get<IFindInviteGamePlayerResponse>(
            `${InviteServiceConstants.URI_PART}/${InviteGameServiceConstants.URI_PART}/${gameId}/${InviteGamePlayerServiceConstants.URI_PART}/find`,
            {
                context: new HttpContext().set(LOADER, { show: false }),
                params: buildHttpParams(request),
                observe: 'response'
            }
        );
    }
}