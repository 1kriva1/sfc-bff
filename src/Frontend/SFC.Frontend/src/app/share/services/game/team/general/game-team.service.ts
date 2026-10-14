import { HttpClient, HttpContext, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { buildHttpParams } from "ngx-sfc-common";
import { IFindGameTeamsRequest } from "./models/find/find-game-teams.request";
import { IFindGameTeamsResponse } from "./models/find/find-game-teams.response";
import { Observable } from "rxjs";
import { GameServiceConstants } from "../../game-service.constants";
import { GameTeamServiceConstants } from "../game-team-service.constants";
import { INCLUDE, LOADER } from "@core/interceptors";
import { IGetGameTeamsResponse } from "./models/gets/get-game-teams.response";
import { IUpdateGameTeamsResponse } from "./models/updates/update-game-teams.response";
import { IUpdateGameTeamsRequest } from "./models/updates/update-game-teams.request";
import { ICreateGameTeamRequest } from "./models/create/create-game-team.request";
import { ICreateGameTeamResponse } from "./models/create/create-game-team.response";
import { IUpdateGameTeamResponse } from "./models/update/update-game-team.response";
import { IUpdateGameTeamRequest } from "./models/update/update-game-team.request";
import { IGetGameTeamResponse } from "./models/get/get-game-team.response";
import { GameTeamInclude } from "@share/enums";

@Injectable({
    providedIn: 'root'
})
export class GameTeamService {

    constructor(private http: HttpClient) { }

    public create(gameId: number, request: ICreateGameTeamRequest): Observable<ICreateGameTeamResponse> {
        return this.http.post<ICreateGameTeamResponse>(
            `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}`,
            request,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public get(gameId: number, teamId: number, include: GameTeamInclude[] = []): Observable<IGetGameTeamResponse> {
        return this.http.get<IGetGameTeamResponse>(
            `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}/${teamId}`,
            {
                context: new HttpContext().set(LOADER, { show: true }).set(INCLUDE, include)
            }
        );
    }

    public gets(gameId: number, include: GameTeamInclude[] = []): Observable<IGetGameTeamsResponse> {
        return this.http.get<IGetGameTeamsResponse>(
            `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}`,
            {
                context: new HttpContext().set(LOADER, { show: true }).set(INCLUDE, include)
            }
        );
    }

    public update(gameId: number, teamId: number, request: IUpdateGameTeamRequest): Observable<IUpdateGameTeamResponse> {
        return this.http.put<IUpdateGameTeamResponse>(
            `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}/${teamId}`,
            request,
            { context: new HttpContext().set(LOADER, { show: true }) }
        )
    }

    public updates(gameId: number, request: IUpdateGameTeamsRequest): Observable<IUpdateGameTeamsResponse> {
        return this.http.put<IUpdateGameTeamsResponse>(
            `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}`,
            request,
            { context: new HttpContext().set(LOADER, { show: true }) }
        )
    }

    public find(gameId: number, request: IFindGameTeamsRequest, include: GameTeamInclude[] = [], loader: boolean = true)
        : Observable<HttpResponse<IFindGameTeamsResponse>> {
        return this.http.get<IFindGameTeamsResponse>(
            `${GameServiceConstants.URI_PART}/${gameId}/${GameTeamServiceConstants.URI_PART}/find`,
            {
                context: new HttpContext().set(LOADER, { show: loader }).set(INCLUDE, include),
                params: buildHttpParams(request),
                observe: 'response'
            }
        );
    }
}