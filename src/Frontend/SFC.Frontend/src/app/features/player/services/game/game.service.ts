import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpConstants } from "@core/constants";
import { any, isNullOrEmptyString, skip, where } from "ngx-sfc-common";
import { map, Observable, of, delay } from "rxjs";
import { IGetGamesRequest } from "./models/get/get-games.request";
import { IGetGamesResponse } from "./models/get/get-games.response";
import { IGetGamesItemModel } from "./models/get/result/get-games-item.model";

@Injectable({
    providedIn: 'root'
})
export class GameService {

    private stub: IGetGamesItemModel[] = [
        {
            Id: 1,
            Name: 'Game Name 1',
            Date: { Date: new Date(2024, 2, 20), Start: new Date(2024, 2, 20, 18, 0), End: new Date(2024, 2, 20, 20, 0) },
            FreePlay: true,
            Location: { City: 'Konotop', Field: { Name: 'Circle', Photo: null, Raiting: 3 } },
            Result: {
                ScoreOne: { Team: { ShortName: 'bnz', FullName: 'Banzai', Emblem: null }, Value: null },
                ScoreTwo: { Team: { ShortName: 'stp', FullName: 'Stoppers', Emblem: null }, Value: null }
            },
            Status: 3
        },
        {
            Id: 2,
            Name: 'Game Name 2',
            Date: { Date: new Date(2024, 3, 20), Start: new Date(2024, 3, 20, 15, 0), End: new Date(2024, 3, 20, 17, 0) },
            FreePlay: false,
            Location: { City: 'Kyiv', Field: { Name: 'Spartak stadium', Photo: null, Raiting: 3 } },
            Result: {
                ScoreOne: { Team: { ShortName: 'bnz', FullName: 'Banzai', Emblem: null }, Value: null },
                ScoreTwo: { Team: { ShortName: 'stp', FullName: 'Stoppers', Emblem: null }, Value: null }
            },
            Status: 0
        },
        {
            Id: 3,
            Name: 'Game Name 3',
            Date: { Date: new Date(2024, 3, 22), Start: new Date(2024, 4, 22, 11, 0), End: new Date(2024, 3, 22, 12, 0) },
            FreePlay: true,
            Location: { City: 'Kyiv', Field: { Name: 'VDNH', Photo: null, Raiting: 3 } },
            Result: {
                ScoreOne: { Team: { ShortName: 'bnz', FullName: 'Banzai', Emblem: null }, Value: null },
                ScoreTwo: { Team: { ShortName: 'stp', FullName: 'Stoppers', Emblem: null }, Value: null }
            },
            Status: 1
        },
        {
            Id: 4,
            Name: 'Game Name 4',
            Date: { Date: new Date(2024, 1, 20), Start: new Date(2024, 1, 20, 15, 0), End: new Date(2024, 1, 20, 17, 0) },
            FreePlay: false,
            Location: { City: 'Kyiv', Field: { Name: 'Bannikova stadium', Photo: null, Raiting: 3 } },
            Result: {
                ScoreOne: { Team: { ShortName: 'bnz', FullName: 'Banzai', Emblem: null }, Value: 2 },
                ScoreTwo: { Team: { ShortName: 'stp', FullName: 'Stoppers', Emblem: null }, Value: 3 }
            },
            Status: 4
        },
        {
            Id: 5,
            Name: 'Game Name 5',
            Date: { Date: new Date(2022, 7, 20), Start: new Date(2022, 7, 20, 15, 0), End: new Date(2022, 7, 20, 17, 0) },
            FreePlay: true,
            Location: { City: 'Kyiv', Field: { Name: 'Taras Shevchenko campus', Photo: null, Raiting: 3 } },
            Result: {
                ScoreOne: { Team: { ShortName: 'bnz', FullName: 'Banzai', Emblem: null }, Value: null },
                ScoreTwo: { Team: { ShortName: 'stp', FullName: 'Stoppers', Emblem: null }, Value: null }
            },
            Status: 2
        },
        {
            Id: 6,
            Name: 'Game Name 6',
            Date: { Date: new Date(2024, 2, 20), Start: new Date(2024, 2, 20, 18, 0), End: new Date(2024, 2, 20, 20, 0) },
            FreePlay: true,
            Location: { City: 'Konotop', Field: { Name: 'Circle', Photo: null, Raiting: 3 } },
            Result: {
                ScoreOne: { Team: { ShortName: 'bnz', FullName: 'Banzai', Emblem: null }, Value: null },
                ScoreTwo: { Team: { ShortName: 'stp', FullName: 'Stoppers', Emblem: null }, Value: null }
            },
            Status: 3
        },
        {
            Id: 7,
            Name: 'Game Name 7',
            Date: { Date: new Date(2024, 3, 20), Start: new Date(2024, 3, 20, 15, 0), End: new Date(2024, 3, 20, 17, 0) },
            FreePlay: false,
            Location: { City: 'Kyiv', Field: { Name: 'Spartak stadium', Photo: null, Raiting: 3 } },
            Result: {
                ScoreOne: { Team: { ShortName: 'bnz', FullName: 'Banzai', Emblem: null }, Value: null },
                ScoreTwo: { Team: { ShortName: 'stp', FullName: 'Stoppers', Emblem: null }, Value: null }
            },
            Status: 0
        },
        {
            Id: 8,
            Name: 'Game Name 8',
            Date: { Date: new Date(2024, 3, 22), Start: new Date(2024, 4, 22, 11, 0), End: new Date(2024, 3, 22, 12, 0) },
            FreePlay: true,
            Location: { City: 'Kyiv', Field: { Name: 'VDNH', Photo: null, Raiting: 3 } },
            Result: {
                ScoreOne: { Team: { ShortName: 'bnz', FullName: 'Banzai', Emblem: null }, Value: null },
                ScoreTwo: { Team: { ShortName: 'stp', FullName: 'Stoppers', Emblem: null }, Value: null }
            },
            Status: 1
        },
        {
            Id: 9,
            Name: 'Game Name 9',
            Date: { Date: new Date(2024, 1, 20), Start: new Date(2024, 1, 20, 15, 0), End: new Date(2024, 1, 20, 17, 0) },
            FreePlay: false,
            Location: { City: 'Kyiv', Field: { Name: 'Bannikova stadium', Photo: null, Raiting: 3 } },
            Result: {
                ScoreOne: { Team: { ShortName: 'bnz', FullName: 'Banzai', Emblem: null }, Value: 2 },
                ScoreTwo: { Team: { ShortName: 'stp', FullName: 'Stoppers', Emblem: null }, Value: 3 }
            },
            Status: 4
        },
        {

            Id: 10,
            Name: 'Game Name 10',
            Date: { Date: new Date(2022, 7, 20), Start: new Date(2022, 7, 20, 15, 0), End: new Date(2022, 7, 20, 17, 0) },
            FreePlay: true,
            Location: { City: 'Kyiv', Field: { Name: 'Taras Shevchenko campus', Photo: null, Raiting: 3 } },
            Result: {
                ScoreOne: { Team: { ShortName: 'bnz', FullName: 'Banzai', Emblem: null }, Value: null },
                ScoreTwo: { Team: { ShortName: 'stp', FullName: 'Stoppers', Emblem: null }, Value: null }
            },
            Status: 2
        }
    ];

