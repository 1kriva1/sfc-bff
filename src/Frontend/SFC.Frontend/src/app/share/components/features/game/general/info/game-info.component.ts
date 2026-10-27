import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CoreConstants } from '@core/constants/core.constants';
import { IEnumModel } from "@share/models";
import { getEnum } from '@share/utils';
import { EnumService } from '@share/services';
import { getTags } from '@share/utils';
import { CommonConstants, ComponentSize, Direction, empty, firstOrDefault, isDefined, ITagModel, Position } from 'ngx-sfc-common';
import { IDropdownMenuItemModel } from 'ngx-sfc-components';
import { GameInfoConstants } from './game-info.constants';
import { IGameInfoModel, IGameInfoTeamInfoModel } from './game-info.model';
import { ITeamInfoModel } from '@share/components/features/team';
import { Enum } from '@share/enums';

@Component({
  selector: 'sfc-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {

  // ngx-sfc-common
  ComponentSize = ComponentSize;
  Position = Position;
  Direction = Direction;
  CommonConstants = CommonConstants;

  /* Inputs */

  @Input()
  radius: number = GameInfoConstants.LOGO.RADIUS;

  @Input()
  stroke: number = GameInfoConstants.LOGO.STROKE;

  @Input()
  set model(value: IGameInfoModel) {
    this._model = value;
    this.setData();
  }
  get model(): IGameInfoModel {
    return this._model;
  }
  private _model: IGameInfoModel = {};

  @Input()
  result: boolean = true;

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
      classes.push(`${GameInfoConstants.STATUS_CLASS_PART}-${this.status.key}`);
    }

    return classes.join(' ');
  }

  /* End Properties */

  /* Fields */

  public teamAInfoModel: ITeamInfoModel = {
    logo: CoreConstants.DEFAULT_TEAM_A_IMAGE_PATH
  };

  public teamBInfoModel: ITeamInfoModel = {
    logo: CoreConstants.DEFAULT_TEAM_B_IMAGE_PATH
  };

  public teamAScore: number | empty;

  public teamBScore: number | empty;

  public tags: ITagModel[] = [];

  public status: IEnumModel<number> | empty = null;

  public actions: IDropdownMenuItemModel[] = [];

  /* End Fields */

  constructor(private enumService: EnumService) { }

  ngOnInit(): void {
    this.setData();
  }

  private setData(): void {
    if (this.model.teams) {
      const teamAModel: IGameInfoTeamInfoModel | empty = firstOrDefault(this.model.teams, gameTeam => gameTeam.index == Enum.GameTeamIndex.A),
        teamBModel: IGameInfoTeamInfoModel | empty = firstOrDefault(this.model.teams, gameTeam => gameTeam.index == Enum.GameTeamIndex.B);

      if (teamAModel) {
        this.teamAInfoModel = this.buildTeamInfoModel(teamAModel);
      }

      if (teamBModel) {
        this.teamBInfoModel = this.buildTeamInfoModel(teamBModel);
      }

      this.teamAScore = teamAModel?.result?.score;
      this.teamBScore = teamBModel?.result?.score;
    }

    this.tags = getTags(this.model.tags);

    if (isDefined(this.model.status)) {
      this.status = getEnum(this.model.status!, this.enumService.enums.gameStatuses);
    }

    this.actions = this.model.actions || [];
  }

  private buildTeamInfoModel(model: IGameInfoTeamInfoModel): ITeamInfoModel {
    return {
      id: model.id,
      name: model.name,
      logo: model.logo,
      raiting: model.raiting
    };
  }
}