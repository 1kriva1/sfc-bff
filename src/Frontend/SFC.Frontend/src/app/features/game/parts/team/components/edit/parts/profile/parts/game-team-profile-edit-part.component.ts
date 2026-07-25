import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { nameof } from 'ngx-sfc-common';
import { getFormGroup } from "@core/utils";
import { Observable, startWith } from "rxjs";
import { GameTeamProfileEditPart } from "../enums/game-team-profile-edit-part.enum";
import { IGameTeamEditFormModel } from "../../../game-team-edit-form.model";
import { BaseErrorResponse } from "@core/models";
import { GameTeamEditComponent } from "../../../game-team-edit.component";
import { ActivatedRoute } from "@angular/router";

@Directive()
export abstract class GameTeamProfileEditPartComponent
    extends GameTeamEditComponent<IGameTeamEditFormModel, BaseErrorResponse> {

    // component
    GameTeamProfileEditPart = GameTeamProfileEditPart;

    protected get profileForm(): FormGroup { return getFormGroup(nameof<IGameTeamEditFormModel>('profile'), this.parent.form.controls)!; }

    protected get profileValue(): IGameTeamEditFormModel { return this.profileForm.value; }

    protected get profileValue$(): Observable<IGameTeamEditFormModel> { return this.profileForm.valueChanges.pipe(startWith(this.profileForm.value)); }

    protected get profileControls(): { [key: string]: AbstractControl<any> } { return this.profileForm.controls; }

    constructor(route: ActivatedRoute, parent: FormGroupDirective, formBuilder: FormBuilder) {
        super(route, parent, formBuilder);
    }
}