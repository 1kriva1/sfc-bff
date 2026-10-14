import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetGameDataResponse } from './models/get-game-data.response';
import { GameServiceConstants } from '../game-service.constants';
import { ApiConstants } from '../../../constants/api.constants';
import { CACHE, LOADER } from '@core/interceptors';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  constructor(private http: HttpClient) { }

  public get(): Observable<IGetGameDataResponse> {
    return this.http.get<IGetGameDataResponse>(
      `${GameServiceConstants.URI_PART}${ApiConstants.DATA_URI_PART}`,
      { context: new HttpContext().set(LOADER, { show: true }).set(CACHE, true) }
    );
  }
}