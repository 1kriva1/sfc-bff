import { IPaginationModel, PaginationConstants } from "ngx-sfc-common";

export class TableConstants {
    static SEARCH_DEBOUNCE_TIME: number = 1000;

   // how many rows/cards allowed in one page
    static PAGINATION_SIZE: number = 12;

    // how many pagination circles
    static PAGINATION_COUNT: number = 5;

    // start from page and use such pagination size
    static PAGINATION: IPaginationModel = { page: PaginationConstants.DEFAULT_PAGE, size: this.PAGINATION_SIZE };
}