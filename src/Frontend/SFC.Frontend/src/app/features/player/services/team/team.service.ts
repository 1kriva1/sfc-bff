import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpConstants } from "@core/constants";
import { LOADER } from "@core/interceptors/loader/loader.interceptor";
import { any, buildHttpParams, isNullOrEmptyString, skip, where } from "ngx-sfc-common";
import { map, Observable, of, delay } from "rxjs";
import { IGetTeamsRequest } from "./models/get/get-teams.request";
import { IGetTeamsResponse } from "./models/get/get-teams.response";
import { IGetTeamsItemModel } from "./models/get/result/get-teams-item.model";
import { TeamServiceConstants } from "./team.constants";

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    private stub: IGetTeamsItemModel[] = [
        {
            Id: 1,
            FullName: 'Team A',
            ShortName: 'TMA',
            City: 'Konotop',
            CreatedDate: new Date(2021, 4, 12),
            Logo: null,
            Raiting: 3,
            Schema: '4-4-2',
            Status: 0,
            Coach: null
        },
        {
            Id: 2,
            FullName: 'Team B',
            ShortName: 'TMB',
            City: 'Kyiv',
            CreatedDate: new Date(2020, 2, 22),
            Logo: null,
            Raiting: 4,
            Schema: '5-2-3',
            Status: 1,
            Coach: null
        },
        {
            Id: 3,
            FullName: 'Team C',
            ShortName: 'TMC',
            City: 'Vinniza',
            CreatedDate: new Date(2019, 10, 5),
            Logo: null,
            Raiting: 5,
            Schema: '3-2-2',
            Status: 2,
            Coach: { Id: 1, FirstName: 'Andrii', LastName: 'Kryvoruk', Photo: null }
        },
        {
            Id: 4,
            FullName: 'Team D',
            ShortName: 'TMD',
            City: 'Konotop',
            CreatedDate: new Date(2021, 4, 12),
            Logo: null,
            Raiting: 2,
            Schema: '4-4-2',
            Status: 3,
            Coach: null
        },
        {
            Id: 5,
            FullName: 'Team E',
            ShortName: 'TME',
            City: 'Konotop',
            CreatedDate: new Date(2021, 4, 12),
            Logo: null,
            Raiting: 3,
            Schema: '4-4-2',
            Status: 4,
            Coach: null
        },
        {
            Id: 6,
            FullName: 'Team F',
            ShortName: 'TMA',
            City: 'Konotop',
            CreatedDate: new Date(2021, 4, 12),
            Logo: null,
            Raiting: 3,
            Schema: '4-4-2',
            Status: 0,
            Coach: null
        },
        {
            Id: 7,
            FullName: 'Team G',
            ShortName: 'TMB',
            City: 'Kyiv',
            CreatedDate: new Date(2020, 2, 22),
            Logo: null,
            Raiting: 4,
            Schema: '5-2-3',
            Status: 1,
            Coach: null
        },
        {
            Id: 8,
            FullName: 'Team H',
            ShortName: 'TMC',
            City: 'Vinniza',
            CreatedDate: new Date(2019, 10, 5),
            Logo: null,
            Raiting: 5,
            Schema: '3-2-2',
            Status: 2,
            Coach: { Id: 1, FirstName: 'Andrii', LastName: 'Kryvoruk', Photo: null }
        },
        {
            Id: 9,
            FullName: 'Team I',
            ShortName: 'TMD',
            City: 'Konotop',
            CreatedDate: new Date(2021, 4, 12),
            Logo: null,
            Raiting: 2,
            Schema: '4-4-2',
            Status: 3,
            Coach: null
        },
        {
            Id: 10,
            FullName: 'Team J',
            ShortName: 'TME',
            City: 'Konotop',
            CreatedDate: new Date(2021, 4, 12),
            Logo: null,
            Raiting: 3,
            Schema: '4-4-2',
            Status: 4,
            Coach: null
        },
    ];

    constructor(private http: HttpClient) { }

    public get(request: IGetTeamsRequest, loader: boolean = true): Observable<HttpResponse<IGetTeamsResponse>> {
        // return this.http.get<IGetTeamsResponse>(
        //     `${TeamServiceConstants.URI_PART}/find`,
        //     {
        //         context: new HttpContext().set(LOADER, loader),
        //         params: buildHttpParams(request),
        //         observe: 'response'
        //     }
        // )

        return of(this.stub).pipe(
            delay(1000),
            map(items => {
                let filtered: any = where(items, (item: IGetTeamsItemModel) => {
                    return (isNullOrEmptyString(request.Filter.Name) || item.FullName.toLowerCase().indexOf(request.Filter.Name.toLowerCase()) > -1)
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