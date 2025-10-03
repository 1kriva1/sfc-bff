import { EnumService, IFindTeamPlayerRequestsRequest } from "@share/services";
import { empty, IPaginationModel, ISortingModel } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { PlayersTableSorting } from "@share/components/features/player/search/table";
import { mapFindPlayersFilterModel } from "@share/components/features/player/search/mappers/search-players.mapper";
import { ITeamPlayerRequestModel } from "@share/services/request/team/player/models/common/team-player-request.model";
import { mapTeamPlayerRequestModel } from "@share/mappers/team-player-request.mapper";
import { ITeamEditPlayersRequestTableModel } from "./parts/table/team-edit-players-request-table.model";
import { TeamEditPlayersRequestTableColumn } from "./parts/table/team-edit-players-request-table-column.enum";
import { ITeamEditPlayersRequestFilterModel } from "./team-edit-players-request-form.model";

export function mapFindTeamPlayerRequestsRequest(
    model: ITeamEditPlayersRequestFilterModel,
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): IFindTeamPlayerRequestsRequest {
    return {
        Pagination: { Page: pagination.page, Size: pagination.size },
        Sorting: _mapSorting(sorting),
        Filter: {
            Request: {
                Statuses: model.statuses
            },
            Player: mapFindPlayersFilterModel(model)
        }
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            case TeamEditPlayersRequestTableColumn.Player:
                return [
                    { Name: PlayersTableSorting.FirstName, Direction: sorting.direction },
                    { Name: PlayersTableSorting.LastName, Direction: sorting.direction }
                ];
            default:
                return [];
        }
    }
}

export function mapTeamPlayersRequestTableModel(
    model: ITeamPlayerRequestModel,
    enumService: EnumService,
    buildActions: ((model: ITeamEditPlayersRequestTableModel) => IDropdownMenuItemModel[]) | empty = null): ITeamEditPlayersRequestTableModel {

    const result: ITeamEditPlayersRequestTableModel = mapTeamPlayerRequestModel(model, enumService);

    result.actions = buildActions ? buildActions(result) : [];

    return result;
}