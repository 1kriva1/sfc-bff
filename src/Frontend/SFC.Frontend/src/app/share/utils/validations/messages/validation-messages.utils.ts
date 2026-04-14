import { AbstractControl } from "@angular/forms";
import { CommonConstants, empty, parseFileSize } from "ngx-sfc-common";
import { FileValidator, IFileSizeValidationModel } from "ngx-sfc-inputs";
import { getControl } from "@core/utils";
import { ValidationLocalization } from "../../../localization";
import { CoreLocalization } from "@core/localization";

export function fileMaxSizeValidationMessage(name: string, controls: any): string {
    const control: AbstractControl | empty = getControl(name, controls);
    return controlFileMaxSizeValidationMessage(control!);
}

export function controlFileMaxSizeValidationMessage(control: AbstractControl): string {
    if (!control)
        return CommonConstants.EMPTY_STRING;

    if (!control.errors)
        return CommonConstants.EMPTY_STRING;

    const validationResult: IFileSizeValidationModel | null =
        control.errors[FileValidator.MaxSize];

    if (!validationResult)
        return CommonConstants.EMPTY_STRING;

    return `${ValidationLocalization.FILE_MAX_SIZE_PART_1} ${parseFileSize(validationResult.requiredSize)}, ${ValidationLocalization.FILE_MAX_SIZE_PART_2} ${parseFileSize(validationResult.actualSize)}.`
}

export function tagMaxLengthValidationMessage(maxLength: number): string {
    return `${ValidationLocalization.TAG_LENGTH} ${maxLength} ${CoreLocalization.CHARACTERS}.`
}

export function minValidationMessage(min: number): string {
    return `${ValidationLocalization.MIN_PART_1} ${min}.`
}

export function maxValidationMessage(max: number): string {
    return `${ValidationLocalization.MAX_PART_1} ${max}.`
}