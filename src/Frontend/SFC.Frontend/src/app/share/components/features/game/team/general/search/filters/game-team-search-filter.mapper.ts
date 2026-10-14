import { mapPaginationModel } from "@core/mappers";
import { empty, IPaginationModel, ISortingModel } from "ngx-sfc-common";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { IFindGameTeamsGameTeamFilterModel, IFindGameTeamsRequest } from "@share/services";
import { GameTeamSearchTableColumn } from "../table/game-team-search-table-column.enum";
import { IGameTeamFilterModel } from "./models/game-team-filter.model";
import { mapFindTeamsFilterModel } from "@share/components/features/team/general/search/filters/team-search-filter.mapper";
import { IGameTeamSearchFilterModel } from "./models/game-team-search-filter.model";

export function mapFindGameTeamsRequest(
    model: IGameTeamSearchFilterModel,
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): IFindGameTeamsRequest {
    return {
        Pagination: mapPaginationModel(pagination),
        Sorting: _mapSorting(sorting),
        Filter: {
            Team: mapFindTeamsFilterModel(model.team),
            GameTeam: mapGameTeamGamePlayerFindFilterModel(model.gameTeam)
        }
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            case GameTeamSearchTableColumn.Information:
                return [{
                    Name: 'Name',
                    Direction: sorting.direction
                }]
            default:
                return [];
        }
    }
}

export function mapGameTeamGamePlayerFindFilterModel(model?: IGameTeamFilterModel): IFindGameTeamsGameTeamFilterModel {
    return {
        Statuses: model?.statuses || [],
    };
}