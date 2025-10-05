import { Component } from '@angular/core';
import { InviteTeamPlayerViewMainLocalization } from './invite-team-player-view-main.localization';

@Component({
    selector: 'sfc-invite-team-player-view-main',
    templateUrl: './invite-team-player-view-main.component.html',
    styleUrls: ['./invite-team-player-view-main.component.scss']
})
export class InviteTeamPlayerViewMainComponent {

    // component
    Localization = InviteTeamPlayerViewMainLocalization;
}