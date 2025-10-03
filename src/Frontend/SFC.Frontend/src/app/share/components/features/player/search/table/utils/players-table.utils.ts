import { Locale } from "@core/enums";
import { CommonConstants, convertDateToTimestamp, isDefined } from "ngx-sfc-common";
import { BasePlayerItemLocalization } from "../../../../player/search/table/base/base-player-item.localization";

export function getAvailableTime(from: Date | null, to: Date | null, locale: Locale): string {
    if (from && to)
        return `${BasePlayerItemLocalization.FROM} ${convertDateToTimestamp(from, locale)} 
        ${BasePlayerItemLocalization.TO} ${convertDateToTimestamp(to, locale)}`
    else if (from)
        return `${BasePlayerItemLocalization.FROM} ${convertDateToTimestamp(from, locale)}`
    else if (to)
        return `${BasePlayerItemLocalization.TO} ${convertDateToTimestamp(to, locale)}`
    else
        return CommonConstants.EMPTY_STRING;
}

export function getHasAvailableTime(from: Date | null, to: Date | null): boolean {
    return isDefined(from) || isDefined(to);
}