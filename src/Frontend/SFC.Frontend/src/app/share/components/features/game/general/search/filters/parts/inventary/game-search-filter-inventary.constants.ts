import { IRadioItemModel } from "ngx-sfc-inputs";
import { GameSearchFlterInventaryLocalization } from "./game-search-filter-inventary.localization";

export class GameSearchFlterInventaryConstants {
    static get SHIRTS_REQUIRED_RADIO_ITEMS(): IRadioItemModel[] {
        return [
            {
                value: null, // TODO use false instead of null
                label: GameSearchFlterInventaryLocalization.INPUT.SHIRTS_REQUIRED.ITEMS.NO_MATTER,
                default: true
            },
            {
                value: true,
                label: GameSearchFlterInventaryLocalization.INPUT.SHIRTS_REQUIRED.ITEMS.REQUIRED
            }
        ];
    };

    static SHIRTS_COUNT_MAX_VALUE: number = 10;
}
