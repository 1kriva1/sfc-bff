import { Pipe, PipeTransform } from "@angular/core";
import { any, CommonConstants, empty, firstOrDefault, isDefined } from "ngx-sfc-common";
import { IEnumModel } from "@share/models";
import { getWeekDays } from "@share/utils";

@Pipe({ name: 'sfcDay' })
export class DayPipe implements PipeTransform {

    transform(value: number, days: IEnumModel<number>[] | empty): string {
        if (!isDefined(value))
            return CommonConstants.EMPTY_STRING;

        if (!any(days))
            days = getWeekDays() as IEnumModel<number>[];

        return firstOrDefault(days, day => day.key === value)?.value || CommonConstants.EMPTY_STRING;
    }
}