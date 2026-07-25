import { mapPlayerModel } from "@share/mappers/player/player.mapper";
import { EnumService, IInviteGamePlayerServiceModel } from "@share/services";
import { empty } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { IInviteGamePlayerSearchTableModel } from "./invite-game-player-search-table.model";
import { mapGameModel } from "@share/mappers";

export function mapInviteGamePlayerSearchTableModel(
    model: IInviteGamePlayerServiceModel, enumService: EnumService,
    buildActions: ((model: IInviteGamePlayerSearchTableModel) => IDropdownMenuItemModel[]) | empty = null): IInviteGamePlayerSearchTableModel {
    const result: IInviteGamePlayerSearchTableModel = {
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