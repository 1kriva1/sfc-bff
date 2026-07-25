import { empty } from "ngx-sfc-common";

export interface ICreateGameTeamInvitesModel {
    Team: number;
    Comment?: string | empty;
}