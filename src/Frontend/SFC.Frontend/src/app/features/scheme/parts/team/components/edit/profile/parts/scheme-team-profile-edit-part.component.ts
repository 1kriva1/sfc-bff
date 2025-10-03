import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup } from "@angular/forms";
import { getFormGroup } from "@core/utils";
import { SchemeTeamEditPart } from "../../scheme-team-edit-part.enum";
import { SchemeTeamProfileEditPart } from "../enums/scheme-team-profile-edit-part.enum";
import { ISchemeTeamProfileEditFormModel } from "../scheme-team-profile-edit-form.model";

@Directive()
export abstract class SchemeTeamProfileEditPartComponent {

    // component
    SchemeTeamProfileEditPart = SchemeTeamProfileEditPart;

    protected get form(): FormGroup { return getFormGroup(SchemeTeamEditPart.Profile, this.parent.form.controls)!; }

    public get value(): ISchemeTeamProfileEditFormModel { return this.form.value.profile; }

    constructor(protected parent: FormGroupDirective, protected formBuilder: FormBuilder) { }
}