import {
    faFootball, faMagnifyingGlass, faCirclePlus,
    faMountain, faBasketball, faTableTennisPaddleBall,
    faVolleyball, faStrikethrough, faFootballBall,
    faPeopleCarryBox, faBaseball, faBowlingBall,
    faHockeyPuck, faPersonBiking
} from "@fortawesome/free-solid-svg-icons";
import { CommonConstants } from "ngx-sfc-common";
import { ISideMenuModel, SideMenuItemType } from "ngx-sfc-components";

export class BaseEditPageConstants {
    static SIDE_MENU_MODEL: ISideMenuModel = {
        items: [
            {
                label: 'Football',
                icon: faFootball,
                type: SideMenuItemType.Item,
                active: false,
                items: [
                    {
                        label: 'Find',
                        icon: faMagnifyingGlass,
                        type: SideMenuItemType.Item,
                        active: false
                    },
                    {
                        label: 'Create',
                        icon: faCirclePlus,
                        type: SideMenuItemType.Item,
                        active: false,
                    },
                    {
                        label: 'View',
                        icon: faMountain,
                        type: SideMenuItemType.Item,
                        active: false,
                    }
                ]
            },
            {
                label: 'Basketball',
                icon: faBasketball,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Tennis',
                icon: faTableTennisPaddleBall,
                type: SideMenuItemType.Item,
                active: false,
                items: [
                    {
                        label: 'Find',
                        icon: faMagnifyingGlass,
                        type: SideMenuItemType.Item,
                        active: false
                    },
                    {
                        label: 'Create',
                        icon: faCirclePlus,
                        type: SideMenuItemType.Item,
                        active: false,
                    },
                    {
                        label: 'View',
                        icon: faMountain,
                        type: SideMenuItemType.Item,
                        active: false,
                    }
                ]
            },
            {
                label: 'Volleyball',
                icon: faVolleyball,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Cricket',
                icon: faStrikethrough,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Rugby',
                icon: faFootballBall,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Boxing',
                icon: faPeopleCarryBox,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Categories',
                type: SideMenuItemType.Title,
                icon: undefined,
                active: false
            },
            {
                label: 'Baseball',
                icon: faBaseball,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Bowling',
                icon: faBowlingBall,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Hockey',
                icon: faHockeyPuck,
                type: SideMenuItemType.Item,
                active: false
            },
            {
                label: 'Biking',
                icon: faPersonBiking
                ,
                type: SideMenuItemType.Item,
                active: false
            }
        ],
        open: false
    };
    static RESOLVE_KEY = 'team';
    static MAX_PHOTO_SIZE: number = 5242880; // 5mb
    static DEFAULT_FORM_VALUE: any = {
        logo: null,
        information: {
            availability: [],
            financial: {
                freePlay: null,
                hasManiches: null,
                shirts: []
            },
            general: {
                city: CommonConstants.EMPTY_STRING,
                name: CommonConstants.EMPTY_STRING,
                description: null,
                stadium: null,
                tags: null
            }
        }
    };
}