import { StatsValue } from "@share/types";
import { IFootballEditModel } from "../parts/football/football-edit.model";
import { IGeneralEditModel } from "../parts/general/general-edit.model";

export interface IEditModel {
    photo: File | null;
    general: IGeneralEditModel;
    football: IFootballEditModel;
    stats: StatsValue;
}