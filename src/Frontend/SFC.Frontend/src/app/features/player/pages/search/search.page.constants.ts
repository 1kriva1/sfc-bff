import {
    faBaseball, faBasketball, faBowlingBall, faCirclePlus, faFootball, faFootballBall, faHockeyPuck,
    faMagnifyingGlass, faMountain, faPeopleCarryBox, faPersonBiking, faStrikethrough,
    faTableTennisPaddleBall, faVolleyball
} from "@fortawesome/free-solid-svg-icons";
import { ISideMenuModel, SideMenuItemType } from "ngx-sfc-components";

export class SearchPageConstants {
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
}