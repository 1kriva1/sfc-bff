import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { BaseErrorResponse } from "@core/models";
import { InviteTeamPlayerEditPart } from "./invite-team-player-edit-part.enum";
import { IInviteTeamPlayerEditFormModel } from "./invite-team-player-edit-form.model";

@Directive()
export abstract class InviteTeamPlayerEditComponent<TFormValue extends IInviteTeamPlayerEditFormModel, TResponse extends BaseErrorResponse> {

    InviteTeamPlayerEditPart = InviteTeamPlayerEditPart;

    protected get form(): FormGroup { return this.parent.form; }

    protected get value(): TFormValue { return this.form.value; }

    protected get controls(): { [key: string]: AbstractControl<any> } { return this.form.controls; }

    constructor(protected parent: FormGroupDirective, protected formBuilder: FormBuilder) { }
}