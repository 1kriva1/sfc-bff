import { ISchemeGameTeamCreateRequest } from "@share/services";
import { ISchemeGameTeamCreatePageFormModel } from "./models/scheme-game-team-create-page-form.model";
import { isDefined, where } from "ngx-sfc-common";
import { ISchemeGameTeamFormationPlayerEditFieldFormModel } from "../../components/edit/parts/formation/parts/field/models/scheme-game-team-formation-edit-field-form.model";

export function mapSchemeGameTeamRequestCreate(model: ISchemeGameTeamCreatePageFormModel): ISchemeGameTeamCreateRequest {
    const selectedPlayers: ISchemeGameTeamFormationPlayerEditFieldFormModel[] =
        where(model.formation.field.players, schemePlayer => isDefined(schemePlayer.gameTeamPlayerId)) || [];

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
                Players: selectedPlayers.map((schemePlayer: ISchemeGameTeamFormationPlayerEditFieldFormModel) => ({
                    GameTeamPlayerId: schemePlayer.gameTeamPlayerId!,
                    Position: { Index: schemePlayer.position.index, FormationPositionId: schemePlayer.position.formationPosition }
                }))
            }
        }
    };
}