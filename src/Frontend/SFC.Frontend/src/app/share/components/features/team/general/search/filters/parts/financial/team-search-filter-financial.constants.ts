import { IRadioItemModel } from "ngx-sfc-inputs";
import { TeamSearchFlterFinancialLocalization } from "./team-search-filter-financial.localization";

export class TeamSearchFlterFinancialConstants {
    static get FREE_PLAY_RADIO_ITEMS(): IRadioItemModel[] {
        return [
            {
                value: null, // TODO use false instead of null
                label: TeamSearchFlterFinancialLocalization.INPUT.FREE_PLAY.ITEMS.NO_MATTER,
                default: true
            },
            {
                value: true,
                label: TeamSearchFlterFinancialLocalization.INPUT.FREE_PLAY.ITEMS.REQUIRED
            }
        ];
    };
}
