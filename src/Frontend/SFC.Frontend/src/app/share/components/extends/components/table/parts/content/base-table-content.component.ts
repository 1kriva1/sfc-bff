import { Directive, HostBinding, HostListener, Input, OnInit } from "@angular/core";
import { CheckmarkType, empty, firstOrDefault, Position, stopAndPreventPropagation, UIClass } from "ngx-sfc-common";
import { ITableColumnExtendedModel, ITableModel, TableColumnType, TableSelectService } from "ngx-sfc-components";

@Directive()
export abstract class BaseTableContentComponent<TData, TViewModel> // TData extends IIdModel<any>
    implements OnInit {

    // ngx-sfc-common
    CheckmarkType = CheckmarkType;
    Position = Position;

    /* Inputs */

    @Input()
    value: number | null = null;

    @Input()
    model!: ITableModel;

    @Input()
    columns: ITableColumnExtendedModel[] = [];

    @Input()
    @HostBinding('class.' + UIClass.Pointer)
    selectOnClick: boolean = false;

    /* End Inputs */

    /* Fields */

    public viewModel!: TViewModel;

    /* End Fields */

    /* Class Bindings */

    @HostBinding('class')
    protected statusClass: string | null = null;

    /* End Class Bindings */

    /* Properties */

    public get selected(): boolean { return this.model.selected! || this.id == this.value; }

    public get sequence(): number | null { return this.sequenceColumn ? this.model.sequence : null }

    public selectColumn: ITableColumnExtendedModel | empty = null;

    public actionsColumn: ITableColumnExtendedModel | empty = null;

    public sequenceColumn: ITableColumnExtendedModel | empty = null;

    protected get data(): TData { return this.model.data; }

    /* End Properties */

    protected abstract get id(): number;

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        if (this.selectOnClick) {
            this.onSelect(event);
        }
    }

    constructor(private selectedService: TableSelectService) { }

    ngOnInit(): void {
        this.sequenceColumn = this.getColumnByType(TableColumnType.Sequence);
        this.selectColumn = this.getColumnByType(TableColumnType.Selectable);
        this.actionsColumn = this.getColumnByType(TableColumnType.Action);
    }

    public onSelect(event?: MouseEvent | empty): void {
        if (event) {
            stopAndPreventPropagation(event);
        }

        this.selectedService.selectSingle({ index: this.model.sequence, selected: !this.selected, args: this.data });
    }

    protected buildStatusClass(prefix: string, status: number): string {
        return `${prefix}-${status}`;
    }

    private getColumnByType(type: TableColumnType): ITableColumnExtendedModel | empty {
        return firstOrDefault(this.columns, column => column.type == type);
    }
}