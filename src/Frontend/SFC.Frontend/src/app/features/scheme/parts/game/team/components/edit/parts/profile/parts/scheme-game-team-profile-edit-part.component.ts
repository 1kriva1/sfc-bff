import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { nameof } from 'ngx-sfc-common';
import { getFormGroup } from "@core/utils";
import { Observable, startWith } from "rxjs";
import { SchemeGameTeamProfileEditPart } from "../enums/scheme-game-team-profile-edit-part.enum";
import { ISchemeGameTeamProfileEditFormModel } from "../scheme-game-team-profile-edit-form.model";
import { ISchemeGameTeamEditFormModel } from "../../../scheme-game-team-edit-form.model";
import { ActivatedRoute } from "@angular/router";
import { BaseErrorResponse } from "@core/models";
import { SchemeGameTeamEditComponent } from "../../../scheme-game-team-edit.component";

@Directive()
export abstract class SchemeGameTeamProfileEditPartComponent
    extends SchemeGameTeamEditComponent<ISchemeGameTeamEditFormModel, BaseErrorResponse> {

    // component
    SchemeGameTeamProfileEditPart = SchemeGameTeamProfileEditPart;

    protected get profileForm(): FormGroup { return getFormGroup(nameof<ISchemeGameTeamEditFormModel>('profile'), this.parent.form.controls)!; }

    protected get profileValue(): ISchemeGameTeamProfileEditFormModel { return this.profileForm.value; }

    protected get profileValue$(): Observable<ISchemeGameTeamProfileEditFormModel> { return this.profileForm.valueChanges.pipe(startWith(this.profileForm.value)); }

    protected get profileControls(): { [key: string]: AbstractControl<any> } { return this.profileForm.controls; }

    constructor(route: ActivatedRoute, parent: FormGroupDirective, formBuilder: FormBuilder) {
        super(route, parent, formBuilder);
    }
}