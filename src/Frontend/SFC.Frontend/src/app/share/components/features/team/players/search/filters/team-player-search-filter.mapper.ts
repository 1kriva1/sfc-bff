import { empty, IPaginationModel, ISortingModel } from "ngx-sfc-common";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { IFindTeamPlayersRequest } from "@share/services/team/player/models/find/find-team-players.request";
import { ITeamPlayersFilterModel } from "./team-player-search-filter.model";
import { mapFindPlayersFilterModel } from "@share/components/features/player/search/mappers/search-players.mapper";

export function mapFindTeamPlayersRequest(
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