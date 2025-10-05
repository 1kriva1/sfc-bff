import { empty } from "ngx-sfc-common";

export interface IPlayerViewGeneralProfileModel {
    photo: string | empty;
    firstName: string;
    lastName: string;
}