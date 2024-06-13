import { CommonConstants } from "ngx-sfc-common";
import { BaseResponse } from "../models/http/base.response";

export class HttpConstants {
    static CONTENT_TYPE: string = 'Content-Type';
    static ACCEPT_LANGUAGE: string = 'Accept-Language';
    static PAGINATION_HEADER_KEY: string = 'X-Pagination';
    static CSRF: string = 'X-CSRF';
    static FAILED_RESPONSE: BaseResponse = { Success: false, Message: CommonConstants.EMPTY_STRING }
}