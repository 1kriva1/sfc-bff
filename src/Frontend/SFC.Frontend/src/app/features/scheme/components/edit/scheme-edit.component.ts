import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { BaseErrorResponse } from "@core/models";
import { Observable, startWith } from "rxjs";
import { ISchemeEditFormModel } from "./scheme-edit-form.model";
import { SchemeEditPart } from "./scheme-edit-part.enum";

@Directive()
export abstract class SchemeEditComponent<TFormValue extends ISchemeEditFormModel, TResponse extends BaseErrorResponse> {

    // component
    SchemeEditPart = SchemeEditPart;

    public get form(): FormGroup { return this.parent.form; }

    protected get value(): TFormValue { return this.form.value; }

    public get value$(): Observable<TFormValue> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    protected get controls(): { [key: string]: AbstractControl<any> } { return this.form.controls; }

    constructor(protected parent: FormGroupDirective, protected formBuilder: FormBuilder) { }
}