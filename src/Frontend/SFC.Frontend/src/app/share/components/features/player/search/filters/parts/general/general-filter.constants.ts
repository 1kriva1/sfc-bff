import { IDateTimeModalButtonsModel, IRadioItemModel } from "ngx-sfc-inputs";
import { GeneralFilterLocalization } from "./general-filter.localization";

export class GeneralFilterConstants {
    static MAX_TAG_VALUE_LENGTH: number = 20;

    static get DATE_INPUT_MODAL_BUTTONS_MODEL(): IDateTimeModalButtonsModel {
        return {
            okLabel: GeneralFilterLocalization.BUTTON_OK_LABEL,
            cancelLabel: GeneralFilterLocalization.BUTTON_CANCEL_LABEL,
            clearLabel: GeneralFilterLocalization.BUTTON_CLEAR_LABEL,
        };
    };

    static get HAS_PHOTO_RADIO_ITEMS(): IRadioItemModel[] {
        return [
            {
                value: null, // TODO use false instead of null
                label: GeneralFilterLocalization.INPUT.HAS_PHOTO.ITEMS.NO_MATTER,
                default: true
            },
            {
                value: true,
                label: GeneralFilterLocalization.INPUT.HAS_PHOTO.ITEMS.REQUIRED
            }
        ];
    };

    static get FREE_PLAY_RADIO_ITEMS(): IRadioItemModel[] {
        return [
            {
                value: null,// TODO use false instead of null
                label: GeneralFilterLocalization.INPUT.FREE_PLAY.ITEMS.NO_MATTER,
                default: true
            },
            {
                value: true,
                label: GeneralFilterLocalization.INPUT.FREE_PLAY.ITEMS.ONLY
            }
        ];
    };

    static FROM_YEARS_DEFAULT: number = 0;

    static TO_YEARS_DEFAULT: number = 100;

    static MAX_CITY_LENGTH: number = 100;

    static MAX_TAGS_LENGTH: number = 50;

    static MAX_TAG_VALUE_VALIDATION: string =
        `${GeneralFilterLocalization.INPUT.TAGS.VALIDATIONS.TAG_LENGTH} ${this.MAX_TAG_VALUE_LENGTH} ${GeneralFilterLocalization.CHARACTERS}.`;
}
