import { empty, IPaginationModel, ISortingModel, nameof } from "ngx-sfc-common";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { mapFindPlayersFilterModel } from "@share/components/features/player/search/mappers/search-players.mapper";
import { IFindTeamPlayersFilterModel, IRequestGamePlayerFindRequest, IRequestGamePlayerRequestFindFilterModel } from "@share/services";
import { buildPropertyPath } from "@core/utils";
import { PlayersTableSorting } from "@share/components/features/player";
import { IRequestGamePlayerSearchFilterModel } from "./request-game-player-search-filter.model";
import { IRequestGamePlayerFilterModel } from "./parts/request-game-player-filter.model";
import { RequestGamePlayerSearchTableColumn } from "../table/request-game-player-search-table-column.enum";

export function mapFindRequestGamePlayerRequest(
    model: IRequestGamePlayerSearchFilterModel,
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): IRequestGamePlayerFindRequest {
    return {
        Pagination: { Page: pagination.page, Size: pagination.size },
        Sorting: _mapSorting(sorting),
        Filter: {
            Player: mapFindPlayersFilterModel(model.player),
            Request: mapFindRequestGamePlayerRequestFilterModel(model.request)
        }
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            case RequestGamePlayerSearchTableColumn.Information:
                return [
                    {
                        Name: buildPropertyPath(nameof<IFindTeamPlayersFilterModel>('Player'), PlayersTableSorting.FirstName),
                        Direction: sorting.direction
                    },
                    {
                        Name: buildPropertyPath(nameof<IFindTeamPlayersFilterModel>('Player'), PlayersTableSorting.LastName),
                        Direction: sorting.direction
                    }
                ]
            case RequestGamePlayerSearchTableColumn.Rating:
                return [
                    {
                        Name: buildPropertyPath(nameof<IFindTeamPlayersFilterModel>('Player'), PlayersTableSorting.Raiting),
                        Direction: sorting.direction
                    }
                ];
            default:
                return [];
        }
    }
}

export function mapFindRequestGamePlayerRequestFilterModel(model: IRequestGamePlayerFilterModel): IRequestGamePlayerRequestFindFilterModel {
    return {
        Statuses: model.general.statuses || [],
    };
}