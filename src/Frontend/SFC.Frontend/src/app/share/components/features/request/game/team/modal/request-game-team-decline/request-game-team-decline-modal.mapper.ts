import { IRequestGameTeamDeclineRequest } from "@share/services/request/game";
import { IRequestGameTeamDeclineModalFormModel } from "./request-game-team-decline-modal-form.model";

export function mapRequestGameTeamDeclineRequest(model: IRequestGameTeamDeclineModalFormModel): IRequestGameTeamDeclineRequest {
    return {
        Request: {
            Comment: model.comment
        }
    };
}