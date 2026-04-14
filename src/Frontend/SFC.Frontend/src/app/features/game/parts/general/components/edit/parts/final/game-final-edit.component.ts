import { Component } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { BaseErrorResponse } from '@core/models';
import { GameEditComponent } from '../../game-edit.component';
import { IGameEditFormModel } from '../../game-edit-form.model';
import { GameFinalEditLocalization } from './game-final-edit.localization';
import { GameFinalEditConstants } from './game-final-edit.constants';

@Component({
    selector: 'sfc-game-final-edit',
    templateUrl: './game-final-edit.component.html',
    styleUrls: ['./game-final-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class GameFinalEditComponent<TFormValue extends IGameEditFormModel, TResponse extends BaseErrorResponse>
    extends GameEditComponent<TFormValue, TResponse> {

    // icons
    faQuestionCircle = faQuestionCircle;

    // component
    Constants = GameFinalEditConstants;
    Localization = GameFinalEditLocalization;

    constructor(
        parent: FormGroupDirective,
        formBuilder: FormBuilder) {
        super(parent, formBuilder);
    }
}