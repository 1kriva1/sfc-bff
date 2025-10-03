import { Component } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { BaseErrorResponse } from '@core/models';
import { IInviteTeamPlayerEditFormModel } from '../../invite-team-player-edit-form.model';
import { InviteTeamPlayerEditComponent } from '../../invite-team-player-edit.component';

@Component({
    templateUrl: './invite-team-player-profile-edit.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class InviteTeamPlayerProfileEditComponent<TFormValue extends IInviteTeamPlayerEditFormModel, TResponse extends BaseErrorResponse>
    extends InviteTeamPlayerEditComponent<TFormValue, TResponse> {

    constructor(parent: FormGroupDirective, formBuilder: FormBuilder) {
        super(parent, formBuilder);
    }
}