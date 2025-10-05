import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { buildHttpParams } from 'ngx-sfc-common';
import { LOADER } from '@core/interceptors';
import { IGetPlayerByUserResponse } from './models/by-user/get-player-by-user.response';
import { PlayerServiceConstants } from '../player-service.constants';
import { PlayerViewService } from '../view/player-view.service';
import { IFindPlayersRequest } from './models/find/find-players.request';
import { IFindPlayersResponse } from './models/find/find-players.response';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient, private playerViewService: PlayerViewService) { }

  public get(): Observable<IGetPlayerByUserResponse> {
    return this.http.get<IGetPlayerByUserResponse>(
      `${PlayerServiceConstants.URI_PART}/byuser`,
      { context: new HttpContext().set(LOADER, { show: true }) }
    ).pipe(
      tap((response: IGetPlayerByUserResponse) =>
        this.playerViewService.update(response.Player))
    );
  }

  public find(request: IFindPlayersRequest, loader: boolean = true): Observable<HttpResponse<IFindPlayersResponse>> {
    return this.http.get<IFindPlayersResponse>(
      `${PlayerServiceConstants.URI_PART}/find`,
      {
        context: new HttpContext().set(LOADER, { show: loader }),
        params: buildHttpParams(request),
        observe: 'response'
      }
    )
  }
}