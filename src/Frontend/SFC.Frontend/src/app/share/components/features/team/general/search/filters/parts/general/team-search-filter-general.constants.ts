import { CoreLocalization } from "@core/localization";
import { IDateTimeModalButtonsModel, IRadioItemModel } from "ngx-sfc-inputs";
import { TeamSearchFilterGeneralLocalization } from "./team-search-filter-general.localization";

export class TeamSearchFilterGeneralConstants {
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
                label: TeamSearchFilterGeneralLocalization.INPUT.HAS_LOGO.ITEMS.NO_MATTER,
                default: true
            },
            {
                value: true,
                label: TeamSearchFilterGeneralLocalization.INPUT.HAS_LOGO.ITEMS.REQUIRED
            }
        ];
    };
}
