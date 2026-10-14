import { ISchemeGameTeamUpdateRequest } from "@share/services";
import { isDefined, where } from "ngx-sfc-common";
import { ISchemeGameTeamEditPageFormModel } from "./models/scheme-game-team-edit-page-form.model";
import { ISchemeGameTeamFormationPlayerEditFieldFormModel } from "../../components/edit/parts/formation/parts/field/models/scheme-game-team-formation-edit-field-form.model";

export function mapSchemeGameTeamUpdateRequest(value: ISchemeGameTeamEditPageFormModel): ISchemeGameTeamUpdateRequest {
    const selectedPlayers: ISchemeGameTeamFormationPlayerEditFieldFormModel[] =
        where(value.formation.field.players, schemePlayer => isDefined(schemePlayer.gameTeamPlayerId)) || [];

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
                Players: selectedPlayers.map((schemePlayer: ISchemeGameTeamFormationPlayerEditFieldFormModel) => ({
                    GameTeamPlayerId: schemePlayer.gameTeamPlayerId!,
                    Position: { Index: schemePlayer.position.index, FormationPositionId: schemePlayer.position.formationPosition }
                }))
            }
        }
    };
}