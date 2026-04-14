import { IGetInviteDataResponse } from "../../../invite/data/models/get-invite-data.response";
import { IGetRequestDataResponse } from "../../../request/data/models/get-request-data.response";
import { IGetSchemeDataResponse } from "../../../scheme/data/models/get-scheme-data.response";
import { IGetDataResponse } from "../../../data/models/get/get-data.response";
import { IGetTeamDataResponse } from "../../../team/data/models/get-team-data.response";
import { IGetGameDataResponse } from "../../../game/data/models/get-game-data.response";

export interface IServicesDataModel {
    data: IGetDataResponse,
    invite: IGetInviteDataResponse,
    request: IGetRequestDataResponse,
    team: IGetTeamDataResponse,
    scheme: IGetSchemeDataResponse,
    game: IGetGameDataResponse
}