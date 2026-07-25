import { Component } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { BaseErrorResponse } from '@core/models';
import { GameTeamFinalEditLocalization } from './game-team-final-edit.localization';
import { IGameTeamCreatePageFormModel } from '../../../../models/game-team-create-page-form.model';
import { GameTeamCreatePageEditComponent } from '../../game-team-create-page-edit.component';
import { GameTeamFinalEditConstants } from './game-team-final-edit.constants';

@Component({
    selector: 'sfc-game-team-final-edit',
    templateUrl: './game-team-final-edit.component.html',
    styleUrls: ['./game-team-final-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class GameTeamFinalEditComponent<TFormValue extends IGameTeamCreatePageFormModel, TResponse extends BaseErrorResponse>
    extends GameTeamCreatePageEditComponent<TFormValue, TResponse> {

    // icons
    faQuestionCircle = faQuestionCircle;

    // component
    Constants = GameTeamFinalEditConstants;
    Localization = GameTeamFinalEditLocalization;

    constructor(
        parent: FormGroupDirective,
        formBuilder: FormBuilder) {
        super(parent, formBuilder);
    }
}