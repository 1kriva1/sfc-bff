import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBell, faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faExclamation, faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { any, ComponentSize, firstOrDefault, hasItem, isDefined, Position } from 'ngx-sfc-common';
import {
  AvatarBadgePosition, IAvatarBadgeModel,
  IAvatarDataModel, IAvatarProgressModel,
  IDropdownMenuItemModel
} from 'ngx-sfc-components';
import { filter, map, Subscription } from 'rxjs';
import { CommonConstants } from '../../../../constants';
import { RoutKey } from '../../../../enums';
import { buildPath } from '../../../../utils';
import { HeaderService } from '../../services/header.service';
import { IHeaderNavigationModel } from '../base/header-navigation.model';
import { EnumService } from '@share/services';
import { ObservableDataModel } from '../../../../models';
import { IdentityService, PlayerService, IPlayerByUserProfileModel } from '@share/services';

@Component({
  selector: 'sfc-authenticated-header',
  templateUrl: './authenticated-header.component.html',
  styleUrls: ['./authenticated-header.component.scss']
})
export class AuthenticatedHeaderComponent implements OnInit, OnDestroy {

  faBell = faBell;
  faEnvelope = faEnvelope;
  faPlus = faPlus;

  ComponentSize = ComponentSize;
  Position = Position;

  MESSAGES_TOOLTIP_TEXT = $localize`:@@core.component.header-authenticated.tooltip.messages:Messages`;
  NOTIFICATIONS_TOOLTIP_TEXT = $localize`:@@core.component.header-authenticated.tooltip.notifications:Notifications`;

  public navigations: IHeaderNavigationModel[] = [
    {
      label: $localize`:@@core.component.header-authenticated.navigation.players:Players`,
      click: () => this.navigate(RoutKey.Players)
    },
    {
      label: $localize`:@@core.component.header-authenticated.navigation.games:Games`,
      click: () => this.navigate(RoutKey.Players)
    },
    {
      label: $localize`:@@core.component.header-authenticated.navigation.teams:Teams`,
      click: () => this.navigate(RoutKey.Players)
    },
    {
      label: $localize`:@@core.component.header-authenticated.navigation.locations:Locations`,
      click: () => this.navigate(RoutKey.Players)
    }
  ];

  public avatarModel: IAvatarDataModel = {
    image: CommonConstants.DEFAULT_AVATAR_PATH
  };

  public avatarProgressModel: IAvatarProgressModel = {
    filledColor: 'red'
  }

  public avatarBadges: IAvatarBadgeModel[] = [
    {
      position: AvatarBadgePosition.RightTop,
      icon: faExclamation,
      background: '#fcbb42',
      tooltip: {
        position: Position.Bottom,
        value: $localize`:@@core.component.header-authenticated.tooltip.avatar-badge-create-profile:Please create profile!`
      }
    }
  ];

  public actions: IDropdownMenuItemModel[] = [
    {
      label: $localize`:@@core.component.header-authenticated.action.logout:Logout`,
      icon: faRightFromBracket,
      click: () => this.identityService
        .logout()
        .subscribe()
        .unsubscribe()
    }
  ];

  private profileAction: IDropdownMenuItemModel = {
    label: $localize`:@@core.component.header-authenticated.action.profile:Profile`,
    icon: faUser,
    click: () => {
      this.router.navigate([`${RoutKey.Profiles}/${this.playerService.playerId.value}/${RoutKey.Edit}`]);

      if (this.headerService.open)
        this.headerService.set(false);
    }
  };

  private _playerSubscription?: Subscription;

  constructor(
    public playerService: PlayerService,
    private router: Router,
    private headerService: HeaderService,
    private identityService: IdentityService,
    private enumService: EnumService) { }

  ngOnInit(): void {
    this.headerService.set(false);

    this._playerSubscription = this.playerService.player.value$
      .pipe(
        filter((playerModel: ObservableDataModel<IPlayerByUserProfileModel>) => isDefined(playerModel.data)),
        map((playerModel: ObservableDataModel<IPlayerByUserProfileModel>) => playerModel.data)
      ).subscribe((playerModel: IPlayerByUserProfileModel | null) =>
        this.setAvatarModel(playerModel as IPlayerByUserProfileModel));
  }

  ngOnDestroy(): void {
    this._playerSubscription?.unsubscribe();
  }

  private navigate(key: RoutKey): void {
    this.headerService.set(false);
    this.router.navigate([buildPath(key)]);
  }

  private setAvatarModel(model: IPlayerByUserProfileModel): void {
    const footballPosition = isDefined(model.Football.Position)
      ? firstOrDefault(this.enumService.enums.footballPositions,
        p => p.key == model.Football.Position)
      : null;

    this.avatarModel = {
      firstName: model.General.FirstName,
      lastName: model.General.LastName,
      title: footballPosition?.value,
      image: model.General.Photo ?? CommonConstants.DEFAULT_AVATAR_PATH
    };

    if (!hasItem(this.actions, this.profileAction)) {
      this.actions.unshift(this.profileAction);
    }

    this.avatarBadges = any(this.avatarBadges) ? [] : this.avatarBadges;
  }
}