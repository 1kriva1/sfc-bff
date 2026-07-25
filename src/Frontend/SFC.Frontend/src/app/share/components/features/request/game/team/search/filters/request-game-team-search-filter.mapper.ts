import { empty, IPaginationModel, ISortingModel, nameof } from "ngx-sfc-common";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { IRequestGameTeamFindFilterModel, IRequestGameTeamFindRequest, IRequestGameTeamRequestFindFilterModel } from "@share/services";
import { buildPropertyPath } from "@core/utils";
import { PlayersTableSorting } from "@share/components/features/player";
import { IRequestGameTeamFilterModel } from "./parts/request-game-team-filter.model";
import { IRequestGameTeamSearchFilterModel } from "./request-game-team-search-filter.model";
import { mapFindTeamsFilterModel } from "@share/components/features/team";
import { RequestGameTeamSearchTableColumn } from "../table/request-game-team-search-table-column.enum";

export function mapFindRequestGameTeamRequest(
    model: IRequestGameTeamSearchFilterModel,
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): IRequestGameTeamFindRequest {
    return {
        Pagination: { Page: pagination.page, Size: pagination.size },
        Sorting: _mapSorting(sorting),
        Filter: {
            Team: mapFindTeamsFilterModel(model.team),
            Request: mapFindRequestGameTeamRequestFilterModel(model.request)
        }
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            case RequestGameTeamSearchTableColumn.Information:
                return [
                    {
                        Name: buildPropertyPath(nameof<IRequestGameTeamFindFilterModel>('Team'), PlayersTableSorting.FirstName),
                        Direction: sorting.direction
                    },
                    {
                        Name: buildPropertyPath(nameof<IRequestGameTeamFindFilterModel>('Team'), PlayersTableSorting.LastName),
                        Direction: sorting.direction
                    }
                ]
            case RequestGameTeamSearchTableColumn.Rating:
                return [
                    {
                        Name: buildPropertyPath(nameof<IRequestGameTeamFindFilterModel>('Team'), PlayersTableSorting.Raiting),
                        Direction: sorting.direction
                    }
                ];
            default:
                return [];
        }
    }
}

export function mapFindRequestGameTeamRequestFilterModel(model: IRequestGameTeamFilterModel): IRequestGameTeamRequestFindFilterModel {
    return {
        Statuses: model.general.statuses || [],
    };
}