    constructor(private http: HttpClient) { }

    public get(request: IGetGamesRequest, loader: boolean = true): Observable<HttpResponse<IGetGamesResponse>> {
        // return this.http.get<IGetGamesResponse>(
        //     `${GameServiceConstants.URI_PART}/find`,
        //     {
        //         context: new HttpContext().set(LOADER, loader),
        //         params: buildHttpParams(request),
        //         observe: 'response'
        //     }
        // )

        return of(this.stub).pipe(
            delay(1000),
            map(items => {
                let filtered: any = where(items, (item: IGetGamesItemModel) => {
                    return (isNullOrEmptyString(request.Filter.Name) || item.Name.toLowerCase().indexOf(request.Filter.Name) > -1)
                        && (!any(request.Filter.Statuses) || request.Filter.Statuses.indexOf(item.Status) > -1);
                });

                return {
                    body: { Errors: null, Items: skip(filtered, request.Pagination.Page, request.Pagination.Size), Message: 'Success', Success: true },
                    headers: new HttpHeaders().set(HttpConstants.PAGINATION_HEADER_KEY, JSON.stringify({
                        TotalCount: filtered.length,
                        HasNextPage: request.Pagination.Page < Math.ceil(filtered.length / request.Pagination.Size)
                    }))
                } as any;
            })
        );
    }
}