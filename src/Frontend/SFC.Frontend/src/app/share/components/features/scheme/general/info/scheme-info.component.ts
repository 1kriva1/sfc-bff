import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { EnumService, IFormationEnumModel } from '@share/services';
import { getFormationEnum } from '@share/utils';
import { getStars } from '@share/utils/stats';
import { CommonConstants, ComponentSize, Direction, Position } from 'ngx-sfc-common';
import {
  AvatarBadgePosition,
  getProgressColorDefaultFunc,
  IAvatarBadgeModel,
  IAvatarDataModel,
  IAvatarProgressModel,
  IDropdownMenuItemModel
} from 'ngx-sfc-components';
import { SchemeInfoConstants } from './scheme-info.constants';
import { ISchemeInfoModel } from './scheme-info.model';

@Component({
  selector: 'sfc-scheme-info',
  templateUrl: './scheme-info.component.html',
  styleUrls: ['./scheme-info.component.scss']
})
export class SchemeInfoComponent implements OnInit {

  // ngx-sfc-common
  ComponentSize = ComponentSize;
  Position = Position;

  /* Inputs */

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

  /* End Inputs */

  /* Fields */

  public avatarModel!: IAvatarDataModel;

  public avatarProgressModel!: IAvatarProgressModel;

  public avatarBadges: IAvatarBadgeModel[] = [];

  public formation!: IFormationEnumModel;

  public stars: number = 0;

  public rating: number = 0;

  public actions: IDropdownMenuItemModel[] = [];

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
  }
}