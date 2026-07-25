import { HttpClient, HttpContext, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { buildHttpParams } from "ngx-sfc-common";
import { LOADER } from "@core/interceptors";
import { TeamServiceConstants } from "../../team-service.constants";
import { TeamPlayerServiceConstants } from "../team-player-service.constants";
import { IFindTeamPlayersRequest } from "./models/find/find-team-players.request";
import { IFindTeamPlayersResponse } from "./models/find/find-team-players.response";
import { ITeamPlayerExistRequest } from "./models/exist/team-player-exist.request";
import { ITeamPlayerExistResponse } from "./models/exist/team-player-exist.response";
import { IGetTeamPlayersResponse } from "./models/get/get-team-players.response";
import { IRemoveTeamPlayerRequest } from "./models/remove/remove-team-player.request";
import { IRemoveTeamPlayerResponse } from "./models/remove/remove-team-player.response";
import { ITeamPlayerCreatesRequest } from "./models/creates/team-player-creates.request";
import { ITeamPlayerCreatesResponse } from "./models/creates/team-player-creates.response";

@Injectable({
    providedIn: 'root'
})
export class TeamPlayerService {

    constructor(private http: HttpClient) { }

    public creates(teamId: number, request: ITeamPlayerCreatesRequest): Observable<ITeamPlayerCreatesResponse> {
        // return this.http.post<ITeamPlayerCreatesResponse>(
        //     `${TeamServiceConstants.URI_PART}/${teamId}/${TeamPlayerServiceConstants.URI_PART}`,
        //     request,
        //     { context: new HttpContext().set(LOADER, { show: true }) }
        // );

        return of({
            TeamPlayers: [],
            Errors: null,
            Success: true,
            Message: 'All ok!'
        } as ITeamPlayerCreatesResponse);
    }

    public exist(teamId: number, playerId: number, request?: ITeamPlayerExistRequest): Observable<ITeamPlayerExistResponse> {
        return this.http.get<ITeamPlayerExistResponse>(
            `${TeamServiceConstants.URI_PART}/${teamId}/${TeamPlayerServiceConstants.URI_PART}/${playerId}`,
            {
                context: new HttpContext().set(LOADER, { show: false }),
                params: buildHttpParams(request),
            }
        );
    }

    public get(teamId: number): Observable<IGetTeamPlayersResponse> {
        return this.http.get<IGetTeamPlayersResponse>(
            `${TeamServiceConstants.URI_PART}/${teamId}/${TeamPlayerServiceConstants.URI_PART}`,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public remove(teamId: number, playerId: number, request: IRemoveTeamPlayerRequest): Observable<IRemoveTeamPlayerResponse> {
        return this.http.put<IRemoveTeamPlayerResponse>(
            `${TeamServiceConstants.URI_PART}/${teamId}/${TeamPlayerServiceConstants.URI_PART}/${playerId}/remove`,
            request,
            { context: new HttpContext().set(LOADER, { show: true }) }
        )
    }

    public find(teamId: number, request: IFindTeamPlayersRequest): Observable<HttpResponse<IFindTeamPlayersResponse>> {
        return this.http.get<IFindTeamPlayersResponse>(
            `${TeamServiceConstants.URI_PART}/${teamId}/${TeamPlayerServiceConstants.URI_PART}/find`,
            {
                context: new HttpContext().set(LOADER, { show: false }),
                params: buildHttpParams(request),
                observe: 'response'
            }
        );
    }
}