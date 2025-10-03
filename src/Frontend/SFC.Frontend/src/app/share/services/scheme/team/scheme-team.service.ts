import { HttpClient, HttpContext, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LOADER } from "@core/interceptors";
import { buildHttpParams } from "ngx-sfc-common";
import { Observable } from "rxjs";
import { SchemeServiceConstants } from "../scheme.constants";
import { ICreateTeamSchemeRequest } from "./models/create/create-team-scheme.request";
import { ICreateTeamSchemeResponse } from "./models/create/create-team-scheme.response";
import { IFindTeamSchemesRequest } from "./models/find/find-team-schemes.request";
import { IFindTeamSchemesResponse } from "./models/find/find-team-schemes.response";
import { IGetTeamSchemeResponse } from "./models/get/get-team-scheme.response";
import { IRemoveTeamSchemeResponse } from "./models/remove/remove-team-scheme.response";
import { IUpdateTeamSchemeRequest } from "./models/update/update-team-scheme.request";
import { IUpdateTeamSchemeResponse } from "./models/update/update-team-scheme.response";
import { SchemeTeamServiceConstants } from "./scheme-team-service.constants";

@Injectable({
    providedIn: 'root'
})
export class SchemeTeamService {

    constructor(private http: HttpClient) { }

    public create(teamId: number, request: ICreateTeamSchemeRequest): Observable<ICreateTeamSchemeResponse> {
        return this.http.post<ICreateTeamSchemeResponse>(
            `${SchemeServiceConstants.URI_PART}/${SchemeTeamServiceConstants.URI_PART}/${teamId}`,
            request,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public update(schemeId: number, teamId: number, request: IUpdateTeamSchemeRequest): Observable<IUpdateTeamSchemeResponse> {
        return this.http.put<IUpdateTeamSchemeResponse>(
            `${SchemeServiceConstants.URI_PART}/${schemeId}/${SchemeTeamServiceConstants.URI_PART}/${teamId}`,
            request,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public remove(schemeId: number, teamId: number): Observable<IRemoveTeamSchemeResponse> {
        return this.http.delete<IRemoveTeamSchemeResponse>(
            `${SchemeServiceConstants.URI_PART}/${schemeId}/${SchemeTeamServiceConstants.URI_PART}/${teamId}`,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public get(schemeId: number): Observable<IGetTeamSchemeResponse> {
        return this.http.get<IGetTeamSchemeResponse>(
            `${SchemeServiceConstants.URI_PART}/${schemeId}/${SchemeTeamServiceConstants.URI_PART}`,
            { context: new HttpContext().set(LOADER, { show: true }) }
        );
    }

    public find(teamId: number, request: IFindTeamSchemesRequest): Observable<HttpResponse<IFindTeamSchemesResponse>> {
        return this.http.get<IFindTeamSchemesResponse>(
            `${SchemeServiceConstants.URI_PART}/${SchemeTeamServiceConstants.URI_PART}/${teamId}/find`,
            {
                context: new HttpContext().set(LOADER, { show: false }),
                params: buildHttpParams(request),
                observe: 'response'
            }
        );
    }
}