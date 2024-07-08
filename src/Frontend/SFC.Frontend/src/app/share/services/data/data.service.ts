import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOADER, CACHE } from '@core/interceptors';
import { DataServiceConstants } from './data.constants';
import { IGetDataResponse } from './models/get-data.response';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  public get(): Observable<IGetDataResponse> {
    return this.http.get<IGetDataResponse>(
      `${DataServiceConstants.URI_PART}`,
      { context: new HttpContext().set(LOADER, true).set(CACHE, true) }
    );
  }
}