import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { CommonConstants, IPaginationModel, PaginationConstants, SortingDirection } from "ngx-sfc-common";
import { ITableColumnExtendedModel } from "ngx-sfc-components";
import { TeamEditSchemesTableColumn } from "./team-edit-schemes-table-column.enum";
import { TeamEditSchemesTableLocalization } from "./team-edit-schemes-table.localization";

export class TeamEditSchemesTableConstants {
    static PAGINATION_SIZE: number = 7;
    static PAGINATION_COUNT: number = 5;
    static PAGINATION: IPaginationModel = { page: PaginationConstants.DEFAULT_PAGE, size: this.PAGINATION_SIZE };
    static COLUMNS: ITableColumnExtendedModel[] = [
        {
            name: TeamEditSchemesTableLocalization.COLUMNS.NAME,
            field: TeamEditSchemesTableColumn.Name,
            sorting: {
                enabled: true,
                active: false,
                direction: SortingDirection.Ascending,
                icons: [
                    { direction: SortingDirection.Ascending, icon: faSortAmountUp },
                    { direction: SortingDirection.Descending, icon: faSortAmountDown }
                ]
            },
            width: 25
        },
        {
            name: TeamEditSchemesTableLocalization.COLUMNS.FORMATION,
            field: TeamEditSchemesTableColumn.Formation,
            width: 25
        },
        {
            name: TeamEditSchemesTableLocalization.COLUMNS.COMMENT,
            field: TeamEditSchemesTableColumn.Comment,
            width: 20
        },
        {
            name: TeamEditSchemesTableLocalization.COLUMNS.RATING,
            field: TeamEditSchemesTableColumn.Rating,
            sorting: {
                enabled: true,
                active: true,
                direction: SortingDirection.Ascending,
                icons: [
                    { direction: SortingDirection.Ascending, icon: faSortAmountUp },
                    { direction: SortingDirection.Descending, icon: faSortAmountDown }
                ]
            },
            width: 15
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: TeamEditSchemesTableColumn.Actions,
            width: 15
        }
    ];
}