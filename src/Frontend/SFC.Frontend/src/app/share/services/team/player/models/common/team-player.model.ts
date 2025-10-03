import { IPlayerModel } from "@share/services/player/general/models/common/player.model";

export interface ITeamPlayerModel {
    Id: number;
    Status: number;
    Player: IPlayerModel;
}