import { EnumService } from "@share/services";
import { ITeamSchemeServiceModel } from "@share/services";
import { getFormationPositionEnum } from "@share/utils/formations/formations.utils";
import { mapPlayerModel } from "../player/player.mapper";
import { mapTeamModel } from "../team/general/team.mapper";
import { ISchemeTeamModel } from "@share/models/scheme/team/scheme-team.model";

export function mapTeamSchemeModel(model: ITeamSchemeServiceModel, enumService: EnumService): ISchemeTeamModel {
    return {
        id: model.Id,
        team: mapTeamModel(model.Team, enumService),
        profile: {
            general: {
                name: model.Profile.General.Name,
                comment: model.Profile.General.Comment,

            }
        },
        formation: {
            formationId: model.Formation.FormationId,
            typeId: model.Formation.TypeId,
            players: model.Formation.Players.map(schemePlayer => ({
                player: mapPlayerModel(schemePlayer.Player, enumService),
                position: {
                    index: schemePlayer.Position.Index,
                    formationPosition: getFormationPositionEnum(schemePlayer.Position.FormationPositionId, enumService.enums.formationPositions),
                    x: schemePlayer.Position.X,
                    y: schemePlayer.Position.Y
                }
            }))
        }
    }
}