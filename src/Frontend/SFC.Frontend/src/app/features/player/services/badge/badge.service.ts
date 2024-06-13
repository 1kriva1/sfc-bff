import { HttpClient, HttpContext, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpConstants } from "@core/constants";
import { LOADER } from "@core/interceptors/loader/loader.interceptor";
import { any, buildHttpParams, isNullOrEmptyString, skip, where } from "ngx-sfc-common";
import { delay, map, Observable, of } from "rxjs";
import { IGetTeamsItemModel } from "../team/models/get/result/get-teams-item.model";
import { BadgeServiceConstants } from "./badge.constants";
import { IGetBadgesRequest } from "./models/get/get-badges.request";
import { IGetBadgesResponse } from "./models/get/get-badges.response";
import { IGetBadgesItemModel } from "./models/get/result/get-badges-item.model";

@Injectable({
    providedIn: 'root'
})
export class BadgeService {

    private stub: IGetBadgesItemModel[] = [
        {
            Type: 0,
            Points: 60,
            Progress: 87,
            Total: 100
        },
        {
            Type: 1,
            Points: 100,
            Progress: 57,
            Total: 100
        },
        {
            Type: 2,
            Points: 20,
            Progress: 3,
            Total: 10
        },
        {
            Type: 3,
            Points: 10,
            Progress: 0,
            Total: 1
        },
        {
            Type: 4,
            Points: 70,
            Progress: 33,
            Total: 50
        },
        {
            Type: 5,
            Points: 70,
            Progress: 100,
            Total: 100
        },
        {
            Type: 6,
            Points: 30,
            Progress: 99,
            Total: 100
        },
        {
            Type: 7,
            Points: 30,
            Progress: 99,
            Total: 100
        },
        {
            Type: 8,
            Points: 70,
            Progress: 33,
            Total: 50
        },
        {
            Type: 9,
            Points: 70,
            Progress: 77,
            Total: 100
        },
        {
            Type: 10,
            Points: 30,
            Progress: 99,
            Total: 100
        },
        {
            Type: 11,
            Points: 30,
            Progress: 99,
            Total: 100
        }
    ];

    constructor(private http: HttpClient) { }

    public get(request: IGetBadgesRequest, loader: boolean = true): Observable<HttpResponse<IGetBadgesResponse>> {
        // return this.http.get<IGetBadgesResponse>(
        //     `${BadgeServiceConstants.URI_PART}/find`,
        //     {
        //         context: new HttpContext().set(LOADER, loader),
        //         params: buildHttpParams(request),
        //         observe: 'response'
        //     }
        // )

        return of(this.stub).pipe(
            delay(1000),
            map(items => {
                let filtered: any = items;
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