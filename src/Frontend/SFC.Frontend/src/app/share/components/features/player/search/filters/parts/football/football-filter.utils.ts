import { IForm } from "@core/types";
import { IFootballFilterModel } from "./football-filter.model";

export function buildPlayerSearchFilterFootballFormControls(): IForm<IFootballFilterModel> {    
    return {
        height: [null],
        weight: [null],
        positions: [null],
        workingFoot: [null],
        gameStyles: [null],
        physicalCondition: [null],
        skill: [null]
    };
}