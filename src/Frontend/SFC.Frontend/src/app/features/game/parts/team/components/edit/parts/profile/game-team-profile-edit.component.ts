import { Component } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { BaseErrorResponse } from '@core/models';
import { IGameTeamEditFormModel } from '../../game-team-edit-form.model';
import { GameTeamEditComponent } from '../../game-team-edit.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sfc-game-team-profile-edit',
    templateUrl: './game-team-profile-edit.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class GameTeamProfileEditComponent<TFormValue extends IGameTeamEditFormModel, TResponse extends BaseErrorResponse>
    extends GameTeamEditComponent<TFormValue, TResponse> {

    constructor(route: ActivatedRoute, parent: FormGroupDirective, formBuilder: FormBuilder) {
        super(route, parent, formBuilder);
    }
}