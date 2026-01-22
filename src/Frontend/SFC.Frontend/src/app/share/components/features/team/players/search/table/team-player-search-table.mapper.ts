import { mapTeamPlayerStatisticActivityModel } from "@share/mappers";
import { mapPlayerModel } from "@share/mappers/player/player.mapper";
import { EnumService } from "@share/services";
import { ITeamPlayerModel } from "@share/services/team/player/general/models/common/team-player.model";
import { ITeamPlayerStatisticItemValueModel } from "@share/services/team/player/statistic/models/find/team-player-statistic-item.model";
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

export function mapTeamPlayerSearchTableStatisticModel(
    model: ITeamPlayerStatisticItemValueModel, enumService: EnumService,
    buildActions: ((model: ITeamPlayerSearchTableModel) => IDropdownMenuItemModel[]) | empty = null): ITeamPlayerSearchTableModel {
    const result: ITeamPlayerSearchTableModel = mapTeamPlayerSearchTableModel(model.TeamPlayer, enumService);

    result.activity = mapTeamPlayerStatisticActivityModel(model.Activity);

    result.actions = buildActions ? buildActions(result) : [];

    return result;
}