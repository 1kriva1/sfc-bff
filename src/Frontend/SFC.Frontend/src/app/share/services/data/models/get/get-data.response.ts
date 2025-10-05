import { BaseErrorResponse } from "@core/models";
import { IDataValueModel } from "../common/data-value.model";
import { IStatTypeDataValueModel } from "../common/stat-type-data-value.model";

export interface IGetDataResponse extends BaseErrorResponse {
    FootballPositions: IDataValueModel[];
    GameStyles: IDataValueModel[];
    StatCategories: IDataValueModel[];
    StatSkills: IDataValueModel[];
    StatTypes: IStatTypeDataValueModel[];
    WorkingFoots: IDataValueModel[];
    Shirts: IDataValueModel[];
}