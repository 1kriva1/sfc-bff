import { EnumService, IFindTeamPlayerInvitesRequest } from "@share/services";
import { empty, IPaginationModel, ISortingModel } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { PlayersTableSorting } from "@share/components/features/player/search/table";
import { ITeamEditPlayersInviteTableModel } from "./parts/table/team-edit-players-invite-table.model";
import { mapFindPlayersFilterModel } from "@share/components/features/player/search/mappers/search-players.mapper";
import { mapTeamPlayerInviteModel } from "@share/mappers/team-player-invite.mapper";
import { TeamEditPlayersInviteTableColumn } from "./parts/table/team-edit-players-invite-table-column.enum";
import { ITeamEditPlayersInviteFilterModel } from "./team-edit-players-invite-form.model";
import { ITeamPlayerInviteModel } from "@share/services/invite/team/player/service/models/common/team-player-invite.model";

export function mapFindTeamPlayersRequest(
    model: ITeamEditPlayersInviteFilterModel,
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): IFindTeamPlayerInvitesRequest {
    return {
        Pagination: { Page: pagination.page, Size: pagination.size },
        Sorting: _mapSorting(sorting),
        Filter: {
            Invite: {
                Statuses: model.statuses
            },
            Player: mapFindPlayersFilterModel(model)
        }
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            case TeamEditPlayersInviteTableColumn.Player:
                return [
                    { Name: PlayersTableSorting.FirstName, Direction: sorting.direction },
                    { Name: PlayersTableSorting.LastName, Direction: sorting.direction }
                ];
            default:
                return [];
        }
    }
}

export function mapTeamEditPlayersInviteTableModel(
    model: ITeamPlayerInviteModel,
    enumService: EnumService,
    buildActions: ((model: ITeamEditPlayersInviteTableModel) => IDropdownMenuItemModel[]) | empty = null): ITeamEditPlayersInviteTableModel {

    const result: ITeamEditPlayersInviteTableModel = mapTeamPlayerInviteModel(model, enumService);

    result.actions = buildActions ? buildActions(result) : [];

    return result;
}