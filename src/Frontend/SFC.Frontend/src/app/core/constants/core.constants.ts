import { Provider, SkipSelf } from "@angular/core";
import { ControlContainer } from "@angular/forms";
import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { SortingDirection } from "ngx-sfc-common";
import { ISortingIcon } from "ngx-sfc-components";

export class CoreConstants {
    static LOCALE_KEY: string = 'locale';
    static THEME_KEY: string = 'theme';
    static APPLICATION_PREFIX: string = 'sfc';
    static DEFAULT_AVATAR_PATH: string = 'app/core/assets/images/default/avatar.png';
    static DEFAULT_FIELD_IMAGE_PATH: string = 'app/core/assets/images/default/field.png';
    static DEFAULT_TEAM_A_IMAGE_PATH: string = 'app/core/assets/images/default/team_a.png';
    static DEFAULT_TEAM_B_IMAGE_PATH: string = 'app/core/assets/images/default/team_b.png';
    static CHANGES_CHECK_MODAL_ID = 'changes-check';
    static CONTROL_CONTAINER_PROVIDER: Provider = {
        provide: ControlContainer,
        useFactory: (container: ControlContainer) => container,
        deps: [[new SkipSelf(), ControlContainer]],
    };
    static DATE_TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = { hour12: false, hour: '2-digit', minute: '2-digit' };
    static DATE_TIME_TWO_DIGIT_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = { hour12: false };
    static DEFAULT_SORTING_ICONS: ISortingIcon[] = [
        { direction: SortingDirection.Ascending, icon: faSortAmountUp },
        { direction: SortingDirection.Descending, icon: faSortAmountDown }
    ];
}