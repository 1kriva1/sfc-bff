import { IPaginationModel, PaginationConstants } from "ngx-sfc-common";

export class SearchConstants {
    static DEFAULT_FILTER_MODEL: any = {};
    static SEARCH_DEBOUNCE_TIME: number = 1000;
    static PAGINATION_SIZE: number = 7;
    static PAGINATION_COUNT: number = 5;
    static PAGINATION: IPaginationModel = { page: PaginationConstants.DEFAULT_PAGE, size: this.PAGINATION_SIZE };
    static FILTERS_MODAL_ID: string = 'modal-filters'
}