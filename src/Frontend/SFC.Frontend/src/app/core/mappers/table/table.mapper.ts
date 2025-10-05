import { IPaginationModel } from "ngx-sfc-common";
import { IPaginationModel as IPaginationRequestModel } from "../../models/http/pagination.model";

export function mapPaginationModel(pagination: IPaginationModel): IPaginationRequestModel {
    return { Page: pagination.page, Size: pagination.size };
}