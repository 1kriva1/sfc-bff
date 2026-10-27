import { IEnumModel } from "@share/models";
import { IDataValueModel } from "../../services";
import { WeekDay } from "@angular/common";
import { any, empty, firstItem, firstOrDefault, isDefined, where } from "ngx-sfc-common";

export function getWeekDay(include: number): IEnumModel<number> {
    const values: any = getEnumValues(WeekDay, include).map((key: WeekDay) => mapWeekDay(key));
    return buildEnumResult(values, include) as IEnumModel<number>;
}

export function getWeekDays(include?: number[] | empty): IEnumModel<number>[] {
    return getEnumValues(WeekDay, include).map((key: WeekDay) => mapWeekDay(key));
}

export function getMonths(include?: number[] | number | null, short: boolean = false): IEnumModel<number> | IEnumModel<number>[] {
    const values: IEnumModel<number>[] = [
        { key: 0, value: short ? $localize`:@@core.enum.month.jan:Jan` : $localize`:@@core.enum.month.january:January` },
        { key: 1, value: short ? $localize`:@@core.enum.month.feb:Feb` : $localize`:@@core.enum.month.february:February` },
        { key: 2, value: short ? $localize`:@@core.enum.month.mar:Mar` : $localize`:@@core.enum.month.march:March` },
        { key: 3, value: short ? $localize`:@@core.enum.month.apr:Apr` : $localize`:@@core.enum.month.april:April` },
        { key: 4, value: short ? $localize`:@@core.enum.month.may:May` : $localize`:@@core.enum.month.may.long:May` },
        { key: 5, value: short ? $localize`:@@core.enum.month.jun:Jun` : $localize`:@@core.enum.month.june:June` },
        { key: 6, value: short ? $localize`:@@core.enum.month.jul:Jul` : $localize`:@@core.enum.month.july:July` },
        { key: 7, value: short ? $localize`:@@core.enum.month.aug:Aug` : $localize`:@@core.enum.month.august:August` },
        { key: 8, value: short ? $localize`:@@core.enum.month.sep:Sep` : $localize`:@@core.enum.month.september:September` },
        { key: 9, value: short ? $localize`:@@core.enum.month.oct:Oct` : $localize`:@@core.enum.month.october:October` },
        { key: 10, value: short ? $localize`:@@core.enum.month.nov:Nov` : $localize`:@@core.enum.month.november:November` },
        { key: 11, value: short ? $localize`:@@core.enum.month.dec:Dec` : $localize`:@@core.enum.month.december:December` }
    ], result = where(values, value => filterEnumValue(value.key, include));

    return buildEnumResult(result, include);
}

export function getEnum(value: number | null, values: IEnumModel<number>[]): IEnumModel<number> | empty {
    return isDefined(value)
        ? firstOrDefault(values, item => item.key == value)
        : null;
}

export function buildEnumRecord<T extends string>(
    models: IDataValueModel[],
    expectedNames: readonly T[]
): Readonly<Record<T, number>> {
    const expected = new Set<string>(expectedNames.map(normalizeEnumKey));
    const result: Record<string, number> = {};

    for (const item of models) {
        const key = normalizeEnumKey(item.Name);

        if (!expected.has(key)) {
            console.error(`Backend enum value "${item.Name}" is not known by the frontend and was ignored.`);
            continue;
        }

        result[key] = item.Id;
    }

    const missing = [...expected].filter(name => !(name in result));

    if (missing.length) {
        console.error(
            `Backend enum is missing expected values: ${missing.join(", ")}. ` +
            `Received: ${models.map(m => m.Name).join(", ")}`
        );
    }

    return Object.freeze(result) as Readonly<Record<T, number>>;
}

function getEnumValues(enumValue: any, include?: number[] | number | null): any {
    return Object.values(enumValue).filter((value) => filterEnumValue(value, include));
}

function buildEnumResult(values: any, include?: number[] | number | null)
    : IEnumModel<number> | IEnumModel<number>[] {
    return !isDefined(include) || Array.isArray(include)
        ? values : firstItem(values) as IEnumModel<number>;
}

function filterEnumValue(value: any, include?: number[] | number | null) {
    const includeValue: number[] | null = Array.isArray(include)
        ? include
        : include != null ? [include] : null;

    return !isNaN(Number(value))
        && (!any(includeValue) || (includeValue as number[]).indexOf(Number(value)) > -1)
}

function mapWeekDay(key: WeekDay): IEnumModel<number> {
    switch (key) {
        case WeekDay.Monday:
            return { key: key, value: $localize`:@@core.enum.weekday.monday:Monday` };
        case WeekDay.Tuesday:
            return { key: key, value: $localize`:@@core.enum.weekday.tuesday:Tuesday` };
        case WeekDay.Wednesday:
            return { key: key, value: $localize`:@@core.enum.weekday.wednesday:Wednesday` };
        case WeekDay.Thursday:
            return { key: key, value: $localize`:@@core.enum.weekday.thursday:Thursday` };
        case WeekDay.Friday:
            return { key: key, value: $localize`:@@core.enum.weekday.friday:Friday` };
        case WeekDay.Saturday:
            return { key: key, value: $localize`:@@core.enum.weekday.saturday:Saturday` };
        case WeekDay.Sunday:
            return { key: key, value: $localize`:@@core.enum.weekday.sunday:Sunday` };
    }
}

function normalizeEnumKey(value: string): string {
    return value
        .trim()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, ch) => ch.toUpperCase())
        .replace(/^[a-z]/, ch => ch.toUpperCase());
}