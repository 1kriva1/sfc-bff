import { empty, IPaginationModel, ISortingModel, nameof } from "ngx-sfc-common";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { IFindTeamPlayersFilterModel, IGamePlayerFindRequest, IGamePlayerGamePlayerFindFilterModel } from "@share/services";
import { buildPropertyPath } from "@core/utils";
import { PlayersTableSorting } from "@share/components/features/player";
import { IGamePlayerSearchFilterModel } from "./game-player-search-filter.model";
import { IGamePlayerFilterModel } from "./parts/game-player-filter.model";
import { GamePlayerSearchTableColumn } from "../table/game-player-search-table-column.enum";
import { mapFindPlayersFilterModel } from "@share/components/features/player/search/mappers/search-players.mapper";

export function mapGamePlayerFindRequest(
    model: IGamePlayerSearchFilterModel,
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): IGamePlayerFindRequest {
    return {
        Pagination: { Page: pagination.page, Size: pagination.size },
        Sorting: _mapSorting(sorting),
        Filter: {
            Player: mapFindPlayersFilterModel(model.player),
            GamePlayer: mapGamePlayerGamePlayerFindFilterModel(model.gamePlayer)
        }
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            case GamePlayerSearchTableColumn.Information:
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
            case GamePlayerSearchTableColumn.Rating:
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

export function mapGamePlayerGamePlayerFindFilterModel(model?: IGamePlayerFilterModel | empty): IGamePlayerGamePlayerFindFilterModel {
    return {
        Statuses: model?.general.statuses || []
    };
}