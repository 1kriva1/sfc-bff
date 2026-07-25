import { mapPlayerModel } from "@share/mappers/player/player.mapper";
import { EnumService, IRequestGamePlayerServiceModel } from "@share/services";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { IRequestGamePlayerSearchTableModel } from "./request-game-player-search-table.model";
import { mapGameModel } from "@share/mappers";

export function mapRequestGamePlayerSearchTableModel(
    model: IRequestGamePlayerServiceModel, enumService: EnumService,
    buildActions: ((model: IRequestGamePlayerSearchTableModel) => IDropdownMenuItemModel[]) | empty = null): IRequestGamePlayerSearchTableModel {
    const result: IRequestGamePlayerSearchTableModel = {
        id: model.Id,
        status: model.Status,
        gameComment: model.GameComment,
        playerComment: model.PlayerComment,
        player: mapPlayerModel(model.Player, enumService),
        game: mapGameModel(model.Game, enumService)
    };

    result.actions = buildActions ? buildActions(result) : [];

    return result;
}