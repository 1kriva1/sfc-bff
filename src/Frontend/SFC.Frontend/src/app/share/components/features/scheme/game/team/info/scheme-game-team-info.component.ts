import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { EnumService, IFormationEnumModel } from '@share/services';
import { getFormationEnum, getFormationTotalPlayers } from '@share/utils';
import { getStars } from '@share/utils/stats';
import { CommonConstants, ComponentSize, Direction, Position } from 'ngx-sfc-common';
import {
  AvatarBadgePosition,
  getProgressColorDefaultFunc,
  IAvatarBadgeModel,
  IAvatarDataModel,
  IAvatarProgressModel,
  IDropdownMenuItemModel,
  getProgressColorDynamicallyFunc
} from 'ngx-sfc-components';
import { SchemeGameTeamInfoConstants } from './scheme-game-team-info.constants';
import { ISchemeGameTeamInfoModel } from './scheme-game-team-info.model';

@Component({
  selector: 'sfc-scheme-game-team-info',
  templateUrl: './scheme-game-team-info.component.html',
  styleUrls: ['./scheme-game-team-info.component.scss']
})
export class SchemeGameTeamInfoComponent implements OnInit {

  // ngx-sfc-common
  ComponentSize = ComponentSize;
  Position = Position;

  // ngx-sfc-components
  getProgressColorDynamicallyFunc = getProgressColorDynamicallyFunc;

  /* Inputs */

  @Input()
  radius: number = SchemeGameTeamInfoConstants.AVATAR.RADIUS;

  @Input()
  stroke: number = SchemeGameTeamInfoConstants.AVATAR.STROKE;

  private _model!: ISchemeGameTeamInfoModel;

  @Input()
  set model(value: ISchemeGameTeamInfoModel) {
    this._model = value;
    this.formation = getFormationEnum(this.model.formation, this.enumService.enums.formations)!;
    this.avatarModel = { image: this.formation.image }
  }
  get model(): ISchemeGameTeamInfoModel { return this._model };

  @Input()
  avatar: boolean = true;

  @Input()
  info: boolean = true;

  @Input()
  progress: boolean = false;

  @Input()
  @HostBinding('class')
  direction: Direction = Direction.Horizontal;

  /* End Inputs */

  /* Fields */

  public avatarModel!: IAvatarDataModel;

  public avatarProgressModel!: IAvatarProgressModel;

  public avatarBadges: IAvatarBadgeModel[] = [];

  public formation!: IFormationEnumModel;

  public stars: number = 0;

  public rating: number = 0;

  public actions: IDropdownMenuItemModel[] = [];

  public totalPlayers: number = 0;

  /* End Fields */

  constructor(private enumService: EnumService) { }

  ngOnInit(): void {
    this.rating = this.model.raiting || 0;

    this.formation = getFormationEnum(this.model.formation, this.enumService.enums.formations)!;

    this.avatarModel = { image: this.formation.image }

    this.avatarProgressModel = {
      filledColor: getProgressColorDefaultFunc(this.rating)
    };

    if (this.rating > 0) {
      this.avatarBadges = [{ position: AvatarBadgePosition.RightBottom, label: `${this.rating}` }];
    }

    this.stars = getStars(this.rating, CommonConstants.FULL_PERCENTAGE);

    this.actions = this.model.actions || [];

    this.totalPlayers = getFormationTotalPlayers(this.model.formation, this.enumService.enums.formations);
  }
}