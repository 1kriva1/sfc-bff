import { faSortAmountDown, faSortAmountUp } from "@fortawesome/free-solid-svg-icons";
import { CommonConstants, IPaginationModel, PaginationConstants, SortingDirection } from "ngx-sfc-common";
import { ITableColumnExtendedModel } from "ngx-sfc-components";
import { AvatarInputTeamsModalBodyTableColumn } from "./avatar-input-teams-modal-body-table-column.enum";
import { AvatarInputTeamsModalBodyTableLocalization } from "./avatar-input-teams-modal-body-table.localization";

export class AvatarInputTeamsModalBodyTableConstants {
    static PAGINATION_SIZE: number = 10;
    static PAGINATION_COUNT: number = 5;
    static PAGINATION: IPaginationModel = { page: PaginationConstants.DEFAULT_PAGE, size: this.PAGINATION_SIZE };
    static get COLUMNS(): ITableColumnExtendedModel[] {
        return [
            {
                name: CommonConstants.EMPTY_STRING,
                field: AvatarInputTeamsModalBodyTableColumn.Select,
                width: 15
            },
            {
                name: AvatarInputTeamsModalBodyTableLocalization.COLUMNS.RATING,
                field: AvatarInputTeamsModalBodyTableColumn.Rating,
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
                name: AvatarInputTeamsModalBodyTableLocalization.COLUMNS.TEAM,
                field: AvatarInputTeamsModalBodyTableColumn.Team,
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
                name: AvatarInputTeamsModalBodyTableLocalization.COLUMNS.DESCRIPTION,
                field: AvatarInputTeamsModalBodyTableColumn.Description,
                width: 20
            },
            {
                name: AvatarInputTeamsModalBodyTableLocalization.COLUMNS.STATUS,
                field: AvatarInputTeamsModalBodyTableColumn.Status,
                width: 25
            }
        ]
    };
}