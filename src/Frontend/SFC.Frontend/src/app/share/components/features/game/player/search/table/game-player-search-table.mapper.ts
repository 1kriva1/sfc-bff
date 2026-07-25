import { mapPlayerModel } from "@share/mappers/player/player.mapper";
import { EnumService, IGamePlayerServiceModel } from "@share/services";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { IGamePlayerSearchTableModel } from "./game-player-search-table.model";
import { mapGameTeamModel } from "@share/mappers/game/team/game-team.mapper";

export function mapGamePlayerSearchTableModel(
    model: IGamePlayerServiceModel, enumService: EnumService,
    buildActions: ((model: IGamePlayerSearchTableModel) => IDropdownMenuItemModel[]) | empty = null): IGamePlayerSearchTableModel {
    const result: IGamePlayerSearchTableModel = {
        gamePlayer: {
            id: model.Id,
            status: model.Status,
            player: model.Player ? mapPlayerModel(model.Player, enumService) : null!,
            gameTeam: model.GameTeam ? mapGameTeamModel(model.GameTeam, enumService) : null
        }
    };

    result.actions = buildActions ? buildActions(result) : [];

    return result;
}