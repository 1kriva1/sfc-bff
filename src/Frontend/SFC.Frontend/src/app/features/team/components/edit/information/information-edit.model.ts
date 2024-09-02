import { IAvailabilityEditModel } from "./parts/availability/models/availability-edit.model";
import { IFinancialEditModel } from "./parts/financial/financial-edit.model";
import { IGeneralEditModel } from "./parts/general/general-edit.model";

export interface IInformationEditModel {
    general: IGeneralEditModel;
    availability: IAvailabilityEditModel[];
    financial: IFinancialEditModel;
}