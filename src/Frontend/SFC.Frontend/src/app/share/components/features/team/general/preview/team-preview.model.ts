import { IAvailabilityEditFormModel } from "@share/components/availability-edit/availability-edit-form.model";
import { IPlayerModel } from "@share/models/player/player.model";
import { empty } from "ngx-sfc-common";
import { ITagModel } from "ngx-sfc-components";

export interface ITeamPreviewModel {
    name: string;
    city: string;
    description: string | empty;
    tags: ITagModel[];
    availability: IAvailabilityEditFormModel[];
    players: IPlayerModel[];
}