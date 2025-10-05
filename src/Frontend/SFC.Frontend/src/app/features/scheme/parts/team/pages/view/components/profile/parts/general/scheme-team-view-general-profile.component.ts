import { Component } from '@angular/core';
import { SchemeTeamViewGeneralProfileLocalization } from './scheme-team-view-general-profile.localization';

@Component({
    templateUrl: './scheme-team-view-general-profile.component.html',
    styleUrls: ['./scheme-team-view-general-profile.component.scss']
}) 
export class SchemeTeamViewGeneralProfileComponent { 

    // component
    Localization = SchemeTeamViewGeneralProfileLocalization;
}