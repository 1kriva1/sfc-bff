import { IFormationEnumModel } from "@share/services/enum/models/enum/formation-enum.model";
import { empty } from "ngx-sfc-common";

export interface ITeamEditSchemeRowModel {
    name: string;
    comment: string | empty;
    formation: IFormationEnumModel;
    rating: number;
}