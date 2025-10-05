import { Component, Input } from '@angular/core';
import { IPlayerModel } from '@share/models/player/player.model';
import { ITeamModel } from '@share/models/team/team.model';
import { empty } from 'ngx-sfc-common';

@Component({
    selector: 'sfc-request-team-player-preview',
    templateUrl: './request-team-player-preview.component.html'
})
export class RequestTeamPlayerPreviewComponent {

    @Input()
    player: IPlayerModel | empty;

    @Input()
    team: ITeamModel | empty;
}