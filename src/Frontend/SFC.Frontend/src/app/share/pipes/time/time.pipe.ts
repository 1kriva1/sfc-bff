import { Pipe, PipeTransform } from "@angular/core";
import { Locale } from "@core/enums";
import { StorageService } from "@core/services";
import { CommonConstants, empty, isDefined } from "ngx-sfc-common";
import { CommonConstants as ApplicationCommonConstants } from "@core/constants";

@Pipe({ name: 'sfcTime' })
export class TimePipe implements PipeTransform {

    constructor(private storageService: StorageService) { }

    transform(value: Date, locale: Locale | empty,
        options: Intl.DateTimeFormatOptions = { hour12: false }): string {
        if (!isDefined(value))
            return CommonConstants.EMPTY_STRING;

        if (!locale)
            locale = this.storageService.get<Locale>(ApplicationCommonConstants.LOCALE_KEY, Locale.English)!;

        return value.toLocaleTimeString(locale, options);
    }
}