import { Component } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { BaseErrorResponse } from '@core/models';
import { SchemeTeamEditComponent } from '../scheme-team-edit.component';
import { ISchemeTeamEditFormModel } from '../scheme-team-edit-form.model';
import { EnumService } from '@share/services';

@Component({
    templateUrl: './scheme-team-profile-edit.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class SchemeTeamProfileEditComponent<TFormValue extends ISchemeTeamEditFormModel, TResponse extends BaseErrorResponse>
    extends SchemeTeamEditComponent<TFormValue, TResponse> {

    constructor(parent: FormGroupDirective, formBuilder: FormBuilder, enumservice: EnumService) {
        super(parent, formBuilder, enumservice);
    }
}