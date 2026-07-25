import { empty, IPaginationModel, ISortingModel, nameof } from "ngx-sfc-common";
import { ISortingModel as ISortingRequestModel } from "@core/models"; 
import { mapFindPlayersFilterModel } from "@share/components/features/player/search/mappers/search-players.mapper";
import { IFindInviteGamePlayerInviteFilterModel, IFindInviteGamePlayerRequest, IFindTeamPlayersFilterModel } from "@share/services";
import { buildPropertyPath } from "@core/utils";
import { PlayersTableSorting } from "@share/components/features/player";
import { IInviteGamePlayerSearchFilterModel } from "./invite-game-player-search-filter.model";
import { InviteGamePlayerSearchTableColumn } from "../table/invite-game-player-search-table-column.enum";
import { IInviteGamePlayerFilterModel } from "./parts/invite-game-player-filter.model";

export function mapFindInviteGamePlayerRequest(
    model: IInviteGamePlayerSearchFilterModel,
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): IFindInviteGamePlayerRequest {
    return {
        Pagination: { Page: pagination.page, Size: pagination.size },
        Sorting: _mapSorting(sorting),
        Filter: {
            Player: mapFindPlayersFilterModel(model.player),
            Invite: mapFindInviteGamePlayerInviteFilterModel(model.invite)
        }
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            case InviteGamePlayerSearchTableColumn.Information:
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
            case InviteGamePlayerSearchTableColumn.Rating:
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

export function mapFindInviteGamePlayerInviteFilterModel(model: IInviteGamePlayerFilterModel): IFindInviteGamePlayerInviteFilterModel {
    return {
        Statuses: model.general.statuses || [],
    };
}