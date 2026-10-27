import { IFormationEnumModel } from "@share/models/enum/formation-enum.model";
import { empty } from "ngx-sfc-common";

export interface ITeamEditSchemeRowModel {
    name: string;
    comment: string | empty;
    formation: IFormationEnumModel;
    rating: number;
}