import { Component } from '@angular/core';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { CoreConstants } from '@core/constants';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { TeamProfileEditPartComponent } from '../team-profile-edit-part.component';
import { TeamAvailabilityProfileEditLocalization } from './team-availability-profile-edit.localization';

@Component({
    selector: 'sfc-team-availability-profile-edit',
    templateUrl: './team-availability-profile-edit.component.html',
    styleUrls: ['./team-availability-profile-edit.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class TeamAvailabilityProfileEditComponent
    extends TeamProfileEditPartComponent {

    // icons
    faQuestionCircle = faQuestionCircle;

    // component
    Localization = TeamAvailabilityProfileEditLocalization;

    constructor(parent: FormGroupDirective, formBuilder: FormBuilder) {
        super(parent, formBuilder);
    }

    public updateFormValue(): void {
        this.form.updateValueAndValidity();
    }
}