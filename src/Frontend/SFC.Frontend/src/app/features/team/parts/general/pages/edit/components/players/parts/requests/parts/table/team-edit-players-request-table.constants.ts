import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { CommonConstants, IPaginationModel, PaginationConstants, SortingDirection } from "ngx-sfc-common";
import { ITableColumnExtendedModel } from "ngx-sfc-components";
import { TeamEditPlayersRequestTableColumn } from "./team-edit-players-request-table-column.enum";
import { TeamEditPlayersRequestTableLocalization } from "./team-edit-players-request-table.localization";

export class TeamEditPlayersRequestTableConstants {
    static PAGINATION_SIZE: number = 7;
    static PAGINATION_COUNT: number = 5;
    static PAGINATION: IPaginationModel = { page: PaginationConstants.DEFAULT_PAGE, size: this.PAGINATION_SIZE };
    static COLUMNS: ITableColumnExtendedModel[] = [
        {
            name: TeamEditPlayersRequestTableLocalization.COLUMNS.RATING,
            field: TeamEditPlayersRequestTableColumn.Rating,
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
            name: TeamEditPlayersRequestTableLocalization.COLUMNS.PLAYER,
            field: TeamEditPlayersRequestTableColumn.Player,
            sorting: {
                enabled: true,
                active: true,
                direction: SortingDirection.Ascending,
                icons: [
                    { direction: SortingDirection.Ascending, icon: faSortAmountUp },
                    { direction: SortingDirection.Descending, icon: faSortAmountDown }
                ]
            },
            width: 25
        },
        {
            name: TeamEditPlayersRequestTableLocalization.COLUMNS.POSITION,
            field: TeamEditPlayersRequestTableColumn.Position,
            width: 20
        },
        {
            name: TeamEditPlayersRequestTableLocalization.COLUMNS.STATUS,
            field: TeamEditPlayersRequestTableColumn.Status,
            width: 15
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: TeamEditPlayersRequestTableColumn.Actions,
            width: 15
        }
    ];
}