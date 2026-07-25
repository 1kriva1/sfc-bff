import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { nameof } from 'ngx-sfc-common';
import { CoreConstants } from '@core/constants';
import { ValidationLocalization } from '@share/localization';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { getFormGroup } from '@core/utils';
import { SchemeGameTeamProfileEditPartComponent } from '../scheme-game-team-profile-edit-part.component';
import { SchemeGameTeamGeneralProfileEditConstants } from './scheme-game-team-general-profile-edit.constants';
import { SchemeGameTeamGeneralProfileEditLocalization } from './scheme-game-team-general-profile-edit.localization';
import { ISchemeGameTeamProfileEditFormModel } from '../../scheme-game-team-profile-edit-form.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sfc-scheme-game-team-general-profile-edit',
    templateUrl: './scheme-game-team-general-profile-edit.component.html',
    styleUrls: ['./scheme-game-team-general-profile-edit.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class SchemeGameTeamGeneralProfileEditComponent
    extends SchemeGameTeamProfileEditPartComponent
    implements OnInit {

    // icons
    faQuestionCircle = faQuestionCircle;

    // share
    ValidationLocalization = ValidationLocalization;

    // component
    Constants = SchemeGameTeamGeneralProfileEditConstants;
    Localization = SchemeGameTeamGeneralProfileEditLocalization;

    /* Fields */

    public generalForm!: FormGroup;

    /* End Fields */

    constructor(
        route: ActivatedRoute,
        parent: FormGroupDirective,
        formBuilder: FormBuilder) {
        super(route, parent, formBuilder);
    }

    ngOnInit(): void {
        this.generalForm = getFormGroup(nameof<ISchemeGameTeamProfileEditFormModel>('general'), this.form.controls)!;
    }
}