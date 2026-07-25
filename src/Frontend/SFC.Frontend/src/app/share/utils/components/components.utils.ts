import { all, any, empty, firstOrDefault, hasItem, hasItemBy, ITagModel, where } from "ngx-sfc-common";
import { ISideMenuItemModel, ISideMenuModel, ITabModel } from "ngx-sfc-components";
import { IEnumModel } from "@core/types";
import { buildPropertyPath, getLongMonth, getLongMonthById, getShortMonth, getWeekDays } from "@core/utils";
import { IStatisticModel } from "@share/models";

/* Side menu */

export function setMenuActiveItem(menu: ISideMenuModel, id: string): void {
    if (!menu.items)
        return;

    menu.items.forEach((item: ISideMenuItemModel) => {
        if (any(item.items)) {
            item.items!.forEach((innerItem: ISideMenuItemModel) => innerItem.active = buildPropertyPath(item.id!, innerItem.id!) === id)
        } else {
            item.active = item.id === id;
        }
    });
}

export function setMenuInvalidItem(menu: ISideMenuModel, getInvalid: (id: string) => boolean | empty): void {
    if (!menu.items)
        return;

    menu.items!.forEach((item: ISideMenuItemModel) => {
        if (item.items?.length || false) {
            item.items.forEach((innerItem: ISideMenuItemModel) => innerItem.invalid = getInvalid(buildPropertyPath(item.id!, innerItem.id!)));
        } else {
            item.invalid = getInvalid(item.id!);
        }
    });
}

/* End Side menu */

/* Tabs */

export function setTabsSelectedItem(tabs: ITabModel[], id: string): void {
    tabs.forEach((tab: ITabModel) => tab.selected = tab.data === id);
}

export function setTabsSelectedItemByIds(tabs: ITabModel[], ids: string[]): void {
    for (const id of ids) {
        tabs.forEach((tab: ITabModel) => tab.selected = tab.data === id);
        if (hasItemBy(tabs, (tab: ITabModel) => tab.selected!)) break;
    }
}

/* End Tabs */

/* Tags */

export function getTags(tags: string[] | empty): ITagModel[] {
    return any(tags) ? tags!.map(tag => ({ label: tag })) : [];
}

export function getTagsFromEnums(enums: IEnumModel<number>[] | empty): ITagModel[] {
    return any(enums) ? enums!.map(item => ({ label: item.value, icon: item.icon!, imageSrc: item.image! })) : [];
}

export function getTagsFromValues(values: number[], enums: IEnumModel<number>[]): ITagModel[] {
    const filteredEnums: IEnumModel<number>[] = where(enums, item => hasItem(values, item.key)) || [];
    return getTagsFromEnums(filteredEnums);
}

export function getDaysTags(days: number[] | null): ITagModel[] {
    if (any(days)) {
        const weekDays: IEnumModel<number>[] = getWeekDays(days);
        return getTagsFromEnums(weekDays);
    }

    return [];
}

/* End Tags */

/* Chart */

export function getMonthTick(value: string): string {
    const parts = value.split(' ');
    return `${getShortMonth(parts[0])} ${parts[1]}`;
}

export function getMonthTooltipTitle(value: any[]): string {
    const parts = value[0].label.split(' ');
    return `${getLongMonth(parts[0])} ${parts[1]}`;
}

export function getMonthYearLabels(models: IStatisticModel<any>[]): string[] {
    const labels: string[] = models.map((item: IStatisticModel<any>) => {
        const monthId: number = item.date.getMonth(),
            monthName: string = getLongMonthById(monthId);

        return `${monthName} ${item.date.getUTCFullYear()}`;
    });

    return labels;
}

/* End Chart */