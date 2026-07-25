import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { buildHttpParams } from 'ngx-sfc-common';
import { LOADER } from '@core/interceptors';
import { IFindTeamsRequest } from './models/find/find-teams.request';
import { IFindTeamsResponse } from './models/find/find-teams.response';
import { TeamServiceConstants } from '../../team-service.constants';
import { ICreateTeamRequest } from './models/create/create-team.request';
import { ICreateTeamResponse } from './models/create/create-team.response';
import { IUpdateTeamResponse } from './models/update/update-team.response';
import { IUpdateTeamRequest } from './models/update/update-team.request';
import { IGetTeamResponse } from './models/get/get-team.response';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  public create(request: ICreateTeamRequest): Observable<ICreateTeamResponse> {
    return this.http.post<ICreateTeamResponse>(
        `${TeamServiceConstants.URI_PART}`,
        request,
        { context: new HttpContext().set(LOADER, { show: true }) }
    );
}

public update(id: number, request: IUpdateTeamRequest): Observable<IUpdateTeamResponse> {
    return this.http.put<IUpdateTeamResponse>(
        `${TeamServiceConstants.URI_PART}/${id}`,
        request,
        { context: new HttpContext().set(LOADER, { show: true }) }
    )
}

public get(id: number): Observable<IGetTeamResponse> {
    return this.http.get<IGetTeamResponse>(
        `${TeamServiceConstants.URI_PART}/${id}`,
        { context: new HttpContext().set(LOADER, { show: true }) }
    );
}

  public find(request: IFindTeamsRequest, loader: boolean = true): Observable<HttpResponse<IFindTeamsResponse>> {
    return this.http.get<IFindTeamsResponse>(
      `${TeamServiceConstants.URI_PART}/find`,
      {
        context: new HttpContext().set(LOADER, { show: loader }),
        params: buildHttpParams(request),
        observe: 'response'
      }
    )
  }
}