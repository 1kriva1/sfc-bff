import { IRequestGamePlayerDeclineRequest } from "@share/services/request/game";
import { IRequestGamePlayerDeclineModalFormModel } from "./request-game-player-decline-modal-form.model";

export function mapRequestGamePlayerDeclineRequest(model: IRequestGamePlayerDeclineModalFormModel): IRequestGamePlayerDeclineRequest {
    return {
        Request: {
            Comment: model.comment
        }
    };
}