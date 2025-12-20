import { IEnumModel } from "@core/types";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { IStatsTypeModel } from "@share/models";
import { empty, ITagModel } from "ngx-sfc-common";

export interface IPlayerRowContentModel {
    freePlayIcon: IconDefinition;
    skill: number;
    tags: ITagModel[];
    gameStyle: IEnumModel<number> | empty;
    workingFoot: IEnumModel<number> | empty;
    raiting: number;
    types: IStatsTypeModel[];
}