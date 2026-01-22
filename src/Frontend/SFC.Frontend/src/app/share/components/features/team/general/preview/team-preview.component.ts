import { Component, Input, OnInit } from '@angular/core';
import { CoreLocalization } from '@core/localization';
import { IPlayerModel } from '@share/models/player/player.model';
import { ITeamModel } from '@share/models/team/general/team.model';
import { getTags } from '@share/utils/components';
import { CommonConstants, empty } from 'ngx-sfc-common';
import { TeamPreviewLocalization } from './team-preview.localization';
import { ITeamPreviewModel } from './team-preview.model';

@Component({
    selector: 'sfc-team-preview',
    templateUrl: './team-preview.component.html',
    styleUrls: ['./team-preview.component.scss']
})
export class TeamPreviewComponent {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // core
    CoreLocalization = CoreLocalization;

    // component
    Localization = TeamPreviewLocalization;

    @Input()
    set team(value: ITeamModel | empty) {
        if (value) {
            const players: IPlayerModel[] = value.players.map(teamPlayer => teamPlayer.player);

            this.model = {
                name: value.profile.general.name,
                city: value.profile.general.city,
                description: value.profile.general.description,
                tags: getTags(value.profile.general.tags),
                availability: value.profile.general.availability || [],
                players: players
            };
        } else {
            this.model = null;
        }
    }

    public model: ITeamPreviewModel | empty = null;
}