import { Component, HostBinding, HostListener, Input, OnInit } from "@angular/core";
import { Position, getAge, CheckmarkType, UIClass, stopAndPreventPropagation } from "ngx-sfc-common";
import { ITableColumnExtendedModel, ITableModel, TableSelectService } from "ngx-sfc-components";
import { getEnum } from '@core/utils';
import { getRaiting } from "@share/utils/stats";
import { EnumService } from "@share/services";
import { getPhoto } from "@share/utils/features/player";
import { AvatarInputTeamPlayersModalBodyTableRowConstants } from "./avatar-input-team-players-modal-body-table-row.constants";
import { IAvatarInputTeamPlayersModalBodyTableRowModel } from "./avatar-input-team-players-modal-body-table-row.model";
import { IPlayersTableModel } from "@share/components/features/player";
import { AvatarInputTeamPlayersModalBodyTableColumn } from "../avatar-input-team-players-modal-body-table-column.enum";

@Component({
    selector: 'sfc-avatar-input-team-players-modal-body-table-row',
    templateUrl: './avatar-input-team-players-modal-body-table-row.component.html',
    styleUrls: ['./avatar-input-team-players-modal-body-table-row.component.scss']
})
export class AvatarInputTeamPlayersModalBodyTableRowComponent implements OnInit {

    // ngx-sfc-common
    Position = Position;
    CheckmarkType = CheckmarkType;

    // component
    Constants = AvatarInputTeamPlayersModalBodyTableRowConstants;
    Column = AvatarInputTeamPlayersModalBodyTableColumn;

    /* Inputs */

    @Input()
    value: number | null = null;

    @Input()
    model!: ITableModel;

    @Input()
    columns: ITableColumnExtendedModel[] = [];

    @Input()
    selectOnClick: boolean = false;

    /* End Inputs */

    /* Fields */

    public viewModel!: IAvatarInputTeamPlayersModalBodyTableRowModel;

    /* End Fields */

    /* Class Bindings */

    @HostBinding('class')
    protected get _status(): string {
        return `${AvatarInputTeamPlayersModalBodyTableRowConstants.STATUS_CLASS_PART}-${this.model.data.status}`;
    }

    @HostBinding(`class.${UIClass.Pointer}`)
    get pointer(): boolean { return this.selectOnClick; }

    /* End Class Bindings */

    /* Host listener */

    @HostListener('click')
    onClick(event: Event): void {
        if (this.selectOnClick) this.onSelect(event);
    }

    /* End Host listener */

    /* Properties */

    public get player(): IPlayersTableModel { return this.model.data.player }

    public get selected(): boolean { return this.model.selected || this.player.id == this.value; }

    /* End Properties */

    constructor(private selectedService: TableSelectService, private enumService: EnumService) { }

    ngOnInit(): void {
        this.viewModel = {
            position: getEnum(this.player.football.position, this.enumService.enums.footballPositions),
            status: getEnum(this.model.data.status, this.enumService.enums.teamPlayerStatuses)!,
            physicalCondition: this.player.football.physicalCondition || 0,
            player: {
                age: getAge(this.player.general.birthday),
                city: this.player.general.city,
                raiting: getRaiting(this.player.stats),
                firstName: this.player.general.firstName,
                lastName: this.player.general.lastName,
                photo: getPhoto(this.player.general.photo)
            }
        };
    }

    public onSelect(event: Event): void {
        if (this.selectOnClick && event) {
            stopAndPreventPropagation(event);
        }

        this.selectedService.selectSingle({ index: this.model.sequence, selected: !this.selected, args: this.player });
    }
}