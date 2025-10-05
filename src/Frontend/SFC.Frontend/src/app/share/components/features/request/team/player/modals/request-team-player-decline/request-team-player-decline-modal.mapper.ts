import { IDeclineTeamPlayerRequestRequest } from "../../../../../../../services/request/team/player";
import { IRequestTeamPlayerDeclineModalFormModel } from "./request-team-player-decline-modal-form.model";

export function mapDeclineTeamPlayerRequestRequest(model: IRequestTeamPlayerDeclineModalFormModel): IDeclineTeamPlayerRequestRequest {
    return {
        Request: {
            Comment: model.comment
        }
    };
}