import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INCLUDE, LOADER } from '@core/interceptors';
import { ICreateGameResponse } from './models/create/create-game.response';
import { ICreateGameRequest } from './models/create/create-game.request';
import { IUpdateGameRequest } from './models/update/update-game.request';
import { IUpdateGameResponse } from './models/update/update-game.response';
import { IGetGameResponse } from './models/get/get-game.response';
import { GameServiceConstants } from '../../game-service.constants';
import { GameInclude } from '@share/enums';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  public create(request: ICreateGameRequest): Observable<ICreateGameResponse> {
    return this.http.post<ICreateGameResponse>(
      `${GameServiceConstants.URI_PART}`,
      request,
      { context: new HttpContext().set(LOADER, { show: true }) }
    );
  }

  public update(id: number, request: IUpdateGameRequest): Observable<IUpdateGameResponse> {
    return this.http.put<IUpdateGameResponse>(
      `${GameServiceConstants.URI_PART}/${id}`,
      request,
      { context: new HttpContext().set(LOADER, { show: true }) }
    );
  }

  public get(id: number, include: GameInclude[] = []): Observable<IGetGameResponse> {
    return this.http.get<IGetGameResponse>(
      `${GameServiceConstants.URI_PART}/${id}`,
      {
        context: new HttpContext()
          .set(LOADER, { show: true })
          .set(INCLUDE, include)
      }
    );
  }
}