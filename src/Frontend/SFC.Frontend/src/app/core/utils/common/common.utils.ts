import { ElementRef } from "@angular/core";
import { CoreConstants } from "@core/constants";
import { Locale } from "@core/enums";
import { CommonConstants, convertFromBase64String, convertToBase64String, empty, isNullOrEmptyString } from "ngx-sfc-common";
import { fromEvent, Observable } from "rxjs";
import { IValueModel } from "../../types";

export function isValueModel(item: any): item is IValueModel<any> {
    return 'key' in item && 'value' in item;
}

export function buildPlaceholder(value: string): string {
    return `[${value}]`
}

export function buildPropertyPath(...keys: string[]): string {
    return keys.join('.');
}

export function getPropertyPartByIndex(path: string, index: number = 0): string | empty {
    const parts: string[] = path.split('.');

    if (parts.length - 1 >= index) {
        return parts[index];
    }

    return null;
}

export function removePropertyPart(path: string, part: string): string {
    return path.slice(`${part}.`.length);
}

export function buildPreviewValue(value: string, placeholder: string): string {
    return isNullOrEmptyString(value) ? buildPlaceholder(placeholder) : value;
}

export function getClickObservableFromElementReference(element: ElementRef): Observable<InputEvent> {
    return fromEvent<InputEvent>(element.nativeElement, 'click');
}

export function getClickObservableFromNativeElement(nativeElement: any): Observable<InputEvent> {
    return fromEvent<InputEvent>(nativeElement, 'click');
}

export function calculatePercentage(value: any[]): number {
    return Math.round((value.length / (value.length || 1) * CommonConstants.FULL_PERCENTAGE));
}

export function calculatePercentageWithCount(value: any[], count: number): number {
    return Math.round((count / (value.length || 1) * CommonConstants.FULL_PERCENTAGE));
}

export async function convertFileToBase64StringAsync(value: File | null): Promise<string | empty> {
    return value ? await convertToBase64String(value) : null;
}

export async function convertFileFromBase64StringAsync(value: string | empty, name: string = 'logo'): Promise<File | null> {
    return value ? await convertFromBase64String(value, name) : null;
}

export function toEnglishLocaleTimeString(value: Date | empty): string {
    return value?.toLocaleTimeString(Locale.English, CoreConstants.DATE_TIME_FORMAT_OPTIONS)!;
}

export function toEnglishLocaleTimeWithTwoDigitsString(value: Date): string {
    return value.toLocaleTimeString(Locale.English, CoreConstants.DATE_TIME_TWO_DIGIT_FORMAT_OPTIONS);
}