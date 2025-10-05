import { BaseErrorResponse } from "@core/models";
import { IDataValueModel } from "../../../data/models/common/data-value.model";

export interface IFormationDataValueModel extends IDataValueModel {
    Values: number[][];
}

export interface IFormationPositionDataValueModel extends IDataValueModel {
    FootballPosition: number;
}

export interface IGetSchemeDataResponse extends BaseErrorResponse {
    Formations: IFormationDataValueModel[];
    FormationPositions: IFormationPositionDataValueModel[];
    SchemeTypes: IDataValueModel[];
}