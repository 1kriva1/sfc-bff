import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup } from "@angular/forms";
import { TeamEditPart } from "../../../team-edit-part.enum";
import { TeamProfileEditPart } from "../enums/team-profile-edit-part.enum";
import { ITeamProfileEditFormModel } from "../team-profile-edit-form.model";

@Directive()
export abstract class TeamProfileEditPartComponent {

    // component
    TeamProfileEditPart = TeamProfileEditPart;

    protected get form(): FormGroup { return this.parent.form.get(TeamEditPart.Profile) as FormGroup; }

    public get value(): ITeamProfileEditFormModel { return this.form.value; }

    constructor(protected parent: FormGroupDirective, protected formBuilder: FormBuilder) { }
}