import { IPaginationModel, PaginationConstants } from "ngx-sfc-common";

export class BadgesTableConstants {
    static PAGINATION_SIZE: number = 8;
    static PAGINATION: IPaginationModel = { page: PaginationConstants.DEFAULT_PAGE, size: this.PAGINATION_SIZE };
}