import { Component } from '@angular/core';
import { SchemeTeamViewMainLocalization } from './scheme-team-view-main.localization';

@Component({
    selector: 'sfc-scheme-team-view-main',
    templateUrl: './scheme-team-view-main.component.html',
    styleUrls: ['./scheme-team-view-main.component.scss']
})
export class SchemeTeamViewMainComponent {

    // component
    Localization = SchemeTeamViewMainLocalization;
}