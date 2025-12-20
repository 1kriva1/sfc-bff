import { Directive, HostBinding, Input, OnInit } from "@angular/core";
import { CheckmarkType, empty, firstOrDefault, Position } from "ngx-sfc-common";
import { ITableColumnExtendedModel, ITableModel, TableColumnType, TableSelectService } from "ngx-sfc-components";

@Directive()
export class BaseTableContentComponent<TData, TViewModel> implements OnInit {

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

    /* End Inputs */

    /* Fields */

    public viewModel!: TViewModel;

    /* End Fields */

    /* Class Bindings */

    @HostBinding('class')
    protected status: string | null = null;

    /* End Class Bindings */

    /* Properties */

    public get selected(): boolean { return this.model.selected!; }

    public selectColumn: ITableColumnExtendedModel | empty = null;

    public actionsColumn: ITableColumnExtendedModel | empty = null;

    protected get data(): TData { return this.model.data; }

    /* End Properties */

    constructor(private selectedService: TableSelectService) { }

    ngOnInit(): void {
        this.selectColumn = this.getColumnByType(TableColumnType.Selectable);
        this.actionsColumn = this.getColumnByType(TableColumnType.Action);
    }

    public onSelect(): void {
        this.selectedService.selectSingle({ index: this.model.sequence, selected: !this.selected, args: this.data });
    }

    protected buildStatusClass(prefix: string, status: number): string {
        return `${prefix}-${status}`;
    }

    private getColumnByType(type: TableColumnType): ITableColumnExtendedModel | empty {
        return firstOrDefault(this.columns, column => column.type == type);
    }
}