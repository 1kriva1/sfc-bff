import { HttpClient, HttpContext, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOADER } from "@core/interceptors";
import { buildHttpParams } from "ngx-sfc-common";
import { Observable } from "rxjs";
import { SchemeServiceConstants } from "../../scheme.constants";
import { ISchemeGameTeamCreateResponse } from "./models/create/scheme-game-team-create.response";
import { SchemeTeamServiceConstants } from "../../team/scheme-team-service.constants";
import { ISchemeGameTeamCreateRequest } from "./models/create/scheme-game-team-create.request";
import { SchemeGameServiceConstants } from "../scheme-game-service.constants";
import { ISchemeGameTeamUpdateRequest } from "./models/update/scheme-game-team-update.request";
import { ISchemeGameTeamUpdateResponse } from "./models/update/scheme-game-team-update.response";
import { ISchemeGameTeamRemoveResponse } from "./models/remove/scheme-game-team-remove.response";
import { ISchemeGameTeamGetResponse } from "./models/get/scheme-game-team-get.response";
import { ISchemeGameTeamFindRequest } from "./models/find/scheme-game-team-find.request";
import { ISchemeGameTeamFindResponse } from "./models/find/scheme-game-team-find.response";

@Injectable({
    providedIn: 'root'
})
export class SchemeGameTeamService {

    constructor(private http: HttpClient) { }

    public create(gameId: number, teamId: number, request: ISchemeGameTeamCreateRequest): Observable<ISchemeGameTeamCreateResponse> {
        return this.http.post<ISchemeGameTeamCreateResponse>(
            `${SchemeServiceConstants.URI_PART}/${SchemeGameServiceConstants.URI_PART}/${gameId}/${SchemeTeamServiceConstants.URI_PART}/${teamId}`,
            request,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public update(schemeId: number, gameId: number, teamId: number, request: ISchemeGameTeamUpdateRequest): Observable<ISchemeGameTeamUpdateResponse> {
        return this.http.put<ISchemeGameTeamUpdateResponse>(
            `${SchemeServiceConstants.URI_PART}/${schemeId}/${SchemeGameServiceConstants.URI_PART}/${gameId}/${SchemeTeamServiceConstants.URI_PART}/${teamId}`,
            request,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public remove(schemeId: number, gameId: number, teamId: number): Observable<ISchemeGameTeamRemoveResponse> {
        return this.http.delete<ISchemeGameTeamRemoveResponse>(
            `${SchemeServiceConstants.URI_PART}/${schemeId}/${SchemeGameServiceConstants.URI_PART}/${gameId}/${SchemeTeamServiceConstants.URI_PART}/${teamId}`,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public get(schemeId: number, gameId: number, teamId: number): Observable<ISchemeGameTeamGetResponse> {
        return this.http.get<ISchemeGameTeamGetResponse>(
            `${SchemeServiceConstants.URI_PART}/${schemeId}/${SchemeGameServiceConstants.URI_PART}/${gameId}/${SchemeTeamServiceConstants.URI_PART}/${teamId}`,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public find(gameId: number, teamId: number, request: ISchemeGameTeamFindRequest): Observable<HttpResponse<ISchemeGameTeamFindResponse>> {
        return this.http.get<ISchemeGameTeamFindResponse>(
            `${SchemeServiceConstants.URI_PART}/${SchemeGameServiceConstants.URI_PART}/${gameId}/${SchemeTeamServiceConstants.URI_PART}/${teamId}/find`,
            {
                context: new HttpContext().set(LOADER, { show: false }),
                params: buildHttpParams(request),
                observe: 'response'
            }
        );
    }
}