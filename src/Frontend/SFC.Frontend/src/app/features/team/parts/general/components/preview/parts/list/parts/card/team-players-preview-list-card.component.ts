import { Component, Input } from '@angular/core';
import { IPlayerInfoModel } from '@share/components/features/player/info/player-info.model';
import { ComponentSize, Position } from 'ngx-sfc-common';
import { TeamPlayersPreviewListPartConstants } from '../team-players-preview-list-part.constants';
import { ITeamPlayersPreviewListPartModel } from '../team-players-preview-list-part.model';

@Component({
    selector: 'sfc-team-players-preview-card-item',
    templateUrl: './team-players-preview-list-card.component.html',
    styleUrls: ['./team-players-preview-list-card.component.scss']
})
export class TeamPlayersPreviewCardItemComponent {

    // ngx-sfc-common
    ComponentSize = ComponentSize;
    Position = Position;

    // component
    Constants = TeamPlayersPreviewListPartConstants;
    
    /* Inputs */

    @Input()
    model!: ITeamPlayersPreviewListPartModel;

    /* End Inputs */
    
    /* Properties */

    public get info(): IPlayerInfoModel {
        return {
            photo: this.model.photo,
            firstName: this.model.firstName,
            lastName: this.model.lastName,
            age: this.model.age,
            city: this.model.city,
            raiting: this.model.raiting
        }
    }

    /* End Properties */
}