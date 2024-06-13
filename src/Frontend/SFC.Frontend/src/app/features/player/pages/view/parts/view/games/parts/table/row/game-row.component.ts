import { Component, HostBinding, Input } from "@angular/core";
import {
    faCalendar, faCircleCheck, faClock,
    faPeopleGroup, faUser, faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import { ComponentSize, convertDateToTimestamp, Position } from "ngx-sfc-common";
import { IDropdownMenuItemModel, ITableColumnExtendedModel } from "ngx-sfc-components";
import { GameRowConstants } from "./game-row.constants";
import { IGameRowModel } from "./game-row.model";
import { CommonConstants as ApplicationCommonConstants } from '@core/constants/common.constants';
import { GameRowLocalization } from "./game-row.localization";
import { GamesTableColumn } from "../games-table-column.enum";

@Component({
    selector: 'sfc-game-row',
    templateUrl: './game-row.component.html',
    styleUrls: ['./game-row.component.scss']
})
export class GameRowComponent {

    faCircleCheck = faCircleCheck;
    faCalendar = faCalendar;
    faClock = faClock;

    Position = Position;
    ComponentSize = ComponentSize;
    Localization = GameRowLocalization;
    ApplicationCommonConstants = ApplicationCommonConstants;
    GamesTableColumn = GamesTableColumn;

    convertDateToTimestamp = convertDateToTimestamp;

    @Input()
    columns: ITableColumnExtendedModel[] = [];

    @Input()
    model!: IGameRowModel;

    @HostBinding('class')
    protected get status(): string {
        return `${GameRowConstants.STATUS_CLASS_PART}${this.model.status.key}`;
    }

    public ACTION_ITEMS: IDropdownMenuItemModel[] = [
        {
            label: GameRowLocalization.COLUMN.ACTIONS.PLAY_REQUEST,
            icon: faUserPlus
        },
        {
            label: GameRowLocalization.COLUMN.ACTIONS.PLAY_TEAM_REQUEST,
            icon: faPeopleGroup,
            delimeter: true
        },
        {
            label: GameRowLocalization.COLUMN.ACTIONS.OPEN_GAME,
            icon: faUser
        }
    ];
}