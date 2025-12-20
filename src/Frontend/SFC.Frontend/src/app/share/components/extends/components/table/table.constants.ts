import { IPaginationModel, PaginationConstants } from "ngx-sfc-common";

export class TableConstants {
    static SEARCH_DEBOUNCE_TIME: number = 1000;
    static PAGINATION_SIZE: number = 7;
    static PAGINATION_COUNT: number = 5;
    static PAGINATION: IPaginationModel = { page: PaginationConstants.DEFAULT_PAGE, size: this.PAGINATION_SIZE };
}