import { Component, HostBinding, Input } from '@angular/core';
import { CommonConstants, ComponentSize, isDefined, Position } from 'ngx-sfc-common';
import { UIConstants } from '@core/constants';
import { IPlayerInfoModel } from '@share/components/features/player/info/player-info.model';
import { ITeamPlayersPreviewListPartModel } from '../team-players-preview-list-part.model';
import { TeamPlayersPreviewListPartConstants } from '../team-players-preview-list-part.constants';

@Component({
    selector: 'sfc-team-players-preview-list-item',
    templateUrl: './team-players-preview-list-item.component.html',
    styleUrls: ['./team-players-preview-list-item.component.scss']
})
export class TeamPlayersPreviewListItemComponent {

    // ngx-sfc-common
    ComponentSize = ComponentSize;
    Position = Position;

    // component
    Constants = TeamPlayersPreviewListPartConstants;

    /* Inputs */

    @Input()
    model!: ITeamPlayersPreviewListPartModel;

    /* End Inputs */

    /* Class bindings */

    @HostBinding('class')
    private get _position(): string {
        return isDefined(this.model?.position)
            ? `${UIConstants.POSITION_CLASS_PART}${this.model.position?.key}`
            : CommonConstants.EMPTY_STRING;
    }

    /* End Class bindings */

    /* Properties */

    public get avatar(): IPlayerInfoModel {
        return {
            photo: this.model.photo,
            raiting: this.model.raiting
        }
    }

    public get info(): IPlayerInfoModel {
        return {
            firstName: this.model.firstName,
            lastName: this.model.lastName,
            age: this.model.age,
            city: this.model.city,
            raiting: this.model.raiting
        }
    }

    /* End Properties */
}