import { Component } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { BaseErrorResponse } from '@core/models';
import { SchemeGameTeamEditComponent } from '../../scheme-game-team-edit.component';
import { ISchemeGameTeamEditFormModel } from '../../scheme-game-team-edit-form.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sfc-scheme-game-team-profile-edit',
    templateUrl: './scheme-game-team-profile-edit.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class SchemeGameTeamProfileEditComponent
    extends SchemeGameTeamEditComponent<ISchemeGameTeamEditFormModel, BaseErrorResponse> {

    constructor(route: ActivatedRoute, parent: FormGroupDirective, formBuilder: FormBuilder) {
        super(route, parent, formBuilder);
    }
}