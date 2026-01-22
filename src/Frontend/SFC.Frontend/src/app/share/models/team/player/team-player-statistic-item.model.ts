import { ITeamPlayerStatisticActivityModel } from "./team-player-statistic-activity.model";
import { ITeamPlayerModel } from "./team-player.model";

export interface ITeamPlayerStatisticItemModel {
    teamPlayer: ITeamPlayerModel;
    activity: ITeamPlayerStatisticActivityModel;
}