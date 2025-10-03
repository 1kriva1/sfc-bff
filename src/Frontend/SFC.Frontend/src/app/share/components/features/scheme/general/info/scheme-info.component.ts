import { Component, HostBinding, Input, OnInit } from '@angular/core';
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
import { SchemeInfoConstants } from './scheme-info.constants';
import { ISchemeInfoModel } from './scheme-info.model';

@Component({
  selector: 'sfc-scheme-info',
  templateUrl: './scheme-info.component.html',
  styleUrls: ['./scheme-info.component.scss']
})
export class SchemeInfoComponent {

  // ngx-sfc-common
  ComponentSize = ComponentSize;

  @Input()
  radius: number = SchemeInfoConstants.AVATAR.RADIUS;

  @Input()
  stroke: number = SchemeInfoConstants.AVATAR.STROKE;

  @Input()
  model!: ISchemeInfoModel;

  @Input()
  avatar: boolean = true;

  @Input()
  info: boolean = true;

  @Input()
  @HostBinding('class')
  direction: Direction = Direction.Horizontal;

  public get avatarModel(): IAvatarDataModel {
    return {
      image: this.model.avatar || CoreConstants.DEFAULT_AVATAR_PATH
    }
  }

  public get avatarProgressModel(): IAvatarProgressModel {
    return {
      filledColor: getProgressColorDefaultFunc(this.rating),
    }
  }

  public get avatarBadges(): IAvatarBadgeModel[] {
    return [{ position: AvatarBadgePosition.RightBottom, label: `${this.model.raiting}` }];
  }

  public get stars(): number {
    return getStars(this.rating, CommonConstants.FULL_PERCENTAGE);
  }

  public get rating(): number { return this.model.raiting || 0; }
}