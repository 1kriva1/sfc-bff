import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { CommonConstants, SortingDirection } from "ngx-sfc-common";
import { ITableColumnExtendedModel } from "ngx-sfc-components";
import { PlayersTableColumn } from "./enums/players-table-column.enum";
import { PlayersTableLocalization } from "./players-table.localization";

export class PlayersTableConstants {
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
    static PAGINATION_SIZE: number = 7;
    static PAGINATION_COUNT: number = 5;
}