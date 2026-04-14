import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LOADER } from '@core/interceptors';
import { ICreateGameResponse } from './models/create/create-game.response';
import { ICreateGameRequest } from './models/create/create-game.request';
import { GameServiceConstants } from '../../game-service.constants';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  public create(request: ICreateGameRequest): Observable<ICreateGameResponse> {
    // return this.http.post<ICreateGameResponse>(
    //   `${GameServiceConstants.URI_PART}`,
    //   request,
    //   { context: new HttpContext().set(LOADER, { show: true }) }
    // );

    return of({
      Game: {
        Id: 100,
        Status: 0,
        Profile: {

        }
      },
      Success: true,
      Message: 'All ok!'
    } as ICreateGameResponse);
  }
}