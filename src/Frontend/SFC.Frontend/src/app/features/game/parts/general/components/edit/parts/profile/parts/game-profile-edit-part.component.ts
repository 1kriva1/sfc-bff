import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { GameProfileEditPart } from "../enums/game-profile-edit-part.enum";
import { IGameProfileEditFormModel } from "../game-profile-edit-form.model";
import { nameof } from 'ngx-sfc-common';
import { IGameEditFormModel } from "../../../game-edit-form.model";
import { getFormGroup } from "@core/utils";
import { Observable, startWith } from "rxjs";

@Directive()
export abstract class GameProfileEditPartComponent {

    // component
    GameProfileEditPart = GameProfileEditPart;

    protected get form(): FormGroup { return getFormGroup(nameof<IGameEditFormModel>('profile'), this.parent.form.controls)!; }

    protected get value(): IGameProfileEditFormModel { return this.form.value; }

    protected get value$(): Observable<IGameProfileEditFormModel> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    protected get controls(): { [key: string]: AbstractControl<any> } { return this.form.controls; }

    constructor(protected parent: FormGroupDirective, protected formBuilder: FormBuilder) { }
}