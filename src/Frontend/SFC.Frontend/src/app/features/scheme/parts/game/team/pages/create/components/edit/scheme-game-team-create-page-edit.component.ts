import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { BaseErrorResponse } from "@core/models";
import { Observable, startWith } from "rxjs";
import { SchemeGameTeamCreatePageEditPart } from "./scheme-game-team-create-page-edit-part.enum";
import { ISchemeGameTeamCreatePageFormModel } from "../../models/scheme-game-team-create-page-form.model";

@Directive()
export abstract class SchemeGameTeamCreatePageEditComponent<TFormValue extends ISchemeGameTeamCreatePageFormModel, TResponse extends BaseErrorResponse> {

    // component
    SchemeGameTeamCreatePageEditPart = SchemeGameTeamCreatePageEditPart;

    public get form(): FormGroup { return this.parent.form; }

    protected get value(): TFormValue { return this.form.value; }

    public get value$(): Observable<TFormValue> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    protected get controls(): { [key: string]: AbstractControl<any> } { return this.form.controls; }

    constructor(protected parent: FormGroupDirective, protected formBuilder: FormBuilder) { }
}