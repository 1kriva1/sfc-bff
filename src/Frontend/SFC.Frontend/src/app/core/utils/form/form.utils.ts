import { AbstractControl, FormGroup } from "@angular/forms";
import { empty, isDefined } from "ngx-sfc-common";

export function markFormTouchedAndDirty(form: FormGroup): void {
    const showValidationMessages = (control: AbstractControl) => {
        if (control instanceof FormGroup) {
            Object.values(control.controls).forEach(prop =>
                showValidationMessages(prop));
        } else {
            if (control.invalid)
                control.markAsDirty();
        }
    };

    Object.values(form.controls).forEach(control => showValidationMessages(control));
}

export function markControlTouchedAndDirty(form: FormGroup, name: string): AbstractControl | null {
    const control: AbstractControl | null = form.controls[name];

    if (control) {
        control.markAsDirty();
        control.updateValueAndValidity();
    }

    return control;
}

export function getControl(name: string, controls: any): AbstractControl | empty {
    for (let control in controls) {
        if (controls.hasOwnProperty(control)) {
            if (control === name) {
                return controls[control];
            } else if (controls[control] instanceof FormGroup) {
                const groupControl: AbstractControl | empty = getControl(name, controls[control].controls);
                if (isDefined(groupControl)) {
                    return groupControl;
                }
            }
        }
    }

    return null;
}

export function getFormGroup(name: string, controls: any): FormGroup | empty {
    for (let control in controls) {
        if (controls.hasOwnProperty(control)) {
            if (control === name) {
                return controls[control] as FormGroup;
            } else if (controls[control] instanceof FormGroup) {
                const groupControl: FormGroup | empty = getFormGroup(name, controls[control].controls);
                if (isDefined(groupControl)) {
                    return groupControl;
                }
            }
        }
    }

    return null;
}