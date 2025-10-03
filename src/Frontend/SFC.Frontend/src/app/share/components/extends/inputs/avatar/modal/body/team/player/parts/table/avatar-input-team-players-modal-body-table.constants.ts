import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { CommonConstants, IPaginationModel, PaginationConstants, SortingDirection } from "ngx-sfc-common";
import { ITableColumnExtendedModel } from "ngx-sfc-components";
import { AvatarInputTeamPlayersModalBodyTableColumn } from "./avatar-input-team-players-modal-body-table-column.enum";
import { AvatarInputTeamPlayersModalBodyTableLocalization } from "./avatar-input-team-players-modal-body-table.localization";

export class AvatarInputTeamPlayersModalBodyTableConstants {
    static PAGINATION_SIZE: number = 10;
    static PAGINATION_COUNT: number = 5;
    static PAGINATION: IPaginationModel = { page: PaginationConstants.DEFAULT_PAGE, size: this.PAGINATION_SIZE };
    static get COLUMNS(): ITableColumnExtendedModel[] {
        return [
            {
                name: CommonConstants.EMPTY_STRING,
                field: AvatarInputTeamPlayersModalBodyTableColumn.Select,
                width: 10
            },
            {
                name: AvatarInputTeamPlayersModalBodyTableLocalization.COLUMNS.RATING,
                field: AvatarInputTeamPlayersModalBodyTableColumn.Rating,
                sorting: {
                    enabled: true,
                    active: false,
                    direction: SortingDirection.Ascending,
                    icons: [
                        { direction: SortingDirection.Ascending, icon: faSortAmountUp },
                        { direction: SortingDirection.Descending, icon: faSortAmountDown }
                    ]
                },
                width: 15
            },
            {
                name: AvatarInputTeamPlayersModalBodyTableLocalization.COLUMNS.PLAYER,
                field: AvatarInputTeamPlayersModalBodyTableColumn.Player,
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
                name: AvatarInputTeamPlayersModalBodyTableLocalization.COLUMNS.POSITION,
                field: AvatarInputTeamPlayersModalBodyTableColumn.Position,
                width: 15
            },
            {
                name: AvatarInputTeamPlayersModalBodyTableLocalization.COLUMNS.STATUS,
                field: AvatarInputTeamPlayersModalBodyTableColumn.Status,
                width: 15
            },
            {
                name: AvatarInputTeamPlayersModalBodyTableLocalization.COLUMNS.PHYSICAL_CONDITION,
                field: AvatarInputTeamPlayersModalBodyTableColumn.PhysicalCondition,
                width: 20
            }
        ]
    };
}