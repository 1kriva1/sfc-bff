import { IRadioItemModel } from "ngx-sfc-inputs";
import { GameSearchFlterFinancialLocalization } from "./game-search-filter-financial.localization";

export class GameSearchFlterFinancialConstants {
    static get FREE_PLAY_RADIO_ITEMS(): IRadioItemModel[] {
        return [
            {
                value: null, // TODO use false instead of null
                label: GameSearchFlterFinancialLocalization.INPUT.FREE_GAME.ITEMS.NO_MATTER,
                default: true
            },
            {
                value: true,
                label: GameSearchFlterFinancialLocalization.INPUT.FREE_GAME.ITEMS.REQUIRED
            }
        ];
    };

    static PAY_AMOUNT_MAX_VALUE: number = 1000;
}
