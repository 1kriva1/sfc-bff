import { Component } from '@angular/core';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { CoreConstants } from '@core/constants';
import { ValidationLocalization } from '@share/localization';
import { InviteTeamPlayerProfileEditPartComponent } from '../invite-team-player-profile-edit-part.component';
import { InviteTeamPlayerProfileGeneralEditLocalization } from './invite-team-player-profile-general-edit.localization';

@Component({
    selector: 'sfc-invite-team-player-profile-general-edit',
    templateUrl: './invite-team-player-profile-general-edit.component.html',
    styleUrls: ['./invite-team-player-profile-general-edit.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class InviteTeamPlayerProfileGeneralEditComponent
    extends InviteTeamPlayerProfileEditPartComponent {

    // share
    ValidationLocalization = ValidationLocalization;

    // component
    Localization = InviteTeamPlayerProfileGeneralEditLocalization;

    constructor(parent: FormGroupDirective, formBuilder: FormBuilder) {
        super(parent, formBuilder);
    }
}