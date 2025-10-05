import { IAvailabilityEditFormModel } from "@share/components/availability-edit/availability-edit-form.model";
import { empty } from "ngx-sfc-common";

export interface ITeamAvailabilityProfileEditFormModel {
    value: IAvailabilityEditFormModel[] | empty;
}