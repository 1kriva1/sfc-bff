import { CoreLocalization } from "@core/localization";
import { IDateTimeModalButtonsModel } from 'ngx-sfc-inputs';

export class ComponentsConstants {
    static get DATE_INPUT_MODAL_BUTTONS_MODEL(): IDateTimeModalButtonsModel {
        return {
            okLabel: CoreLocalization.OK,
            cancelLabel: CoreLocalization.CANCEL
        }
    };
}