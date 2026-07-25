
import { EnumService, IInviteGamePlayerServiceModel } from "@share/services";
import { mapPlayerModel } from "../player/player.mapper";
import { IInviteGamePlayerModel } from "@share/models/invite/invite-game-player.model";
import { mapGameModel } from "../game/general/game.mapper";

export function mapInviteGamePlayerModel(model: IInviteGamePlayerServiceModel, enumService: EnumService): IInviteGamePlayerModel {
    return {
        id: model.Id,
        status: model.Status,
        playerComment: model.PlayerComment,
        gameComment: model.GameComment,
        player: mapPlayerModel(model.Player, enumService),
        game: mapGameModel(model.Game, enumService),
    };
}