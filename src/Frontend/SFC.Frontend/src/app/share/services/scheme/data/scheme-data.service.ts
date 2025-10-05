import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOADER, CACHE } from '@core/interceptors';
import { IGetSchemeDataResponse } from './models/get-scheme-data.response';
import { SchemeServiceConstants } from '../scheme.constants';
import { ApiConstants } from '../../../constants';

@Injectable({
  providedIn: 'root'
})
export class SchemeDataService {

  constructor(private http: HttpClient) { }

  public get(): Observable<IGetSchemeDataResponse> {
    return this.http.get<IGetSchemeDataResponse>(
      `${SchemeServiceConstants.URI_PART}${ApiConstants.DATA_URI_PART}`,
      { context: new HttpContext().set(LOADER, { show: true }).set(CACHE, true) }
    );
  }
}