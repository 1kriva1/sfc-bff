import { empty, IPaginationModel, ISortingModel } from "ngx-sfc-common";
import { ISchemeTeamSearchFilterModel } from "./scheme-team-search-filter.model";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { IFindTeamSchemesRequest } from "@share/services";
import { mapLimitSearchModel } from "@share/utils";
import { SchemeTeamSearchTableSortingColumn } from "../table/enums/scheme-team-search-table-sorting-column.enum";
import { SchemeTeamSearchTableColumn } from "../table/enums/scheme-team-search-table-column.enum";

export function mapFindTeamSchemesRequest(
    model: ISchemeTeamSearchFilterModel,
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): IFindTeamSchemesRequest {
    return {
        Pagination: { Page: pagination.page, Size: pagination.size },
        Sorting: _mapSorting(sorting),
        Filter: {
            Profile: {
                General: {
                    Name: model.name,
                    Comment: model.general?.comment
                }
            },
            Formation: {
                Formation: model.formation?.formation?.key,
                Players: {
                    Stats: {
                        Total: mapLimitSearchModel(model.formation?.raiting)
                    }
                }
            }
        }
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            case SchemeTeamSearchTableColumn.Information:
                return [{ Name: SchemeTeamSearchTableSortingColumn.Name, Direction: sorting.direction }];
            case SchemeTeamSearchTableColumn.Rating:
                return [{ Name: SchemeTeamSearchTableSortingColumn.Total, Direction: sorting.direction }];
            default:
                return [];
        }
    }
}