import { Component } from '@angular/core';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { CoreConstants } from '@core/constants';
import { ValidationLocalization } from '@share/localization';
import { SchemeTeamProfileEditPartComponent } from '../scheme-team-profile-edit-part.component';
import { SchemeTeamProfileGeneralEditLocalization } from './scheme-team-profile-general-edit.localization';

@Component({
    templateUrl: './scheme-team-profile-general-edit.component.html',
    styleUrls: ['./scheme-team-profile-general-edit.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class SchemeTeamProfileGeneralEditComponent
    extends SchemeTeamProfileEditPartComponent {

    // share
    ValidationLocalization = ValidationLocalization;

    // component
    Localization = SchemeTeamProfileGeneralEditLocalization;

    constructor(parent: FormGroupDirective, formBuilder: FormBuilder) {
        super(parent, formBuilder);
    }
}