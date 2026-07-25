import { EnumService, IUpdateTeamSchemeRequest } from "@share/services";
import { getFormationType } from "@share/utils/formations"
import { mapSelectItem } from "@share/utils/inputs"
import { ISchemeTeamEditPageFormModel } from "./scheme-team-edit-page-form.model";
import { IEnumModel } from "@core/types";
import { isDefined, where } from "ngx-sfc-common";
import { ISchemeTeamModel } from "@share/models/scheme/team/scheme-team.model";
import { getFormationEnum } from "@share/utils/formations/formations.utils";
import { IFormationEnumModel } from "@share/services/enum/models/enum/formation-enum.model";
import { ISchemeFormationPlayerEditFieldFormModel } from "../../../../components/edit/parts/formation/parts/field/models/scheme-formation-edit-field-form.model";
import { buildSchemeTeamFormationPlayerEditFieldFormModels } from "../../../../components/edit/parts/formation/scheme-formation-edit.utils";

export function mapSchemeTeamEditPageFormModel(model: ISchemeTeamModel, enumService: EnumService): ISchemeTeamEditPageFormModel {
    const formationType: IEnumModel<number> = getFormationType(model.formation.typeId, enumService.enums.formationType)!,
        formation: IFormationEnumModel = getFormationEnum(model.formation.formationId, enumService.enums.formations)!;

    return {
        profile: {
            general: {
                name: model.profile.general.name,
                comment: model.profile.general.comment
            }
        },
        formation: {
            type: mapSelectItem(formationType),
            formation: model.formation.formationId,
            field: {
                players: buildSchemeTeamFormationPlayerEditFieldFormModels(formation, model.formation.players)
            }
        }
    };
}

export function mapUpdateTeamSchemeRequest(model: ISchemeTeamEditPageFormModel): IUpdateTeamSchemeRequest {
    const selectedPlayers: ISchemeFormationPlayerEditFieldFormModel[] =
        where(model.formation.field.players, schemePlayer => isDefined(schemePlayer.player)) || [];

    return {
        Scheme: {
            Profile: {
                General: {
                    Name: model.profile.general.name,
                    Comment: model.profile.general.comment
                }
            },
            Formation: {
                TypeId: model.formation.type.key!,
                FormationId: model.formation.formation,
                Players: selectedPlayers.map((schemePlayer: ISchemeFormationPlayerEditFieldFormModel) => ({
                    PlayerId: schemePlayer.player!,
                    Position: { Index: schemePlayer.position.index, FormationPositionId: schemePlayer.position.formationPosition }
                }))
            }
        }
    };
}