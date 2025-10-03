import { Component } from '@angular/core';
import { TeamPlayerViewGeneralProfileLocalization } from './team-player-view-general-profile.localization';

@Component({
    templateUrl: './team-player-view-general-profile.component.html',
    styleUrls: ['./team-player-view-general-profile.component.scss']
}) 
export class TeamPlayerViewGeneralProfileComponent { 

    // component
    Localization = TeamPlayerViewGeneralProfileLocalization;
}