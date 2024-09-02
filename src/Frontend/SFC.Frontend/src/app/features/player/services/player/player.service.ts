import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerServiceConstants } from './player.constants';
import { LOADER } from '@core/interceptors';
import { IGetPlayerResponse } from './models/get';

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
}