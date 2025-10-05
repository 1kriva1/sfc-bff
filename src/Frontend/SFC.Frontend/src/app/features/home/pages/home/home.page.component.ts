import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import {
  faFootball, faMagnifyingGlass, faCirclePlus, faMountain, faBasketball, faTableTennisPaddleBall, faVolleyball,
  faStrikethrough, faFootballBall, faPeopleCarryBox, faBaseball, faBowlingBall, faHockeyPuck, faPersonBiking,
} from '@fortawesome/free-solid-svg-icons';
import { ComponentSize } from 'ngx-sfc-common';
import { ISideMenuItemModel, ISideMenuModel, SideMenuItemType } from 'ngx-sfc-components';
import { Observable } from 'rxjs';
import { HeaderService } from '@core/components';
import { buildTitle } from '@core/utils';
import { HomePageLocalization } from './home.page.localization';
import { IdentityService } from '@share/services';

@Component({
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit {

  faMoon = faMoon;
  faSun = faSun;

  ComponentSize = ComponentSize;
  Localization = HomePageLocalization;

  public MENU_MODEL: ISideMenuModel = {
    items: [
      {
        id:'',
        label: 'Football',
        icon: faFootball,
        type: SideMenuItemType.Item,
        active: false,
        items: [
          {
            id:'',
            label: 'Find',
            icon: faMagnifyingGlass,
            type: SideMenuItemType.Item,
            active: false
          },
          {
            id:'',
            label: 'Create',
            icon: faCirclePlus,
            type: SideMenuItemType.Item,
            active: false,
          },
          {
            id:'',
            label: 'View',
            icon: faMountain,
            type: SideMenuItemType.Item,
            active: false,
          }
        ]
      },
      {
        id:'',
        label: 'Basketball',
        icon: faBasketball,
        type: SideMenuItemType.Item,
        active: false
      },
      {
        id:'',
        label: 'Tennis',
        icon: faTableTennisPaddleBall,
        type: SideMenuItemType.Item,
        active: false,
        items: [
          {
            id:'',
            label: 'Find',
            icon: faMagnifyingGlass,
            type: SideMenuItemType.Item,
            active: false
          },
          {
            id:'',
            label: 'Create',
            icon: faCirclePlus,
            type: SideMenuItemType.Item,
            active: false,
          },
          {
            id:'',
            label: 'View',
            icon: faMountain,
            type: SideMenuItemType.Item,
            active: false,
          }
        ]
      },
      {
        id:'',
        label: 'Volleyball',
        icon: faVolleyball,
        type: SideMenuItemType.Item,
        active: false
      },
      {
        id:'',
        label: 'Cricket',
        icon: faStrikethrough,
        type: SideMenuItemType.Item,
        active: false
      },
      {
        id:'',
        label: 'Rugby',
        icon: faFootballBall,
        type: SideMenuItemType.Item,
        active: false
      },
      {
        id:'',
        label: 'Boxing',
        icon: faPeopleCarryBox,
        type: SideMenuItemType.Item,
        active: false
      },
      {
        id:'',
        label: 'Categories',
        type: SideMenuItemType.Title,
        icon: undefined,
        active: false
      },
      {
        id:'',
        label: 'Baseball',
        icon: faBaseball,
        type: SideMenuItemType.Item,
        active: false
      },
      {
        id:'',
        label: 'Bowling',
        icon: faBowlingBall,
        type: SideMenuItemType.Item,
        active: false
      },
      {
        id:'',
        label: 'Hockey',
        icon: faHockeyPuck,
        type: SideMenuItemType.Item,
        active: false
      },
      {
        id:'',
        label: 'Biking',
        icon: faPersonBiking,
        type: SideMenuItemType.Item,
        active: false
      }
    ],
    open: false
  }

  public userName$: Observable<string | undefined> = this.identityService.getUserName();

  constructor(
    public identityService: IdentityService,
    public headerService: HeaderService,
    private titleService: Title,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(buildTitle(this.Localization.PAGE_TITLE));
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  public onSelect(item: ISideMenuItemModel): void {
    console.log(item.label);
  }
}
