import { CommonConstants } from "ngx-sfc-common";
import { BaseResponse } from "../models/http/base.response";
import { Observable, of } from "rxjs";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { BaseListResponse } from "@core/models/http/base-list.response";
import { IPageMetadataModel } from "@core/models";

export class HttpConstants {
    static CONTENT_TYPE: string = 'Content-Type';
    static ACCEPT_LANGUAGE: string = 'Accept-Language';
    static PAGINATION_HEADER_KEY: string = 'X-Pagination';
    static INCLUDE_HEADER_KEY: string = 'X-Include';
    static CSRF: string = 'X-CSRF';
    static FAILED_RESPONSE: BaseResponse = { Success: false, Message: CommonConstants.EMPTY_STRING };
    static EMPTY_LIST_RESPONSE: BaseListResponse<any> = { Success: true, Message: CommonConstants.EMPTY_STRING, Errors: null, Items: [] };
    static EMPTY_LIST_RESPONSE_HEADER: IPageMetadataModel = { TotalCount: 0, HasNextPage: false, CurrentPage: 0, HasPreviousPage: false, PageSize: 0, TotalPages: 0, Links: null! };
    static EMPTY_LIST_RESPONSE$: Observable<HttpResponse<BaseListResponse<any>>> = of(new HttpResponse<BaseListResponse<any>>({
        body: HttpConstants.EMPTY_LIST_RESPONSE,
        headers: new HttpHeaders().set(HttpConstants.PAGINATION_HEADER_KEY, JSON.stringify(HttpConstants.EMPTY_LIST_RESPONSE_HEADER))
    }));
}