import { ISchemeGameTeamUpdateRequest } from "@share/services";
import { isDefined, where } from "ngx-sfc-common";
import { ISchemeGameTeamEditPageFormModel } from "./models/scheme-game-team-edit-page-form.model";
import { ISchemeFormationPlayerEditFieldFormModel } from "../../../../../components/edit/parts/formation/parts/field/models/scheme-formation-edit-field-form.model";

export function mapSchemeGameTeamUpdateRequest(value: ISchemeGameTeamEditPageFormModel): ISchemeGameTeamUpdateRequest {
    const selectedPlayers: ISchemeFormationPlayerEditFieldFormModel[] =
        where(value.formation.field.players, schemePlayer => isDefined(schemePlayer.player)) || [];

    return {
        Scheme: {
            Profile: {
                General: {
                    Name: value.profile.general.name,
                    Comment: value.profile.general.comment
                }
            },
            Formation: {
                TypeId: value.formation.type.key!,
                FormationId: value.formation.formation,
                Players: selectedPlayers.map((schemePlayer: ISchemeFormationPlayerEditFieldFormModel) => ({
                    PlayerId: schemePlayer.player!,
                    Position: { Index: schemePlayer.position.index, FormationPositionId: schemePlayer.position.formationPosition }
                }))
            }
        }
    };
}