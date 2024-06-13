import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { CommonConstants, IPaginationModel, PaginationConstants, SortingDirection } from "ngx-sfc-common";
import { ITableColumnExtendedModel } from "ngx-sfc-components";
import { GamesTableColumn } from "./games-table-column.enum";
import { GamesTableLocalization } from "./games-table.localization";

export class GamesTableConstants {
    static PAGINATION_SIZE: number = 7;
    static PAGINATION_COUNT: number = 5;
    static PAGINATION: IPaginationModel = { page: PaginationConstants.DEFAULT_PAGE, size: this.PAGINATION_SIZE };
    static COLUMNS: ITableColumnExtendedModel[] = [
        {
            name: GamesTableLocalization.COLUMN.LOCATION,
            field: GamesTableColumn.Location,
            width: 20
        },
        {
            name: GamesTableLocalization.COLUMN.NAME,
            field: GamesTableColumn.Name,
            width: 14,
            sorting: {
                enabled: true,
                active: false,
                direction: SortingDirection.Descending,
                icons: [
                    { direction: SortingDirection.Ascending, icon: faSortAmountUp },
                    { direction: SortingDirection.Descending, icon: faSortAmountDown }
                ]
            }
        },
        {
            name: GamesTableLocalization.COLUMN.STATUS,
            width: 14,
            field: GamesTableColumn.Status,
            sorting: {
                enabled: true,
                active: false,
                direction: SortingDirection.Descending,
                icons: [
                    { direction: SortingDirection.Ascending, icon: faSortAmountUp },
                    { direction: SortingDirection.Descending, icon: faSortAmountDown }
                ]
            }
        },
        {
            name: GamesTableLocalization.COLUMN.DATE,
            field: GamesTableColumn.Date,
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
            name: GamesTableLocalization.COLUMN.FREE_PLAY,
            width: 10,
            field: GamesTableColumn.FreePlay
        },
        {
            name: GamesTableLocalization.COLUMN.RESULT,
            width: 14,
            field: GamesTableColumn.Result
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: GamesTableColumn.Actions,
            width: 14
        }
    ];
}