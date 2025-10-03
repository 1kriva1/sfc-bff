import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup } from "@angular/forms";
import { InviteTeamPlayerEditPart } from "../../../invite-team-player-edit-part.enum";
import { InviteTeamPlayerProfileEditPart } from "../enums/invite-team-player-profile-edit-part.enum";
import { IInviteTeamPlayerProfileEditFormModel } from "../invite-team-player-profile-edit-form.model";

@Directive()
export abstract class InviteTeamPlayerProfileEditPartComponent {

    // component
    InviteTeamPlayerProfileEditPart = InviteTeamPlayerProfileEditPart;

    protected get form(): FormGroup { return this.parent.form.get(InviteTeamPlayerEditPart.Profile) as FormGroup; }

    public get value(): IInviteTeamPlayerProfileEditFormModel { return this.form.value; }

    constructor(protected parent: FormGroupDirective, protected formBuilder: FormBuilder) { }
}