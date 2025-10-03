import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOADER, CACHE } from '@core/interceptors';
import { TeamServiceConstants } from '../team-service.constants';
import { IGetTeamDataResponse } from './models/get-team-data.response';
import { ApiConstants } from '../../../constants';

@Injectable({
  providedIn: 'root'
})
export class TeamDataService {

  constructor(private http: HttpClient) { }

  public get(): Observable<IGetTeamDataResponse> {
    return this.http.get<IGetTeamDataResponse>(
      `${TeamServiceConstants.URI_PART}${ApiConstants.DATA_URI_PART}`,
      { context: new HttpContext().set(LOADER, { show: true }).set(CACHE, true) }
    );
  }
}