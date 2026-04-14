import { IFormProgressStepModel } from "./parts/step/form-progress-step.model";

export interface IFormProgressModel {
    step: IFormProgressStepModel;
    selected: boolean;
    pristine: boolean;
}