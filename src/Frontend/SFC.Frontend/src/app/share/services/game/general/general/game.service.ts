import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INCLUDE, LOADER } from '@core/interceptors';
import { ICreateGameResponse } from './models/create/create-game.response';
import { ICreateGameRequest } from './models/create/create-game.request';
import { IUpdateGameRequest } from './models/update/update-game.request';
import { IUpdateGameResponse } from './models/update/update-game.response';
import { IGetGameResponse } from './models/get/get-game.response';
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
        Status: 1,
        Profile: {
          General: {
            Name: "Test name",
            Description: "My super description",
            Date: new Date(4, 15, 2026),
            From: '10:45:20',
            To: '14:45:20',
            Stadium: 5,
            Tags: ['tag 1', 'tag 2', 'tag 3']
          },
          Inventary: {
            ShirtsRequired: true,
            ShirtsCount: 2
          },
          Financial: {
            FreeGame: false,
            PayAmount: 330
          }
        },
        Teams: []
      },
      Errors: null,
      Success: true,
      Message: 'All ok!'
    } as ICreateGameResponse);
  }

  public update(id: number, request: IUpdateGameRequest): Observable<IUpdateGameResponse> {
    // return this.http.put<IUpdateGameResponse>(
    //   `${GameServiceConstants.URI_PART}/${id}`,
    //   request,
    //   { context: new HttpContext().set(LOADER, { show: true }) }
    // )

    return of({
      Success: true,
      Message: 'All ok!'
    } as IUpdateGameResponse);
  }

  public get(id: number): Observable<IGetGameResponse> {
    // return this.http.get<IGetGameResponse>(
    //   `${GameServiceConstants.URI_PART}/${id}`,
    //   { context: new HttpContext().set(LOADER, { show: true }) }
    // );

    return of({
      Game: {
        Id: id,
        Status: 1,
        Profile: {
          General: {
            Name: "Test name",
            Description: "My super description",
            Date: new Date(4, 15, 2026),
            From: '10:45:20',
            To: '14:45:20',
            Stadium: 5,
            Tags: ['tag 1', 'tag 2', 'tag 3']
          },
          Inventary: {
            ShirtsRequired: true,
            ShirtsCount: 2
          },
          Financial: {
            FreeGame: false,
            PayAmount: 330
          }
        }
      },
      Errors: null,
      Success: true,
      Message: 'All ok!'
    } as IGetGameResponse);
  }

  public getV2(id: number, include: string[] = []): Observable<IGetGameResponse> {
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