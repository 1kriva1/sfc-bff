import { Component, HostBinding, Input } from "@angular/core";
import {
    faPeopleGroup,
    faQuestionCircle, faUser, faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import { ComponentSize, Position } from "ngx-sfc-common";
import { IDropdownMenuItemModel, ITableColumnExtendedModel } from "ngx-sfc-components";
import { ITeamRowModel } from "./team-row.model";
import { TeamRowConstants } from "./team-row.constants";
import { TeamRowLocalization } from "./team-row.localization";
import { TeamsTableColumn } from "../teams-table-column.enum";
import { CommonConstants as ApplicationCommonConstants } from '@core/constants/common.constants';

@Component({
    selector: 'sfc-team-row',
    templateUrl: './team-row.component.html',
    styleUrls: ['./team-row.component.scss']
})
export class TeamRowComponent {

    faQuestionCircle = faQuestionCircle;

    Position = Position;
    ComponentSize = ComponentSize;
    ApplicationCommonConstants = ApplicationCommonConstants;
    TeamsTableColumn = TeamsTableColumn;
    Localization = TeamRowLocalization;
    Constants = TeamRowConstants;

    @Input()
    columns: ITableColumnExtendedModel[] = [];

    @Input()
    model!: ITeamRowModel;

    @HostBinding('class')
    protected get status(): string {
        return `${TeamRowConstants.STATUS_CLASS_PART}${this.model.status.key}`;
    }

    public ACTION_ITEMS: IDropdownMenuItemModel[] = [
        {
            label: TeamRowLocalization.COLUMN.ACTIONS.JOIN_REQUEST,
            icon: faUserPlus
        },
        {
            label: TeamRowLocalization.COLUMN.ACTIONS.PLAY_REQUEST,
            icon: faPeopleGroup,
            delimeter: true
        },
        {
            label: TeamRowLocalization.COLUMN.ACTIONS.OPEN_TEAM,
            icon: faUser
        }
    ];
}