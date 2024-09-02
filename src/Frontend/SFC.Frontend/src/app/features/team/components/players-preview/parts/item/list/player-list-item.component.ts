import { Component, HostBinding } from '@angular/core';
import { UIConstants } from '@core/constants';
import { IPlayerInfoPanelModel } from '@share/components';
import { CommonConstants, isDefined } from 'ngx-sfc-common';
import { BasePlayerItemComponent } from '../base-item.component';
import { PlayerListItemConstants } from './player-list-item.constants';

@Component({
    selector: 'sfc-player-list-item',
    templateUrl: './player-list-item.component.html',
    styleUrls: ['../base-item.component.scss', './player-list-item.component.scss']
})
export class PlayerListItemComponent extends BasePlayerItemComponent {

    Constants = PlayerListItemConstants;

    @HostBinding('class')
    private get _position(): string {
        return isDefined(this.model?.position)
            ? `${UIConstants.POSITION_CLASS_PART}${this.model.position?.key}`
            : CommonConstants.EMPTY_STRING;
    }

    public get avatar(): IPlayerInfoPanelModel {
        return {
            photo: this.model.photo,
            raiting: this.model.raiting
        }
    }

    public get info(): IPlayerInfoPanelModel {
        return {
            firstName: this.model.firstName,
            lastName: this.model.lastName,
            age: this.model.age,
            city: this.model.city,
            raiting: this.model.raiting
        }
    }
}