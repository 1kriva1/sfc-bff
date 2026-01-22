import { IBubbleModel, ISelectItemModel } from "ngx-sfc-inputs";
import { IEnumModel } from "@core/types";
import { getWeekDays } from "@core/utils";
import { IFormationEnumModel } from "@share/services";
import { empty } from "ngx-sfc-common";
import { CoreLocalization } from "@core/localization";

/* Bubble */

export function mapBubbles(values: IEnumModel<number>[]): IBubbleModel[] {
    return values.map(item => ({ key: item.key, label: item.value, icon: item.icon, imageSrc: item.image })) as IBubbleModel[];
}

export function mapWeekDayBubbles(): IBubbleModel[] {
    const weekDays: IEnumModel<number>[] = getWeekDays();
    return mapBubbles(weekDays);
}

/* End Bubble */

/* Select */

export function mapSelectItem(model: IEnumModel<number>): ISelectItemModel {
    return { key: model.key, value: model.value, image: model.image };
}

export function mapSelectItems(values: IEnumModel<number>[]): ISelectItemModel[] {
    return values.map(item => ({ key: item.key, value: item.value, image: item.image })) as ISelectItemModel[];
}

export function mapFormationSelectItems(values: IFormationEnumModel[]): ISelectItemModel[] {
    return values.map(item => ({ key: item.key, value: `${item.label} (${item.description})`, image: item.image })) as ISelectItemModel[];
}

/* End Select */

/* Range */

export function generateMultipleLabel(from: number, to: number, label: string | empty = null): string {
    const result: string = `${CoreLocalization.FROM} ${from} - ${CoreLocalization.TO} ${to}`;

    if (label) {
        return `${result} ${label}`;
    }

    return result;
}

/* End Range */