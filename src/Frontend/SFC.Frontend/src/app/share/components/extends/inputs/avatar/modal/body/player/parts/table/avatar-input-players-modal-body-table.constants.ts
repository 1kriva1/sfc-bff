import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { CommonConstants, IPaginationModel, PaginationConstants, SortingDirection } from "ngx-sfc-common";
import { ITableColumnExtendedModel } from "ngx-sfc-components";
import { AvatarInputPlayersModalBodyTableColumn } from "./avatar-input-players-modal-body-table-column.enum";
import { AvatarInputPlayersModalBodyTableLocalization } from "./avatar-input-players-modal-body-table.localization";

export class AvatarInputPlayersModalBodyTableConstants {
    static PAGINATION_SIZE: number = 10;
    static PAGINATION_COUNT: number = 5;
    static PAGINATION: IPaginationModel = { page: PaginationConstants.DEFAULT_PAGE, size: this.PAGINATION_SIZE };
    static get COLUMNS(): ITableColumnExtendedModel[] {
        return [
            {
                name: CommonConstants.EMPTY_STRING,
                field: AvatarInputPlayersModalBodyTableColumn.Select,
                width: 15
            },
            {
                name: AvatarInputPlayersModalBodyTableLocalization.COLUMNS.RATING,
                field: AvatarInputPlayersModalBodyTableColumn.Rating,
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
                name: AvatarInputPlayersModalBodyTableLocalization.COLUMNS.PLAYER,
                field: AvatarInputPlayersModalBodyTableColumn.Player,
                sorting: {
                    enabled: true,
                    active: true,
                    direction: SortingDirection.Ascending,
                    icons: [
                        { direction: SortingDirection.Ascending, icon: faSortAmountUp },
                        { direction: SortingDirection.Descending, icon: faSortAmountDown }
                    ]
                },
                width: 30
            },
            {
                name: AvatarInputPlayersModalBodyTableLocalization.COLUMNS.POSITION,
                field: AvatarInputPlayersModalBodyTableColumn.Position,
                width: 15
            },
            {
                name: AvatarInputPlayersModalBodyTableLocalization.COLUMNS.PHYSICAL_CONDITION,
                field: AvatarInputPlayersModalBodyTableColumn.PhysicalCondition,
                width: 25
            }
        ]
    };
}