
import { EnumService } from "@share/services";
import { mapPlayerModel } from "./player.mapper";
import { ITeamPlayerInviteModel } from "@share/models/invite/team-player-invite.model";
import { mapTeamModel } from "./team.mapper";
import { getEnum } from "@core/utils";
import { ITeamPlayerInviteServiceModel } from "@share/services/invite/team/player";

export function mapTeamPlayerInviteModel(model: ITeamPlayerInviteServiceModel, enumService: EnumService): ITeamPlayerInviteModel {
    return {
        id: model.Id,
        status: getEnum(model.Status, enumService.enums.inviteStatuses)!,
        playerComment: model.PlayerComment,
        teamComment: model.TeamComment,
        player: mapPlayerModel(model.Player, enumService),
        team: mapTeamModel(model.Team, enumService),
    };
}