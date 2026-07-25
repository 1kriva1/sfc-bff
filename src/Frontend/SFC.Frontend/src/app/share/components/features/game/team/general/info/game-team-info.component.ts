import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CoreConstants } from '@core/constants/core.constants';
import { IEnumModel } from '@core/types';
import { getEnum } from '@core/utils';
import { EnumService } from '@share/services';
import { getTags } from '@share/utils';
import { getStars } from '@share/utils/stats';
import { CommonConstants, ComponentSize, Direction, empty, isDefined, ITagModel, Position } from 'ngx-sfc-common';
import {
  AvatarBadgePosition,
  getProgressColorDefaultFunc,
  IAvatarBadgeModel,
  IAvatarDataModel,
  IAvatarProgressModel,
  IDropdownMenuItemModel
} from 'ngx-sfc-components';
import { GameTeamInfoConstants } from './game-team-info.constants';
import { IGameTeamInfoModel } from './game-team-info.model';

@Component({
  selector: 'sfc-game-team-info',
  templateUrl: './game-team-info.component.html',
  styleUrls: ['./game-team-info.component.scss']
})
export class GameTeamInfoComponent implements OnInit {

  // ngx-sfc-common
  ComponentSize = ComponentSize;
  Position = Position;

  /* Inputs */

  @Input()
  radius: number = GameTeamInfoConstants.LOGO.RADIUS;

  @Input()
  stroke: number = GameTeamInfoConstants.LOGO.STROKE;

  @Input()
  set model(value: IGameTeamInfoModel) {
    this._model = value;
    this.setData();
  }
  get model(): IGameTeamInfoModel {
    return this._model;
  }
  private _model: IGameTeamInfoModel = {};

  @Input()
  logo: boolean = true;

  @Input()
  info: boolean = true;

  @Input()
  direction: Direction = Direction.Horizontal;

  /* End Inputs */

  /* Properties */

  @HostBinding('class')
  private get _hostClasses(): string {
    const classes: string[] = [];

    if (this.direction) {
      classes.push(this.direction);
    }

    if (this.status) {
      classes.push(`${GameTeamInfoConstants.STATUS_CLASS_PART}-${this.status.key}`);
    }

    return classes.join(' ');
  }

  /* End Properties */

  /* Fields */

  public avatarModel!: IAvatarDataModel;

  public avatarProgressModel!: IAvatarProgressModel;

  public avatarBadges: IAvatarBadgeModel[] = [];

  public stars: number = 0;

  public rating: number = 0;

  public tags: ITagModel[] = [];

  public status: IEnumModel<number> | empty = null;

  public actions: IDropdownMenuItemModel[] = [];

  /* End Fields */

  constructor(private enumService: EnumService) { }

  ngOnInit(): void {
    this.setData();
  }

  private setData(): void {
    this.rating = this.model.raiting || 0;

    this.avatarModel = {
      image: this.model.logo || CoreConstants.DEFAULT_TEAM_A_IMAGE_PATH
    }

    this.avatarProgressModel = {
      filledColor: getProgressColorDefaultFunc(this.rating)
    };

    if (this.rating > 0) {
      this.avatarBadges = [{ position: AvatarBadgePosition.RightBottom, label: `${this.rating}` }];
    }

    this.stars = getStars(this.rating, CommonConstants.FULL_PERCENTAGE);

    this.tags = getTags(this.model.tags);

    if (isDefined(this.model.status)) {
      this.status = getEnum(this.model.status!, this.enumService.enums.gameTeamStatuses);
    }

    this.actions = this.model.actions || [];
  }
}