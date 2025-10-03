import { mapPlayerModel } from "@share/mappers/player.mapper";
import { EnumService } from "@share/services";
import { ITeamPlayerModel } from "@share/services/team/player/models/common/team-player.model";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { ITeamPlayerSearchTableModel } from "./team-player-search-table.model";

export function mapTeamPlayerSearchTableModel(
    model: ITeamPlayerModel, enumService: EnumService,
    buildActions: ((model: ITeamPlayerSearchTableModel) => IDropdownMenuItemModel[]) | empty = null): ITeamPlayerSearchTableModel {
    const result: ITeamPlayerSearchTableModel = {
        id: model.Id,
        status: model.Status,
        player: mapPlayerModel(model.Player, enumService)
    };

    result.actions = buildActions ? buildActions(result) : [];

    return result;
}