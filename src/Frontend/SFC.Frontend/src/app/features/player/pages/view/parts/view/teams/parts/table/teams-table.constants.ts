import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { CommonConstants, IPaginationModel, PaginationConstants, SortingDirection } from "ngx-sfc-common";
import { ITableColumnExtendedModel } from "ngx-sfc-components";
import { TeamsTableColumn } from "./teams-table-column.enum";
import { TeamsTableLocalization } from "./teams-table.localization";

export class TeamsTableConstants {
    static PAGINATION_SIZE: number = 7;
    static PAGINATION_COUNT: number = 5;
    static PAGINATION: IPaginationModel = { page: PaginationConstants.DEFAULT_PAGE, size: this.PAGINATION_SIZE };
    static COLUMNS: ITableColumnExtendedModel[] = [
        {
            name: TeamsTableLocalization.COLUMN.LOGO,
            field: TeamsTableColumn.Logo
        },
        {
            name: TeamsTableLocalization.COLUMN.NAME,
            field: TeamsTableColumn.Name,
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
            name: TeamsTableLocalization.COLUMN.STATUS,
            field: TeamsTableColumn.Status
        },
        {
            name: TeamsTableLocalization.COLUMN.SCHEMA,
            field: TeamsTableColumn.Schema
        },
        {
            name: TeamsTableLocalization.COLUMN.COACH,
            field: TeamsTableColumn.Coach
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: TeamsTableColumn.Actions
        }
    ];
}