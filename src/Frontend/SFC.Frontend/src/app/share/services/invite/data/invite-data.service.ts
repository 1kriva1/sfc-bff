import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOADER, CACHE } from '@core/interceptors';
import { InviteServiceConstants } from '../invite-service.constants';
import { IGetInviteDataResponse } from './models/get-invite-data.response';
import { ApiConstants } from '../../../constants';

@Injectable({
  providedIn: 'root'
})
export class InviteDataService {

  constructor(private http: HttpClient) { }

  public get(): Observable<IGetInviteDataResponse> {
    return this.http.get<IGetInviteDataResponse>(
      `${InviteServiceConstants.URI_PART}${ApiConstants.DATA_URI_PART}`,
      { context: new HttpContext().set(LOADER, { show: true }).set(CACHE, true) }
    );
  }
}