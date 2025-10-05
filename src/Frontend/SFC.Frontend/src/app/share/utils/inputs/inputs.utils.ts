import { IBubbleModel, IRangeLimitValueModel, ISelectItemModel } from "ngx-sfc-inputs";
import { IEnumModel } from "@core/types";
import { ILimitSearchModel } from "@core/models";
import { empty } from "ngx-sfc-common";
import { getWeekDays } from "@core/utils";

export function mapBubbles(values: IEnumModel<number>[]): IBubbleModel[] {
    return values.map(item => ({ key: item.key, label: item.value, icon: item.icon, imageSrc: item.image })) as IBubbleModel[];
}

export function mapSelectItem(model: IEnumModel<number>): ISelectItemModel {
    return {key: model.key, value: model.value, image: model.image};
}

export function mapSelectItems(values: IEnumModel<number>[]): ISelectItemModel[] {
    return values.map(item => ({ key: item.key, value: item.value, image: item.image })) as ISelectItemModel[];
}

export function mapLimitSearchModel(value: IRangeLimitValueModel | empty): ILimitSearchModel<number> | null {
    return value ? { From: value.from, To: value.to } : null;
}

export function mapWeekDayBubbles(): IBubbleModel[] {
    const weekDays: IEnumModel<number>[] = getWeekDays();
    return mapBubbles(weekDays);
}