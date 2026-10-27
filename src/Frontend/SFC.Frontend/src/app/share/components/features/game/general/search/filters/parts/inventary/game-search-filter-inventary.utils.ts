import { IForm } from "@core/types";
import { IGameSearchFilterInventaryModel } from "./game-search-filter-inventary.model";

export function buildGameSearchFilterInventaryFormControls(): IForm<IGameSearchFilterInventaryModel> {
    return {
        shirtsRequired: [null],
        shirtsCount: [null]
    };
}