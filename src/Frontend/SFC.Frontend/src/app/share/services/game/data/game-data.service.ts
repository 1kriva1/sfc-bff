import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    // return this.http.get<IGetGameDataResponse>(
    //   `${GameServiceConstants.URI_PART}${ApiConstants.DATA_URI_PART}`,
    //   { context: new HttpContext().set(LOADER, { show: true }).set(CACHE, true) }
    // );

    return of({
      GameStatuses: [
        {
          Id: 0,
          Title: 'New'
        },
        {
          Id: 1,
          Title: 'Upcoming'
        },
        {
          Id: 2,
          Title: 'Active'
        },
        {
          Id: 3,
          Title: 'Finished'
        },
        {
          Id: 4,
          Title: 'Canceled'
        }
      ],
      GameTeamStatuses: [
        {
          Id: 0,
          Title: 'In game'
        },
        {
          Id: 1,
          Title: 'Out of game'
        }
      ],
      GamePlayerStatuses: [
         {
          Id: 0,
          Title: 'In game'
        },
        {
          Id: 1,
          Title: 'Out of game'
        }
      ]
    } as IGetGameDataResponse);
  }
}