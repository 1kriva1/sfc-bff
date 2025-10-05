import { empty } from "ngx-sfc-common";
import { IFindTeamsProfileFilterModel } from "./find-teams-profile-filter.model";

export interface IFindTeamsFilterModel {
    Profile?: IFindTeamsProfileFilterModel | empty;
}