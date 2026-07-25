import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable, EMPTY, startWith } from 'rxjs';
import { CheckmarkType, empty, nameof } from 'ngx-sfc-common';
import { CoreConstants } from '@core/constants';
import { maxValidationMessage, minValidationMessage } from '@share/utils/validations';
import { ValidationLocalization } from '@share/localization';
import { ValidationConstants } from '@share/constants';
import { GameProfileEditPartComponent } from '../game-profile-edit-part.component';
import { getControl, getFormGroup } from '@core/utils';
import { IGameFinancialProfileEditFormModel } from './game-financial-profile-edit-form.model';
import { GameFinancialProfileEditLocalization } from './game-financial-profile-edit.localization';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { IGameProfileEditFormModel } from '../../game-profile-edit-form.model';
import { GameFinancialProfileEditConstants } from './game-financial-profile-edit.constants';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sfc-game-financial-profile-edit',
    templateUrl: './game-financial-profile-edit.component.html',
    styleUrls: ['./game-financial-profile-edit.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class GameFinancialProfileEditComponent
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
    Constants = GameFinancialProfileEditConstants;
    Localization = GameFinancialProfileEditLocalization;

    /* Properties */

    public financialForm!: FormGroup;

    /* End Properties */

    /* Observables */

    public freeGame$: Observable<boolean> = EMPTY;

    /* End Observables */

    constructor(route: ActivatedRoute, parent: FormGroupDirective, formBuilder: FormBuilder) {
        super(route, parent, formBuilder);
    }

    ngOnInit(): void {
        const freeGameControl: AbstractControl | empty =
            getControl(nameof<IGameFinancialProfileEditFormModel>('freeGame'), this.controls);

        if (freeGameControl) {
            this.freeGame$ = freeGameControl.valueChanges.pipe(
                startWith(freeGameControl.value)
            );
        }

        this.financialForm = getFormGroup(nameof<IGameProfileEditFormModel>('financial'), this.form.controls)!;
    }
}