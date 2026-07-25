
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { empty } from "ngx-sfc-common";
import { IEnumModel } from "@core/types";
import { IStatTypeDataValueModel } from "../../services/data/models/common/stat-type-data-value.model";
import { IDataValueModel } from "../../services/data/models/common/data-value.model";
import { IStatTypeEnumModel } from "../../services/enum/models/enum/stat-type-enum.model";
import { mapGamePlayerStatus, mapGameStatus, mapGameTeamStatus, mapInviteStatuses, mapRequestStatuses, mapTeamPlayerStatuses, mapTeamStatuses } from "./enum-icon.mapper";
import { IFormationDataValueModel, IFormationPositionDataValueModel } from "../../services/scheme/data/models/get-scheme-data.response";
import { IFormationPositionEnumModel } from "../../services/enum/models/enum/formation-position-enum.model";
import { IFormationEnumModel } from "../../services/enum/models/enum/formation-enum.model";
import { getFormationLabel } from "../../utils/formations";

export function mapEnum(value: IDataValueModel): IEnumModel<number> {
    return {
        key: value.Id,
        value: value.Title
    };
}

export function mapImageEnum(value: IDataValueModel, imagePath: string, imageExtension: string = 'png'): IEnumModel<number> {
    return {
        key: value.Id,
        value: value.Title,
        image: `${imagePath}/${value.Id}.${imageExtension}`
    };
}

export function mapIconEnum(value: IDataValueModel, mapIcon: ((id: number) => IconDefinition | empty)): IEnumModel<number> {
    return {
        key: value.Id,
        value: value.Title,
        icon: mapIcon(value.Id)!
    };
}

export function mapStatTypeEnum(value: IStatTypeDataValueModel): IStatTypeEnumModel {
    return {
        key: value.Id,
        value: value.Title,
        category: value.Category,
        skill: value.Skill
    };
}

export function mapFormationEnum(value: IFormationDataValueModel, imagePath: string, imageExtension: string = 'png'): IFormationEnumModel {
    return {
        key: value.Id,
        value: value.Values,
        description: value.Title,
        label: getFormationLabel(value.Values.slice(1)),
        image: `${imagePath}/${value.Id}.${imageExtension}`
    };
}

export function mapFormationPositionEnum(value: IFormationPositionDataValueModel): IFormationPositionEnumModel {
    return {
        key: value.Id,
        value: value.Title,
        footballPosition: value.FootballPosition
    };
}

export function mapTeamStatusEnum(value: IDataValueModel): IEnumModel<number> {
    return mapIconEnum(value, mapTeamStatuses);
}

export function mapTeamPlayerStatusEnum(value: IDataValueModel): IEnumModel<number> {
    return mapIconEnum(value, mapTeamPlayerStatuses);
}

export function mapInviteStatusEnum(value: IDataValueModel): IEnumModel<number> {
    return mapIconEnum(value, mapInviteStatuses);
}

export function mapRequestStatusEnum(value: IDataValueModel): IEnumModel<number> {
    return mapIconEnum(value, mapRequestStatuses);
}

export function mapGameStatusEnum(value: IDataValueModel): IEnumModel<number> {
    return mapIconEnum(value, mapGameStatus);
}

export function mapGameTeamStatusEnum(value: IDataValueModel): IEnumModel<number> {
    return mapIconEnum(value, mapGameTeamStatus);
}

export function mapGamePlayerStatusEnum(value: IDataValueModel): IEnumModel<number> {
    return mapIconEnum(value, mapGamePlayerStatus);
}