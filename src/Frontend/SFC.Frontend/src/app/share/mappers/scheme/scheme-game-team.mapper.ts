import { ISchemeGameTeamModel } from "@share/models/scheme/game/team/scheme-game-team.model";
import { EnumService, ISchemeGameTeamServiceModel } from "@share/services";
import { mapTeamModel } from "../team/general/team.mapper";
import { getFormationPositionEnum } from "@share/utils";
import { mapGameModel } from "../game";
import { mapGameTeamPlayerModel } from "../game/team/game-team-player.mapper";


export function mapSchemeGameTeamModel(model: ISchemeGameTeamServiceModel, enumService: EnumService): ISchemeGameTeamModel {
    return {
        id: model.Id,
        game:mapGameModel(model.Game, enumService),
        team: mapTeamModel(model.Team, enumService),
        profile: {
            general: {
                name: model.Profile.General.Name,
                comment: model.Profile.General.Comment
            }
        },
        formation: {
            formationId: model.Formation.FormationId,
            typeId: model.Formation.TypeId,
            players: model.Formation.Players.map(schemePlayer => ({
                gameTeamPlayer: mapGameTeamPlayerModel(schemePlayer.GameTeamPlayer, enumService),
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