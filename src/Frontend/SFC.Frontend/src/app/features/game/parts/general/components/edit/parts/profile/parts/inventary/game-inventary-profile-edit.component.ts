import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable, EMPTY, startWith } from 'rxjs';
import { CheckmarkType, empty, nameof } from 'ngx-sfc-common';
import { CoreConstants } from '@core/constants';
import { ValidationConstants } from '@share/constants';
import { GameInventaryProfileEditLocalization } from './game-inventary-profile-edit.localization';
import { GameProfileEditPartComponent } from '../game-profile-edit-part.component';
import { getControl, getFormGroup } from '@core/utils';
import { IGameInventaryProfileEditFormModel } from './game-inventary-profile-edit-form.model';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { IGameProfileEditFormModel } from '../../game-profile-edit-form.model';
import { GameInventaryProfileEditConstants } from './game-inventary-profile-edit.constants';
import { maxValidationMessage, minValidationMessage } from '@share/utils';
import { ValidationLocalization } from '@share/localization';

@Component({
    selector: 'sfc-game-inventary-profile-edit',
    templateUrl: './game-inventary-profile-edit.component.html',
    styleUrls: ['./game-inventary-profile-edit.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class GameInventaryProfileEditComponent
    extends GameProfileEditPartComponent
    implements OnInit {

    // icons
    faQuestionCircle = faQuestionCircle;

    // ngx-sfc-common
    CheckmarkType = CheckmarkType;

    // share
    ValidationConstants = ValidationConstants;
    ValidationLocalization = ValidationLocalization;
    minValidationMessage = minValidationMessage;
    maxValidationMessage = maxValidationMessage;

    // component
    Constants = GameInventaryProfileEditConstants;
    Localization = GameInventaryProfileEditLocalization;

    /* Properties */

    public inventaryForm!: FormGroup;

    /* End Properties */

    /* Observables */

    public shirtsRequired$: Observable<boolean> = EMPTY;

    /* End Observables */

    constructor(parent: FormGroupDirective, formBuilder: FormBuilder) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        const shirtsRequiredControl: AbstractControl | empty =
            getControl(nameof<IGameInventaryProfileEditFormModel>('shirtsRequired'), this.controls);

        if (shirtsRequiredControl) {
            this.shirtsRequired$ = shirtsRequiredControl.valueChanges.pipe(
                startWith(shirtsRequiredControl.value)
            );
        }

        this.inventaryForm = getFormGroup(nameof<IGameProfileEditFormModel>('inventary'), this.form.controls)!;
    }
}