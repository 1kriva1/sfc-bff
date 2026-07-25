import { IRadioItemModel } from "ngx-sfc-inputs";
import { GameTeamSearchFlterFinancialLocalization } from "./game-team-search-filter-financial.localization";

export class GameTeamSearchFlterFinancialConstants {
    static get FREE_PLAY_RADIO_ITEMS(): IRadioItemModel[] {
        return [
            {
                value: null, // TODO use false instead of null
                label: GameTeamSearchFlterFinancialLocalization.INPUT.FREE_PLAY.ITEMS.NO_MATTER,
                default: true
            },
            {
                value: true,
                label: GameTeamSearchFlterFinancialLocalization.INPUT.FREE_PLAY.ITEMS.REQUIRED
            }
        ];
    };
}
