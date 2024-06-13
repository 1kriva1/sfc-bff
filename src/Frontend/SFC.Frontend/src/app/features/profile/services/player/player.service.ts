import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonConstants } from 'ngx-sfc-common';
import { map, Observable } from 'rxjs';
import { LOADER } from '@core/interceptors/loader/loader.interceptor';
import { PlayerServiceConstants } from './player.constants';
import {
    ICreatePlayerRequest, ICreatePlayerResponse,
    IGetPlayerResponse, IUpdatePlayerRequest, IUpdatePlayerResponse
} from './models';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    constructor(private http: HttpClient) { }

    public create(request: ICreatePlayerRequest): Observable<ICreatePlayerResponse> {
        return this.http.post<ICreatePlayerResponse>(
            `${PlayerServiceConstants.URI_PART}`,
            request,
            { context: new HttpContext().set(LOADER, true) }
        );
    }

    public update(id: number, request: IUpdatePlayerRequest): Observable<IUpdatePlayerResponse> {
        return this.http.put<IUpdatePlayerResponse | null>(
            `${PlayerServiceConstants.URI_PART}/${id}`,
            request,
            { context: new HttpContext().set(LOADER, true) }
        ).pipe(
            map((response: IUpdatePlayerResponse | null) => response
                || { Success: true, Errors: null, Message: CommonConstants.EMPTY_STRING })
        )
    }

    public get(id: number): Observable<IGetPlayerResponse> {
        return this.http.get<IGetPlayerResponse>(
            `${PlayerServiceConstants.URI_PART}/${id}`,
            { context: new HttpContext().set(LOADER, true) }
        );
    }
}