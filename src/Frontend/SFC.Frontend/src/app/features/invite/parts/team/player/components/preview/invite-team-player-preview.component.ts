import { Component, Input } from '@angular/core';
import { IPlayerModel } from '@share/models/player/player.model';
import { ITeamModel } from '@share/models/team/general/team.model';
import { empty } from 'ngx-sfc-common';

@Component({
    selector: 'sfc-invite-team-player-preview',
    templateUrl: './invite-team-player-preview.component.html'
})
export class InviteTeamPlayerPreviewComponent {

    @Input()
    player: IPlayerModel | empty;

    @Input()
    team: ITeamModel | empty;
}