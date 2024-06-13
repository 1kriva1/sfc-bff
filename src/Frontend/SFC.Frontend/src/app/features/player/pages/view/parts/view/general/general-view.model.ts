import { IEnumModel } from "@core/types";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { empty } from "ngx-sfc-common";
import { ITagModel } from "ngx-sfc-components";

export interface IGeneralViewAvailableModel {
    days: ITagModel[];
    time: string;
    hasDays: boolean;
    hasTime: boolean;
}

export interface IGeneralViewBirthdayModel {
    day: number;
    month: string;
    year: number;
}

export interface IGeneralViewFreePlayModel {
    value: boolean;
    icon: IconDefinition;
}

export interface IGeneralViewPositionModel {
    main: IEnumModel<number> | empty;
    additional: IEnumModel<number> | empty;
}

export interface IGeneralViewSizeModel {
    height: number | empty;
    weight: number | empty;
}

export interface IGeneralViewFootsModel {
    working: IEnumModel<number> | empty;
    weekFoot: number | empty;
}

export interface IGeneralViewModel {
    available: IGeneralViewAvailableModel;
    birthday: IGeneralViewBirthdayModel | null;
    biography: string | null;
    tags: ITagModel[];
    freePlay: IGeneralViewFreePlayModel;
    position: IGeneralViewPositionModel;
    physicalCondition: number;
    size: IGeneralViewSizeModel;
    gameStyle: IEnumModel<number> | empty;
    skill: number;
    foots: IGeneralViewFootsModel;
    number: number | empty;
}