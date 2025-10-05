import { CoreLocalization } from "@core/localization";
import { IDateTimeModalButtonsModel, IRadioItemModel } from "ngx-sfc-inputs";
import { TeamSearchFlterGeneralLocalization } from "./team-search-filter-general.localization";

export class TeamSearchFlterGeneralConstants {
    static get DATE_INPUT_MODAL_BUTTONS_MODEL(): IDateTimeModalButtonsModel {
        return {
            okLabel: CoreLocalization.OK,
            cancelLabel: CoreLocalization.CANCEL,
            clearLabel: CoreLocalization.CLEAR
        };
    };

    static get HAS_LOGO_RADIO_ITEMS(): IRadioItemModel[] {
        return [
            {
                value: null, // TODO use false instead of null
                label: TeamSearchFlterGeneralLocalization.INPUT.HAS_LOGO.ITEMS.NO_MATTER,
                default: true
            },
            {
                value: true,
                label: TeamSearchFlterGeneralLocalization.INPUT.HAS_LOGO.ITEMS.REQUIRED
            }
        ];
    };
}
