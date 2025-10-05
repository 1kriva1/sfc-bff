import { Component } from '@angular/core';
import { TeamPlayerViewMainLocalization } from './team-player-view-main.localization';

@Component({
    selector: 'sfc-team-player-view-main',
    templateUrl: './team-player-view-main.component.html',
    styleUrls: ['./team-player-view-main.component.scss']
})
export class TeamPlayerViewMainComponent {

    // component
    Localization = TeamPlayerViewMainLocalization;
}