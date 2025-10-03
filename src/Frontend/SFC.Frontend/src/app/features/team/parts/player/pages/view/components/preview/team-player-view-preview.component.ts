import { Component } from '@angular/core';
import { TeamPlayerViewPreviewLocalization } from './team-player-view-preview.localization';

@Component({
    selector: 'sfc-team-player-view-preview',
    templateUrl: './team-player-view-preview.component.html',
    styleUrls: ['./team-player-view-preview.component.scss']
})
export class TeamPlayerViewPreviewComponent {

    // component
    Localization = TeamPlayerViewPreviewLocalization;
}