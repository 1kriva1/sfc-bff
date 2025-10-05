import { Component } from '@angular/core';
import { faPeopleGroup, faPerson } from '@fortawesome/free-solid-svg-icons';
import { RequestTeamPlayerViewProfilePartComponent } from '../request-team-player-view-profile-part.component';
import { RequestTeamPlayerViewGeneralProfileLocalization } from './request-team-player-view-general-profile.localization';

@Component({
    templateUrl: './request-team-player-view-general-profile.component.html',
    styleUrls: ['./request-team-player-view-general-profile.component.scss']
}) 
export class RequestTeamPlayerViewGeneralProfileComponent extends RequestTeamPlayerViewProfilePartComponent { 

    // icons
    faPerson = faPerson;
    faPeopleGroup = faPeopleGroup;
    
    // component
    Localization = RequestTeamPlayerViewGeneralProfileLocalization;
}