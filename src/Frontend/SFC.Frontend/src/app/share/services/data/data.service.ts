import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOADER, CACHE } from '@core/interceptors';
import { DataServiceConstants } from './data-service.constants';
import { IGetDataResponse } from './models/get/get-data.response';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  public get(): Observable<IGetDataResponse> {
    return this.http.get<IGetDataResponse>(
      `${DataServiceConstants.URI_PART}`,
      { context: new HttpContext().set(LOADER, { show: true }).set(CACHE, true) }
    );
  }
}