import { Component } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { BaseErrorResponse } from '@core/models';
import { SchemeGameTeamFinalEditConstants } from './scheme-game-team-final-edit.constants';
import { SchemeGameTeamFinalEditLocalization } from './scheme-game-team-final-edit.localization';
import { SchemeGameTeamCreatePageEditComponent } from '../../scheme-game-team-create-page-edit.component';
import { ISchemeGameTeamCreatePageFormModel } from '../../../../models/scheme-game-team-create-page-form.model';

@Component({
    selector: 'sfc-scheme-game-team-final-edit',
    templateUrl: './scheme-game-team-final-edit.component.html',
    styleUrls: ['./scheme-game-team-final-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class SchemeGameTeamFinalEditComponent<TFormValue extends ISchemeGameTeamCreatePageFormModel, TResponse extends BaseErrorResponse>
    extends SchemeGameTeamCreatePageEditComponent<TFormValue, TResponse> {

    // icons
    faQuestionCircle = faQuestionCircle;

    // component
    Constants = SchemeGameTeamFinalEditConstants;
    Localization = SchemeGameTeamFinalEditLocalization;

    constructor(
        parent: FormGroupDirective,
        formBuilder: FormBuilder) {
        super(parent, formBuilder);
    }
}