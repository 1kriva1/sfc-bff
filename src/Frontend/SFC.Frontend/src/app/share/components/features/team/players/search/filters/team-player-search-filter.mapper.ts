import { empty, IPaginationModel, ISortingModel, nameof } from "ngx-sfc-common";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { IFindTeamPlayersRequest } from "@share/services/team/player/general/models/find/find-team-players.request";
import { ITeamPlayerSearchFilterModel, ITeamPlayersFilterModel } from "./models/team-player-search-filter.model";
import { mapFindPlayersFilterModel } from "@share/components/features/player/search/mappers/search-players.mapper";
import { IFindTeamPlayersFilterModel, IFindTeamPlayersTeamPlayerFilterModel } from "@share/services";
import { ITeamPlayerFilterModel } from "./models/team-player-filter.model";
import { TeamPlayerSearchTableColumn } from "../table/team-player-search-table-column.enum";
import { buildPropertyPath } from "@core/utils";
import { PlayersTableSorting } from "@share/components/features/player";

// TODO - Legacy
export function mapIFindTeamPlayersRequest(
    model: ITeamPlayersFilterModel,
    excludePlayerIds: number[],
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): IFindTeamPlayersRequest {
    return {
        Pagination: { Page: pagination.page, Size: pagination.size },
        Sorting: _mapSorting(sorting),
        Filter: {
            TeamPlayer: {
                Statuses: model.statuses,
            },
            Player: mapFindPlayersFilterModel(model, excludePlayerIds)
        }
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            default:
                return [];
        }
    }
}
// End TODO - Legacy

export function mapFindTeamPlayersRequest(
    model: ITeamPlayerSearchFilterModel,
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): IFindTeamPlayersRequest {
    return {
        Pagination: { Page: pagination.page, Size: pagination.size },
        Sorting: _mapSorting(sorting),
        Filter: {
            Player: mapFindPlayersFilterModel(model.player),
            TeamPlayer: mapFindTeamPlayersTeamPlayerFilterModel(model.teamPlayer)
        }
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            case TeamPlayerSearchTableColumn.Information:
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
            case TeamPlayerSearchTableColumn.Rating:
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

export function mapFindTeamPlayersTeamPlayerFilterModel(model: ITeamPlayerFilterModel): IFindTeamPlayersTeamPlayerFilterModel {
    return {
        Statuses: model.general.statuses || [],
    };
}