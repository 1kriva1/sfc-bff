import { Component } from '@angular/core';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { CheckmarkType } from 'ngx-sfc-common';
import { CoreConstants } from '@core/constants';
import { EnumService } from '@share/services';
import { TeamProfileEditPartComponent } from '../team-profile-edit-part.component';
import { TeamFinancialProfileEditLocalization } from './team-financial-profile-edit.localization';

@Component({
    selector: 'sfc-team-financial-profile-edit',
    templateUrl: './team-financial-profile-edit.component.html',
    styleUrls: ['./team-financial-profile-edit.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class TeamFinancialProfileEditComponent
    extends TeamProfileEditPartComponent {

    // ngx-sfc-common
    CheckmarkType = CheckmarkType;

    // component
    Localization = TeamFinancialProfileEditLocalization;

    constructor(
        public enumService: EnumService,
        parent: FormGroupDirective,
        formBuilder: FormBuilder) {
        super(parent, formBuilder);
    }
}