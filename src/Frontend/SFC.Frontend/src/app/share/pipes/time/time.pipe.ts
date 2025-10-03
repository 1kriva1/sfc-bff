import { Pipe, PipeTransform } from "@angular/core";
import { CommonConstants, empty, isDefined } from "ngx-sfc-common";
import { CoreConstants } from "@core/constants";
import { Locale } from "@core/enums";
import { StorageService } from "@core/services";

@Pipe({ name: 'sfcTime' })
export class TimePipe implements PipeTransform {

    constructor(private storageService: StorageService) { }

    transform(value: Date, locale: Locale | empty,
        options: Intl.DateTimeFormatOptions = { hour12: false }): string {
        if (!isDefined(value))
            return CommonConstants.EMPTY_STRING;

        if (!locale)
            locale = this.storageService.get<Locale>(CoreConstants.LOCALE_KEY, Locale.English)!;

        return value.toLocaleTimeString(locale, options);
    }
}