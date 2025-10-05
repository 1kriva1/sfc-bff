import { Component, HostBinding, HostListener, Input, OnInit } from "@angular/core";
import { Position, getAge, CheckmarkType, UIClass, stopAndPreventPropagation } from "ngx-sfc-common";
import { ITableColumnExtendedModel, ITableModel, TableSelectService } from "ngx-sfc-components";
import { getEnum } from '@core/utils';
import { getRaiting } from "@share/utils/stats";
import { EnumService } from "@share/services";
import { getPhoto } from "@share/utils/features/player";
import { AvatarInputPlayersModalBodyTableRowConstants } from "./avatar-input-players-modal-body-table-row.constants";
import { IAvatarInputPlayersModalBodyTableRowModel } from "./avatar-input-players-modal-body-table-row.model";
import { IPlayersTableModel } from "@share/components/features/player";
import { AvatarInputPlayersModalBodyTableColumn } from "../../../../player/parts/table/avatar-input-players-modal-body-table-column.enum";

@Component({
    selector: 'sfc-avatar-input-players-modal-body-table-row',
    templateUrl: './avatar-input-players-modal-body-table-row.component.html',
    styleUrls: ['./avatar-input-players-modal-body-table-row.component.scss']
})
export class AvatarInputPlayersModalBodyTableRowComponent implements OnInit {

    // ngx-sfc-common
    Position = Position;
    CheckmarkType = CheckmarkType;

    // component
    Constants = AvatarInputPlayersModalBodyTableRowConstants;
    Column = AvatarInputPlayersModalBodyTableColumn;

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

    public viewModel!: IAvatarInputPlayersModalBodyTableRowModel;

    /* End Fields */

    /* Class Bindings */

    @HostBinding('class')
    protected get _status(): string {
        return `${AvatarInputPlayersModalBodyTableRowConstants.STATUS_CLASS_PART}-${this.player?.football.position}`;
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

    public get player(): IPlayersTableModel { return this.model.data }

    public get selected(): boolean { return this.model.selected || this.player.id == this.value; }

    /* End Properties */

    constructor(private selectedService: TableSelectService, private enumService: EnumService) { }

    ngOnInit(): void {
        this.viewModel = {
            position: getEnum(this.player.football.position, this.enumService.enums.footballPositions),
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