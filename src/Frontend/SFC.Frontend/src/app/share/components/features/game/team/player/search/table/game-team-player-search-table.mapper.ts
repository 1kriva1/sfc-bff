import { mapPlayerModel } from "@share/mappers/player/player.mapper";
import { EnumService, IGameTeamPlayerServiceModel } from "@share/services";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { IGameTeamPlayerSearchTableModel } from "./game-team-player-search-table.model";
import { mapTeamModel } from "@share/mappers";

export function mapGameTeamPlayerSearchTableModel(
    model: IGameTeamPlayerServiceModel, enumService: EnumService,
    buildActions: ((model: IGameTeamPlayerSearchTableModel) => IDropdownMenuItemModel[]) | empty = null): IGameTeamPlayerSearchTableModel {
    const result: IGameTeamPlayerSearchTableModel = {
        gameTeamPlayer: {
            id: model.Id,
            status: model.Status,
            player: model.Player ? mapPlayerModel(model.Player, enumService) : null!,
            team: model.Team ? mapTeamModel(model.Team, enumService) : null!,
        }
    };

    result.actions = buildActions ? buildActions(result) : [];

    return result;
}