import { IForm } from "@core/types";
import { IGameSearchFilterFinancialModel } from "./game-search-filter-financial.model";

export function buildGameSearchFilterFinancialFormControls(): IForm<IGameSearchFilterFinancialModel> {
    return {
        freeGame: [null],
        payAmount: [null]
    };
}