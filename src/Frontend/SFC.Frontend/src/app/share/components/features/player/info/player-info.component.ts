import { Component, HostBinding, Input } from '@angular/core';
import { CoreConstants } from '@core/constants/core.constants';
import { getStars } from '@share/utils/stats';
import { CommonConstants, ComponentSize, Direction, isDefined } from 'ngx-sfc-common';
import {
  AvatarBadgePosition,
  getProgressColorDefaultFunc,
  IAvatarBadgeModel,
  IAvatarDataModel,
  IAvatarProgressModel
} from 'ngx-sfc-components';
import { PlayerInfoConstants } from './player-info.constants';
import { IPlayerInfoModel } from './player-info.model';

@Component({
  selector: 'sfc-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent {

  ComponentSize = ComponentSize;

  @Input()
  radius: number = PlayerInfoConstants.DEFAULT_RADIUS;

  @Input()
  stroke: number = PlayerInfoConstants.DEFAULT_STROKE;

  @Input()
  model: IPlayerInfoModel = { raiting: 0 };

  @Input()
  avatar: boolean = true;

  @Input()
  info: boolean = true;

  @Input()
  @HostBinding('class')
  direction: Direction = Direction.Horizontal;

  public get avatarModel(): IAvatarDataModel {
    return {
      image: this.model.photo || CoreConstants.DEFAULT_AVATAR_PATH
    }
  }

  public get avatarProgressModel(): IAvatarProgressModel {
    return {
      filledColor: this.model.raiting ? getProgressColorDefaultFunc(this.model.raiting) : undefined
    }
  }

  public get badges(): IAvatarBadgeModel[] {
    return this.model.raiting ? [
      {
        position: AvatarBadgePosition.RightBottom,
        label: `${this.model.raiting}`
      }
    ] : [];
  }

  public get stars(): number | null {
    return this.model.raiting ? getStars(this.model.raiting, CommonConstants.FULL_PERCENTAGE) : null;
  }

  public get age(): string | null {
    return isDefined(this.model.age)
      ? `${this.model.age} ${$localize`:@@core.years:Years`}`
      : null;
  }
}