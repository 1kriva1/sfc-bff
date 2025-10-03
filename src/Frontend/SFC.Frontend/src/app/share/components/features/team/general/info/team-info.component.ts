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
import { TeamInfoConstants } from './team-info.constants';
import { ITeamInfoModel } from './team-info.model';

@Component({
  selector: 'sfc-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit {

  ComponentSize = ComponentSize;

  @Input()
  radius: number = TeamInfoConstants.LOGO.RADIUS;

  @Input()
  stroke: number = TeamInfoConstants.LOGO.STROKE;

  @Input()
  model: ITeamInfoModel = {};

  @Input()
  logo: boolean = true;

  @Input()
  info: boolean = true;

  @Input()
  @HostBinding('class')
  direction: Direction = Direction.Horizontal;

  public avatarModel!: IAvatarDataModel;

  public avatarProgressModel!: IAvatarProgressModel;

  public avatarBadges!: IAvatarBadgeModel[];

  public stars: number = 0;

  public rating: number = 0;

  ngOnInit(): void {
    this.rating = this.model.raiting || 0;

    this.avatarModel = {
      image: this.model.logo || CoreConstants.DEFAULT_TEAM_A_IMAGE_PATH
    }

    this.avatarProgressModel = {
      filledColor: getProgressColorDefaultFunc(this.rating)
    };

    this.avatarBadges = [{ position: AvatarBadgePosition.RightBottom, label: `${this.rating}` }];

    this.stars = getStars(this.rating, CommonConstants.FULL_PERCENTAGE);
  }
}