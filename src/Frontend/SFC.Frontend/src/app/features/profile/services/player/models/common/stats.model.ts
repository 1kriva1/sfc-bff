import { IPlayerStatValueModel } from "@share/services/player/general/models/common/player-stat-value.model";
import { IStatPointsModel } from "./stat-points.model";

export interface IStatsModel {
    Points: IStatPointsModel;
    Values: IPlayerStatValueModel[];
}