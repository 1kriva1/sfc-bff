import { IStatisticModel } from "@share/services/common/statistic/statistic.model";
import { ITeamPlayerModel } from "../../../general/models/common/team-player.model";
import { ITeamPlayerStatisticActivityModel } from "./team-player-statistic-activity.model";

export interface ITeamPlayerStatisticItemValueModel {
    TeamPlayer: ITeamPlayerModel;
    Activity: ITeamPlayerStatisticActivityModel;
}

export interface ITeamPlayerStatisticItemModel extends IStatisticModel<ITeamPlayerStatisticItemValueModel[]> {}