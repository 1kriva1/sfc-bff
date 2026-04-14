import { HttpClient, HttpContext } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOADER } from "@core/interceptors";
import { Observable, of } from "rxjs";
import { ICreateGameTeamInvitesResponse } from "./models/create-range/create-game-team-invites.response";
import { ICreateGameTeamInvitesRequest } from "./models/create-range/create-game-team-invites.request";
import { InviteServiceConstants } from "../../invite-service.constants";
import { InviteGameTeamServiceConstants } from "./invite-game-team-service.constants";
import { InviteGameServiceConstants } from "../invite-game-service.constants";

@Injectable({
    providedIn: 'root'
})
export class InviteGameTeamService {

    constructor(private http: HttpClient) { }

    public createRange(gameId: number, request: ICreateGameTeamInvitesRequest): Observable<ICreateGameTeamInvitesResponse> {
        // return this.http.post<ICreateGameTeamInvitesResponse>(
        //     `${InviteServiceConstants.URI_PART}/${InviteGameServiceConstants.URI_PART}/${gameId}/${InviteGameTeamServiceConstants.URI_PART}`,
        //     request,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // );

        return of({
            Invites: [],
            Errors: null,
            Success: true,
            Message: 'All ok!'
        } as ICreateGameTeamInvitesResponse);
    }
}