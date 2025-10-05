import { any, empty } from "ngx-sfc-common";
import { ISideMenuItemModel, ISideMenuModel, ITagModel } from "ngx-sfc-components";
import { IEnumModel } from "@core/types";
import { getWeekDays } from "@core/utils";

export function getDays(days: number[] | null): ITagModel[] {
    return any(days) ? (getWeekDays(days) as IEnumModel<number>[]).map(d => ({ label: d.value })) : [];
}

export function setMenuActiveItem(menu: ISideMenuModel, id: string): void {
    if (!menu.items)
        return;

    menu.items.forEach((item: ISideMenuItemModel) => {
        if (any(item.items)) {
            item.items!.forEach((innerItem: ISideMenuItemModel) => innerItem.active = innerItem.id === id)
        } else {
            item.active = item.id === id;
        }
    });
}

export function getTags(tags: string[] | empty): ITagModel[] {
    return any(tags) ? tags!.map(tag => ({ label: tag })) : [];
}

export function getTagsFromEnums(enums: IEnumModel<number>[] | empty): ITagModel[] {
    return any(enums) ? enums!.map(item => ({ label: item.value, icon: item.icon, imageSrc: item.image })) : [];
}