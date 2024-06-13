import { CommonConstants } from "ngx-sfc-common";

export function getShortMonth(monthKey: string): string {
    switch (monthKey.toLowerCase()) {
        case 'jan':
            return $localize`:@@core.enum.month.jan:Jan`;
        case 'feb':
            return $localize`:@@core.enum.month.feb:Feb`;
        case 'mar':
            return $localize`:@@core.enum.month.mar:Mar`;
        case 'apr':
            return $localize`:@@core.enum.month.apr:Apr`;
        case 'may':
            return $localize`:@@core.enum.month.may:May`;
        case 'jun':
            return $localize`:@@core.enum.month.jun:Jun`;
        case 'jul':
            return $localize`:@@core.enum.month.jul:Jul`;
        case 'aug':
            return $localize`:@@core.enum.month.aug:Aug`;
        case 'sep':
            return $localize`:@@core.enum.month.sep:Sep`;
        case 'oct':
            return $localize`:@@core.enum.month.oct:Oct`;
        case 'nov':
            return $localize`:@@core.enum.month.nov:Nov`;
        case 'dec':
            return $localize`:@@core.enum.month.dec:Dec`;
        default:
            return CommonConstants.EMPTY_STRING;
    }
}

export function getLongMonth(monthKey: string): string {
    switch (monthKey.toLowerCase()) {
        case 'january':
            return $localize`:@@core.enum.month.january:January`;
        case 'february':
            return $localize`:@@core.enum.month.february:February`;
        case 'march':
            return $localize`:@@core.enum.month.march:March`;
        case 'april':
            return $localize`:@@core.enum.month.april:April`;
        case 'may':
            return $localize`:@@core.enum.month.may.long:May`;
        case 'june':
            return $localize`:@@core.enum.month.june:June`;
        case 'july':
            return $localize`:@@core.enum.month.july:July`;
        case 'august':
            return $localize`:@@core.enum.month.august:August`;
        case 'september':
            return $localize`:@@core.enum.month.september:September`;
        case 'october':
            return $localize`:@@core.enum.month.october:October`;
        case 'november':
            return $localize`:@@core.enum.month.november:November`;
        case 'december':
            return $localize`:@@core.enum.month.december:December`;
        default:
            return CommonConstants.EMPTY_STRING;
    }
}