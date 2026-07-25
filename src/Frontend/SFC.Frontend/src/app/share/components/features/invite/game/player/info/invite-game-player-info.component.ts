import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CoreConstants } from '@core/constants/core.constants';
import { IEnumModel } from '@core/types';
import { getEnum } from '@core/utils';
import { EnumService } from '@share/services';
import { getRaiting, getStars } from '@share/utils/stats';
import { CommonConstants, ComponentSize, Direction, empty, getAge, isDefined, Position } from 'ngx-sfc-common';
import {
  AvatarBadgePosition,
  getProgressColorDefaultFunc,
  IAvatarBadgeModel,
  IAvatarDataModel,
  IAvatarProgressModel,
  IDropdownMenuItemModel
} from 'ngx-sfc-components';
import { InviteGamePlayerInfoConstants } from './invite-game-player-info.constants';
import { IInviteGamePlayerInfoModel } from './invite-game-player-info.model';

@Component({
  selector: 'sfc-invite-game-player-info',
  templateUrl: './invite-game-player-info.component.html',
  styleUrls: ['./invite-game-player-info.component.scss']
})
export class InviteGamePlayerInfoComponent implements OnInit {

  // ngx-sfc-common
  ComponentSize = ComponentSize;
  Position = Position;

  /* Inputs */

  @Input()
  radius: number = InviteGamePlayerInfoConstants.LOGO.RADIUS;

  @Input()
  stroke: number = InviteGamePlayerInfoConstants.LOGO.STROKE;

  @Input()
  model: IInviteGamePlayerInfoModel = {};

  @Input()
  photo: boolean = true;

  @Input()
  info: boolean = true;

  @Input()
  @HostBinding('class')
  direction: Direction = Direction.Horizontal;

  /* End Inputs */

  /* Properties */

  @HostBinding('class')
  private get _status(): string | empty { return this.status ? `${InviteGamePlayerInfoConstants.STATUS_CLASS_PART}-${this.status?.key}` : null };

  /* End Properties */

  /* Fields */

  public avatarModel!: IAvatarDataModel;

  public avatarProgressModel!: IAvatarProgressModel;

  public avatarBadges: IAvatarBadgeModel[] = [];

  public stars: number = 0;

  public rating: number = 0;

  public age: number | null = null;

  public status: IEnumModel<number> | empty = null;

  public position: IEnumModel<number> | empty = null;

  public actions: IDropdownMenuItemModel[] = [];

  /* End Fields */

  constructor(private enumService: EnumService) { }

  ngOnInit(): void {
    this.rating = this.model.stats ? getRaiting(this.model.stats) : 0;

    this.avatarModel = {
      image: this.model.photo || CoreConstants.DEFAULT_AVATAR_PATH
    }

    this.avatarProgressModel = {
      filledColor: getProgressColorDefaultFunc(this.rating)
    };

    if (this.rating > 0) {
      this.avatarBadges = [{ position: AvatarBadgePosition.RightBottom, label: `${this.rating}` }];
      this.stars = getStars(this.rating, CommonConstants.FULL_PERCENTAGE);
    }

    if (this.model.birthday) {
      this.age = getAge(this.model.birthday);
    }

    if (isDefined(this.model.position)) {
      this.position = getEnum(this.model.position!, this.enumService.enums.footballPositions);
    }

    if (isDefined(this.model.status)) {
      this.status = getEnum(this.model.status!, this.enumService.enums.inviteStatuses);
    }

    this.actions = this.model.actions || [];
  }
}