import {
    faBaseball, faBasketball, faBowlingBall, faCirclePlus, faFootball, faFootballBall, faHockeyPuck,
    faMagnifyingGlass, faMountain, faPeopleCarryBox, faPersonBiking, faSortAmountDown, faSortAmountUp, faStrikethrough,
    faTableTennisPaddleBall, faVolleyball
} from "@fortawesome/free-solid-svg-icons";
import { PlayersTableColumn, PlayersTableLocalization } from "@share/components/players/search/table";
import { CommonConstants, SortingDirection } from "ngx-sfc-common";
import { ISideMenuModel, ITableColumnExtendedModel, SideMenuItemType } from "ngx-sfc-components";

export class SearchPageConstants {
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
    static SEARCH_DEBOUNCE_TIME: number = 1000;
    static PAGINATION_SIZE: number = 7;
    static PAGINATION_COUNT: number = 5;
    static COLUMNS: ITableColumnExtendedModel[] = [
        {
            name: PlayersTableLocalization.COLUMN.RAITING,
            field: PlayersTableColumn.Photo,
            width: 14,
            sorting: {
                enabled: true,
                active: true,
                direction: SortingDirection.Descending,
                icons: [
                    { direction: SortingDirection.Ascending, icon: faSortAmountUp },
                    { direction: SortingDirection.Descending, icon: faSortAmountDown }
                ]
            }
        },
        {
            name: PlayersTableLocalization.COLUMN.NAME,
            field: PlayersTableColumn.Name,
            sorting: {
                enabled: true,
                direction: SortingDirection.Ascending,
                icons: [
                    { direction: SortingDirection.Ascending, icon: faSortAmountUp },
                    { direction: SortingDirection.Descending, icon: faSortAmountDown }
                ]
            },
            width: 17
        },
        {
            name: PlayersTableLocalization.COLUMN.AVAILABLE,
            field: PlayersTableColumn.Available,
            width: 20
        },
        {
            name: PlayersTableLocalization.COLUMN.POSITION,
            field: PlayersTableColumn.Position,
            width: 11
        },
        {
            name: PlayersTableLocalization.COLUMN.PHYSICAL_CONDITION,
            field: PlayersTableColumn.PhysicalCondition,
            sorting: {
                enabled: true,
                direction: SortingDirection.Ascending,
                icons: [
                    { direction: SortingDirection.Ascending, icon: faSortAmountUp },
                    { direction: SortingDirection.Descending, icon: faSortAmountDown }
                ]
            },
            width: 14
        },
        {
            name: PlayersTableLocalization.COLUMN.SIZE,
            field: PlayersTableColumn.Size,
            sorting: {
                enabled: true,
                direction: SortingDirection.Ascending,
                icons: [
                    { direction: SortingDirection.Ascending, icon: faSortAmountUp },
                    { direction: SortingDirection.Descending, icon: faSortAmountDown }
                ]
            },
            width: 11
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: PlayersTableColumn.Actions,
            width: 13
        }
    ];
}