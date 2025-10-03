import { faFutbol } from "@fortawesome/free-regular-svg-icons";
import {
    faBaseball, faBasketball, faBowlingBall, faCirclePlus, faFootball, faFootballBall, faG, faHockeyPuck,
    faMagnifyingGlass, faMountain, faPeopleCarryBox, faPersonBiking, faStar, faStrikethrough, faTableTennisPaddleBall, faVolleyball
} from "@fortawesome/free-solid-svg-icons";
import { ISideMenuModel, SideMenuItemType, ITabModel } from "ngx-sfc-components";
import { EditPagePart } from "./enums/edit-page-part.enum";
import { EditPageLocalization } from "./edit.page.localization";

export class EditPageConstants {
    static SIDE_MENU_MODEL: ISideMenuModel = {
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
      };
    static TABS: ITabModel[] = [
        {
            label: EditPageLocalization.TABS.GENERAL_LABEL,
            selected: true,
            data: EditPagePart.General,
            icon: faG
        },
        {
            label: EditPageLocalization.TABS.FOOTBALL_LABEL,
            data: EditPagePart.Football,
            icon: faFutbol
        },
        {
            label: EditPageLocalization.TABS.STATS_LABEL,
            data: EditPagePart.Stats,
            icon: faStar
        }
    ];
    static NEW_PROFILE_AVAILABLE_POINTS: number = 3;
    static MAX_PHOTO_SIZE: number = 5242880; // 5mb
    static RESOLVE_KEY = 'profile'; 
}