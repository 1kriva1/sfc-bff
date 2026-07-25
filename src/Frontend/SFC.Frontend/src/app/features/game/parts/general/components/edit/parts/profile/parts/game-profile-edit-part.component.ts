import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { GameProfileEditPart } from "../enums/game-profile-edit-part.enum";
import { nameof } from 'ngx-sfc-common';
import { getFormGroup } from "@core/utils";
import { Observable, startWith } from "rxjs";
import { IGameEditFormModel } from "../../../game-edit-form.model";
import { GameEditComponent } from "../../../game-edit.component";
import { BaseErrorResponse } from "@core/models";
import { ActivatedRoute } from "@angular/router";

@Directive()
export abstract class GameProfileEditPartComponent
    extends GameEditComponent<IGameEditFormModel, BaseErrorResponse> {

    // component
    GameProfileEditPart = GameProfileEditPart;

    protected get profileForm(): FormGroup { return getFormGroup(nameof<IGameEditFormModel>('profile'), this.parent.form.controls)!; }

    protected get profileValue(): IGameEditFormModel { return this.profileForm.value; }

    protected get profileValue$(): Observable<IGameEditFormModel> { return this.profileForm.valueChanges.pipe(startWith(this.profileForm.value)); }

    protected get profileControls(): { [key: string]: AbstractControl<any> } { return this.profileForm.controls; }

    constructor(route: ActivatedRoute, parent: FormGroupDirective, formBuilder: FormBuilder) {
        super(route, parent, formBuilder);
    }
}