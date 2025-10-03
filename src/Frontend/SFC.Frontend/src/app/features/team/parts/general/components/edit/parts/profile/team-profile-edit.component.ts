import { Component } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { BaseErrorResponse } from '@core/models';
import { ITeamEditFormModel } from '../../team-edit-form.model';
import { TeamEditComponent } from '../../team-edit.component';

@Component({
    templateUrl: './team-profile-edit.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class TeamProfileEditComponent<TFormValue extends ITeamEditFormModel, TResponse extends BaseErrorResponse>
    extends TeamEditComponent<TFormValue, TResponse> {

    constructor(parent: FormGroupDirective, formBuilder: FormBuilder) {
        super(parent, formBuilder);
    }
}