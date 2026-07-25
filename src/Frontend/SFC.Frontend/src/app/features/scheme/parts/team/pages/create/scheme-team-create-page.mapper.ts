import { SchemeTeamCreatePageFormModel } from "./models/scheme-team-create-page-form.model";
import { isDefined, where } from "ngx-sfc-common";
import { ICreateTeamSchemeRequest } from "@share/services";
import { ISchemeFormationPlayerEditFieldFormModel } from "../../../../components/edit/parts/formation/parts/field/models/scheme-formation-edit-field-form.model";

export function mapCreateTeamSchemeRequest(model: SchemeTeamCreatePageFormModel): ICreateTeamSchemeRequest {
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