import { Component } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { BaseErrorResponse } from '@core/models';
import { GameFinalEditLocalization } from './game-final-edit.localization';
import { GameFinalEditConstants } from './game-final-edit.constants';
import { GameCreatePageEditComponent } from '../../game-create-page-edit.component';
import { IGameCreatePageFormModel } from '../../../../game-create-page-form.model';

@Component({
    selector: 'sfc-game-final-edit',
    templateUrl: './game-final-edit.component.html',
    styleUrls: ['./game-final-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class GameFinalEditComponent<TFormValue extends IGameCreatePageFormModel, TResponse extends BaseErrorResponse>
    extends GameCreatePageEditComponent<TFormValue, TResponse> {

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