import { faPowerOff, faFutbol, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { IBubbleModel } from "ngx-sfc-inputs";
import { BadgeStatus } from "./enums/badge-status.enum";
import { BadgesViewLocalization } from "./badges-view.localization";

export class BadgesViewConstants {    
    static SEARCH_NAME_DEBOUNCE_TIME: number = 1000;
    static STATUSES: IBubbleModel[] = [
        { key: BadgeStatus.NotStarted, label: BadgesViewLocalization.FILTER.STATUSES.OPTION.NOT_STARTED, icon: faPowerOff },
        { key: BadgeStatus.Active, label: BadgesViewLocalization.FILTER.STATUSES.OPTION.ACTIVE, icon: faFutbol },
        { key: BadgeStatus.Completed, label: BadgesViewLocalization.FILTER.STATUSES.OPTION.COMPLETED, icon: faCircleCheck }
    ]
}