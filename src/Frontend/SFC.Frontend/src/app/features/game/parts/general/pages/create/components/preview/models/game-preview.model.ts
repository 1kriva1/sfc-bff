import { ITeamModel } from "@share/models/team/general/team.model";
import { empty } from "ngx-sfc-common";

export interface IGamePreviewModel {
    teamA?: ITeamModel | empty;
    teamB?: ITeamModel | empty;
}