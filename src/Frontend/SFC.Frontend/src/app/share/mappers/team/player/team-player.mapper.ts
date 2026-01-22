import { ITeamPlayerModel } from "@share/models/team/player/team-player.model";
import { ITeamPlayerModel as ITeamPlayerHttpModel } from "@share/services/team/player/general/models/common/team-player.model";
import { EnumService } from "@share/services";
import { mapPlayerModel } from "../../player/player.mapper";

export function mapTeamPlayerModel(model: ITeamPlayerHttpModel, enumService: EnumService): ITeamPlayerModel {
    return {
        id: model.Id,
        status: model.Status,
        player: mapPlayerModel(model.Player, enumService)
    };
}