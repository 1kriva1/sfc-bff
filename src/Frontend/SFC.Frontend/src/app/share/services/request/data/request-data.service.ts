import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOADER, CACHE } from '@core/interceptors';
import { RequestServiceConstants } from '../request-service.constants';
import { IGetRequestDataResponse } from './models/get-request-data.response';
import { ApiConstants } from '../../../constants';

@Injectable({
  providedIn: 'root'
})
export class RequestDataService {
  
  constructor(private http: HttpClient) { }

  public get(): Observable<IGetRequestDataResponse> {
    return this.http.get<IGetRequestDataResponse>(
      `${RequestServiceConstants.URI_PART}${ApiConstants.DATA_URI_PART}`,
      { context: new HttpContext().set(LOADER, { show: true }).set(CACHE, true) }
    );
  }
}