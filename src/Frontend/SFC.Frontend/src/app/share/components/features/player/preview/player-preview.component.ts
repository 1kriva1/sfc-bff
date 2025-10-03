import { Component, Input } from '@angular/core';
import { CoreLocalization } from '@core/localization';
import { getEnum } from '@core/utils';
import { IPlayerModel } from '@share/models/player/player.model';
import { EnumService } from '@share/services';
import { getTags } from '@share/utils/components';
import { CommonConstants, empty, getAge, isDefined } from 'ngx-sfc-common';
import { PlayerPreviewLocalization } from './player-preview.localization';
import { IPlayerPreviewModel } from './player-preview.model';

@Component({
    selector: 'sfc-player-preview',
    templateUrl: './player-preview.component.html',
    styleUrls: ['./player-preview.component.scss']
})
export class PlayerPreviewComponent {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // core
    CoreLocalization = CoreLocalization;

    // component
    Localization = PlayerPreviewLocalization;

    @Input()
    set player(value: IPlayerModel | empty) {
        if (value) {
            this.model = {
                firstName: value.general.firstName,
                lastName: value.general.lastName,
                city: value.general.city,
                age: isDefined(value.general.birthday) ? getAge(value.general.birthday) : null,
                tags: getTags(value.general.tags),
                position: getEnum(value.football.position!, this.enumService.enums.footballPositions),
                stats: value.stats
            };
        } else {
            this.model = null;
        }
    }

    public model: IPlayerPreviewModel | empty = null;

    constructor(private enumService: EnumService) { }
}