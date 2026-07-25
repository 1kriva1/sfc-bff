import { empty, IPaginationModel, ISortingModel, nameof } from "ngx-sfc-common";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { mapFindPlayersFilterModel } from "@share/components/features/player/search/mappers/search-players.mapper";
import { IFindTeamPlayersFilterModel, IGameTeamPlayerFindRequest, IGameTeamPlayerGameTeamPlayerFindFilterModel } from "@share/services";
import { buildPropertyPath } from "@core/utils";
import { PlayersTableSorting } from "@share/components/features/player";
import { IGameTeamPlayerSearchFilterModel } from "./game-team-player-search-filter.model";
import { IGameTeamPlayerFilterModel } from "./parts/game-team-player-filter.model";
import { GameTeamPlayerSearchTableColumn } from "../table/game-team-player-search-table-column.enum";

export function mapGameTeamPlayerFindRequest(
    model: IGameTeamPlayerSearchFilterModel,
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): IGameTeamPlayerFindRequest {
    return {
        Pagination: { Page: pagination.page, Size: pagination.size },
        Sorting: _mapSorting(sorting),
        Filter: {
            Player: mapFindPlayersFilterModel(model.player),
            GameTeamPlayer: mapGameTeamPlayerGameTeamPlayerFindFilterModel(model.gameTeamPlayer)
        }
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            case GameTeamPlayerSearchTableColumn.Information:
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
            case GameTeamPlayerSearchTableColumn.Rating:
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

export function mapGameTeamPlayerGameTeamPlayerFindFilterModel(model: IGameTeamPlayerFilterModel): IGameTeamPlayerGameTeamPlayerFindFilterModel {
    return {
        ExcludeIds: model.excludeIds
    };
}