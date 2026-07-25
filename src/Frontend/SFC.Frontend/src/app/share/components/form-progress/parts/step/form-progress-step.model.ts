import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IFormProgressActionsModel } from "../actions/models/form-progress-actions.model";
import { IMapProgressModel } from "@share/utils";

export interface IFormProgressStepModel {
    key: string;
    name: string;
    icon: IconDefinition;
    color: string;
    command?: string;
    actions?: {
        previous?: IFormProgressActionsModel,
        next?: IFormProgressActionsModel
    },
    mapProgress?: (value: any) => IMapProgressModel;
}