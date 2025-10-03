import { faSortAmountUp, faSortAmountDown } from "@fortawesome/free-solid-svg-icons";
import { CommonConstants, IPaginationModel, PaginationConstants, SortingDirection } from "ngx-sfc-common";
import { ITableColumnExtendedModel } from "ngx-sfc-components";
import { TeamCreatePlayersInviteTableColumn } from "./team-create-players-invite-table-column.enum";
import { TeamCreatePlayersInviteTableLocalization } from "./team-create-players-invite-table.localization";

export class TeamCreatePlayersInviteTableConstants {
    static PAGINATION_SIZE: number = 7;
    static PAGINATION_COUNT: number = 5;
    static PAGINATION: IPaginationModel = { page: PaginationConstants.DEFAULT_PAGE, size: this.PAGINATION_SIZE };
    static COLUMNS: ITableColumnExtendedModel[] = [
        {
            name: TeamCreatePlayersInviteTableLocalization.COLUMNS.RATING,
            field: TeamCreatePlayersInviteTableColumn.Rating,
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
            name: TeamCreatePlayersInviteTableLocalization.COLUMNS.PLAYER,
            field: TeamCreatePlayersInviteTableColumn.Player,
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
            name: TeamCreatePlayersInviteTableLocalization.COLUMNS.POSITION,
            field: TeamCreatePlayersInviteTableColumn.Position,
            width: 20
        },
        {
            name: TeamCreatePlayersInviteTableLocalization.COLUMNS.STATUS,
            field: TeamCreatePlayersInviteTableColumn.Status,
            width: 15
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: TeamCreatePlayersInviteTableColumn.Actions,
            width: 15
        }
    ];
}