import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerServiceConstants } from './player.constants';
import { buildHttpParams } from 'ngx-sfc-common';
import { LOADER } from '@core/interceptors/loader/loader.interceptor';
import { IGetPlayerResponse } from './models/get';
import { IFindPlayersResponse, IFindPlayersRequest } from './models/find';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    constructor(private http: HttpClient) { }

    public get(id: number): Observable<IGetPlayerResponse> {
        return this.http.get<IGetPlayerResponse>(
            `${PlayerServiceConstants.URI_PART}/${id}`,
            { context: new HttpContext().set(LOADER, true) }
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
}