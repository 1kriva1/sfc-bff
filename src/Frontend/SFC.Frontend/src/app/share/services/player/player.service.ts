import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { buildHttpParams, isDefined } from 'ngx-sfc-common';
import { Observable, tap } from 'rxjs';
import { PlayerServiceConstants } from './player.constants';
import {
  IGetPlayerByUserResponse,
  IPlayerByUserModel,
  IPlayerByUserProfileModel
} from './models/by-user/get-player-by-user.response';
import { ObservableModel } from '@core/models';
import { LOADER } from '@core/interceptors';
import { IFindPlayersRequest, IFindPlayersResponse } from './models/find';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public playerId: ObservableModel<number> = new ObservableModel();

  public player: ObservableModel<IPlayerByUserProfileModel> = new ObservableModel();

  public get playerCreated(): boolean { return isDefined(this.playerId.value); }

  constructor(private http: HttpClient) { }

  public get(): Observable<IGetPlayerByUserResponse> {
    return this.http.get<IGetPlayerByUserResponse>(
      `${PlayerServiceConstants.URI_PART}/byuser`,
      { context: new HttpContext().set(LOADER, true) }
    ).pipe(
      tap((response: IGetPlayerByUserResponse) =>
        this.update(response.Player))
    );
  }

  public find(request: IFindPlayersRequest, loader: boolean = true): Observable<HttpResponse<IFindPlayersResponse>> {
    return this.http.get<IFindPlayersResponse>(
      `${PlayerServiceConstants.URI_PART}/find`,
      {
        context: new HttpContext().set(LOADER, loader),
        params: buildHttpParams(request),
        observe: 'response'
      }
    )
  }

  public update(player: IPlayerByUserModel | null): void {
    this.playerId.subject.next({ data: player?.Id! });
    this.player.subject.next({ data: player?.Profile! });
  }
}