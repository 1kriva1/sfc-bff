import { IRemoveTeamPlayerRequest } from "@share/services";
import { ITeamPlayerRemoveModalFormModel } from "./team-player-remove-modal-form.model";

export function mapRemoveTeamPlayerRequest(model: ITeamPlayerRemoveModalFormModel): IRemoveTeamPlayerRequest {
    return {
        TeamPlayer: {
            Comment: model.comment
        }
    };
}