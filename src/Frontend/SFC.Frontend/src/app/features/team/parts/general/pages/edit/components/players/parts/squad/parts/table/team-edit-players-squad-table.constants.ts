import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { CommonConstants, IPaginationModel, PaginationConstants, SortingDirection } from "ngx-sfc-common";
import { ITableColumnExtendedModel } from "ngx-sfc-components";
import { TeamEditPlayersSquadTableColumn } from "./team-edit-players-squad-table-column.enum";
import { TeamEditPlayersSquadTableLocalization } from "./team-edit-players-squad-table.localization";

export class TeamEditPlayersSquadTableConstants {
    static PAGINATION_SIZE: number = 7;
    static PAGINATION_COUNT: number = 5;
    static PAGINATION: IPaginationModel = { page: PaginationConstants.DEFAULT_PAGE, size: this.PAGINATION_SIZE };
    static COLUMNS: ITableColumnExtendedModel[] = [
        {
            name: TeamEditPlayersSquadTableLocalization.COLUMNS.RATING,
            field: TeamEditPlayersSquadTableColumn.Rating,
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
            name: TeamEditPlayersSquadTableLocalization.COLUMNS.PLAYER,
            field: TeamEditPlayersSquadTableColumn.Player,
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
            name: TeamEditPlayersSquadTableLocalization.COLUMNS.POSITION,
            field: TeamEditPlayersSquadTableColumn.Position,
            width: 20
        },
        {
            name: TeamEditPlayersSquadTableLocalization.COLUMNS.STATUS,
            field: TeamEditPlayersSquadTableColumn.Status,
            width: 15
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: TeamEditPlayersSquadTableColumn.Actions,
            width: 15
        }
    ];
}