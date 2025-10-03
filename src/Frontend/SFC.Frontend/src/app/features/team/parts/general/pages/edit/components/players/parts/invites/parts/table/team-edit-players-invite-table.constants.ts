import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { CommonConstants, IPaginationModel, PaginationConstants, SortingDirection } from "ngx-sfc-common";
import { ITableColumnExtendedModel } from "ngx-sfc-components";
import { TeamEditPlayersInviteTableColumn } from "./team-edit-players-invite-table-column.enum";
import { TeamEditPlayersInviteTableLocalization } from "./team-edit-players-invite-table.localization";

export class TeamCreatePlayersInviteTableConstants {
    static PAGINATION_SIZE: number = 7;
    static PAGINATION_COUNT: number = 5;
    static PAGINATION: IPaginationModel = { page: PaginationConstants.DEFAULT_PAGE, size: this.PAGINATION_SIZE };
    static COLUMNS: ITableColumnExtendedModel[] = [
        {
            name: TeamEditPlayersInviteTableLocalization.COLUMNS.RATING,
            field: TeamEditPlayersInviteTableColumn.Rating,
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
            name: TeamEditPlayersInviteTableLocalization.COLUMNS.PLAYER,
            field: TeamEditPlayersInviteTableColumn.Player,
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
            name: TeamEditPlayersInviteTableLocalization.COLUMNS.POSITION,
            field: TeamEditPlayersInviteTableColumn.Position,
            width: 20
        },
        {
            name: TeamEditPlayersInviteTableLocalization.COLUMNS.STATUS,
            field: TeamEditPlayersInviteTableColumn.Status,
            width: 15
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: TeamEditPlayersInviteTableColumn.Actions,
            width: 15
        }
    ];
}