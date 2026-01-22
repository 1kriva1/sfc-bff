import { EnumService, IFindTeamPlayersRequest } from "@share/services";
import { empty, IPaginationModel, ISortingModel } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { ISortingModel as ISortingRequestModel } from "@core/models";
import { PlayersTableSorting } from "@share/components/features/player/search/table";
import { ITeamEditPlayersSquadTableModel } from "./parts/table/team-edit-players-squad-table.model";
import { mapFindPlayersFilterModel } from "@share/components/features/player/search/mappers/search-players.mapper";
import { ITeamPlayerModel } from "@share/services/team/player/general/models/common/team-player.model";
import { mapTeamPlayerModel } from "@share/mappers/team/player/team-player.mapper";
import { ITeamEditPlayersSquadFilterModel } from "./team-edit-players-squad-form.model";
import { TeamEditPlayersSquadTableColumn } from "./parts/table/team-edit-players-squad-table-column.enum";

export function mapFindTeamPlayersRequest(
    model: ITeamEditPlayersSquadFilterModel,
    pagination: IPaginationModel,
    sorting: ISortingModel | empty): IFindTeamPlayersRequest {
    return {
        Pagination: { Page: pagination.page, Size: pagination.size },
        Sorting: _mapSorting(sorting),
        Filter: {
            TeamPlayer: {
                Statuses: model.statuses,
            },
            Player: mapFindPlayersFilterModel(model)
        }
    }

    function _mapSorting(sorting: ISortingModel | empty): ISortingRequestModel[] {
        switch (sorting?.id) {
            case TeamEditPlayersSquadTableColumn.Player:
                return [
                    { Name: PlayersTableSorting.FirstName, Direction: sorting.direction },
                    { Name: PlayersTableSorting.LastName, Direction: sorting.direction }
                ];
            default:
                return [];
        }
    }
}

export function mapTeamEditPlayersSquadTableModel(
    model: ITeamPlayerModel,
    enumService: EnumService,
    buildActions: ((model: ITeamEditPlayersSquadTableModel) => IDropdownMenuItemModel[]) | empty = null): ITeamEditPlayersSquadTableModel {

    const result: ITeamEditPlayersSquadTableModel =  mapTeamPlayerModel(model, enumService);

    result.actions = buildActions ? buildActions(result) : [];

    return result;
}