import { IForm } from "@core/types";
import { IStatsFilterModel } from "./stats-filter.model";

export function buildPlayerSearchFilterStatsFormControls(): IForm<IStatsFilterModel> {    
    return {
        total: [null],
        physical: [null],
        mental: [null],
        skill: [null],
        raiting: [null]
    };
}