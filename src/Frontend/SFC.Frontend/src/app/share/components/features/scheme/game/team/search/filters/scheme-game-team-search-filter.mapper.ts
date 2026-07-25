import { empty, IPaginationModel, ISortingModel } from "ngx-sfc-common";
import { ISchemeGameTeamSearchFilterModel } from "./scheme-game-team-search-filter.model";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { ISchemeGameTeamFindRequest } from "@share/services";
import { mapLimitSearchModel } from "@share/utils";
import { SchemeGameTeamSearchTableSortingColumn } from "../table/enums/scheme-game-team-search-table-sorting-column.enum";
import { SchemeGameTeamSearchTableColumn } from "../table/enums/scheme-game-team-search-table-column.enum";

export function mapSchemeGameTeamFindRequest(
    model: ISchemeGameTeamSearchFilterModel,
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): ISchemeGameTeamFindRequest {
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
            case SchemeGameTeamSearchTableColumn.Information:
                return [{ Name: SchemeGameTeamSearchTableSortingColumn.Name, Direction: sorting.direction }];
            case SchemeGameTeamSearchTableColumn.Rating:
                return [{ Name: SchemeGameTeamSearchTableSortingColumn.Total, Direction: sorting.direction }];
            default:
                return [];
        }
    }
}