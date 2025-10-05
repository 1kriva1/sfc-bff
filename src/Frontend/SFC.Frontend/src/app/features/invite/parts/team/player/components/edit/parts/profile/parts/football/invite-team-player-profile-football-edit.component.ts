import { Component } from '@angular/core';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { CheckmarkType } from 'ngx-sfc-common';
import { IBubbleModel } from 'ngx-sfc-inputs';
import { CoreConstants } from '@core/constants';
import { ValidationConstants } from '@share/constants';
import { InviteTeamPlayerProfileFootballEditLocalization } from './invite-team-player-profile-football-edit.localization';
import { InviteTeamPlayerProfileEditPartComponent } from '../invite-team-player-profile-edit-part.component';
import { EnumService } from '@share/services';
import { mapBubbles } from "@share/utils/inputs";

@Component({
    selector: 'sfc-invite-team-player-profile-football-edit',
    templateUrl: './invite-team-player-profile-football-edit.component.html',
    styleUrls: ['./invite-team-player-profile-football-edit.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class InviteTeamPlayerProfileFootballEditComponent
    extends InviteTeamPlayerProfileEditPartComponent {

    // ngx-sfc-common
    CheckmarkType = CheckmarkType;

    // share
    ValidationConstants = ValidationConstants;

    // component
    Localization = InviteTeamPlayerProfileFootballEditLocalization;

    public footballPositions: IBubbleModel[];

    constructor(
        private enumService: EnumService,
        parent: FormGroupDirective,
        formBuilder: FormBuilder) {
        super(parent, formBuilder);
        this.footballPositions = mapBubbles(this.enumService.enums.footballPositions);
    }
}