import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { BaseErrorResponse } from "@core/models";
import { TeamEditPart } from "./team-edit-part.enum";
import { ITeamEditFormModel } from "./team-edit-form.model";

@Directive()
export abstract class TeamEditComponent<TFormValue extends ITeamEditFormModel, TResponse extends BaseErrorResponse> {

    TeamEditPart = TeamEditPart;

    protected get form(): FormGroup { return this.parent.form; }

    protected get value(): TFormValue { return this.form.value; }

    protected get controls(): { [key: string]: AbstractControl<any> } { return this.form.controls; }

    constructor(protected parent: FormGroupDirective, protected formBuilder: FormBuilder) { }
}