import { AfterViewInit, ChangeDetectorRef, Directive, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import { EnumService } from "@share/services";
import {
    any,
    deepClone,
    empty, ILoadContainerPredicateParameters,
    isDefined, ObservableModel, Position, ReloadService, Theme
} from "ngx-sfc-common";
import { ITableColumnExtendedModel, TableTemplate } from "ngx-sfc-components";
import { EMPTY, Observable, startWith, filter, distinctUntilChanged, pairwise, timer, of, debounce, tap, map } from "rxjs";
import { TableConstants } from "./table.constants";
import { TableLocalization } from "./table.localization";
import {
    combineWithReloadMultiple, IPredicateMapModel,
    IPredicateMapParametersModel,
    IPredicateMetadataModel, IPredicateModel, 
    mapPredicateModel, MapPredicateModelFunction
} from "@core/utils";

@Directive()
export abstract class BaseObservableTableComponent<TPredicateFormModel, TDataItemModel, TTableModel>
    implements OnInit, AfterViewInit {

    // ngx-sfc-common
    Position = Position;

    // ngx-sfc-components
    TableTemplate = TableTemplate;

    // component
    TableConstants = TableConstants;
    TableLocalization = TableLocalization;

    /* Fields */

    // filters form
    public predicateForm!: FormGroup;

    // predicate form
    private predicateFormModel: ObservableModel<TPredicateFormModel> = new ObservableModel<TPredicateFormModel>();

    // default predicate value model for startWith operator
    private defaultPredicateFormValue: TPredicateFormModel | empty = null;

    // predicate form previous value
    private predicatePreviousFormValue: TPredicateFormModel | empty = null;

    // table predicate
    public predicate$: Observable<ILoadContainerPredicateParameters | null> = EMPTY;

    // filters observable (for filter-tags component)
    public metadata$: Observable<IPredicateMetadataModel[]> = EMPTY;

    // function for mapping predicate form value to filters model
    protected mapPredicateModel: MapPredicateModelFunction = this.mapPredicateModelDefault;

    // list of events for trigering search
    protected reloadEvents: string[] = [];

    /* End Fields */

    /* Properties */

    public get showLoading(): boolean { return this.themeService.theme === Theme.Default; }

    /* End Properties */

    /* Abstract */

    public abstract columns: ITableColumnExtendedModel[];

    public abstract data$: Observable<TDataItemModel[]>;

    protected abstract buildPredicateForm(): FormGroup;

    protected abstract mapTableModel(item: TDataItemModel): TTableModel | TTableModel[];

    /* End Abstract */

    constructor(
        protected reloadService: ReloadService,
        protected enumService: EnumService,
        public themeService: ThemeService,
        private changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.predicateForm = this.buildPredicateForm();
        this.defaultPredicateFormValue = this.predicateForm.value;        
        this.initObservables();
    }

    ngAfterViewInit() {
        if (this.defaultPredicateFormValue) {
            this.predicateForm.patchValue(this.defaultPredicateFormValue, { emitEvent: true });
            this.changeDetector.detectChanges();
        }
    }

    private initObservables(): void {
        // predicate form value changes observable
        const predicateFormValue$: Observable<TPredicateFormModel> = this.predicateForm.valueChanges;

        // filters model observable
        const filters$: Observable<IPredicateModel<TPredicateFormModel>> = predicateFormValue$.pipe(
            startWith(this.predicateForm.value),
            filter(() => this.predicateForm.valid),
            distinctUntilChanged(),
            pairwise(),
            mapPredicateModel(this.mapPredicateModel, this.enumService.enums),
            debounce(this.filtersDebounceSelector)
        );

        // default predicate observable
        const predicate$: Observable<ILoadContainerPredicateParameters | null> = filters$.pipe(
            tap((model: IPredicateModel<TPredicateFormModel>) => this.postPredicateAction(model)),
            map((model: IPredicateModel<TPredicateFormModel>) => ({ value: model.value }))
        );

        this.metadata$ = filters$.pipe(map((model: IPredicateModel<TPredicateFormModel>) => model.metadata));
        this.predicate$ = any(this.reloadEvents) ? this.buildPredicateWithReloadEvents(predicate$) : predicate$;
        this.data$ = this.data$.pipe(
            tap(items => items.forEach(item => this.mapTableModel(item)))
        );
    }

    private buildPredicateWithReloadEvents(predicate$: Observable<ILoadContainerPredicateParameters | null>) {
        let reload: boolean = false;

        function _setReload(reload: boolean) { reload = reload };

        const value$: Observable<ILoadContainerPredicateParameters | null> = predicate$.pipe(tap(() => _setReload(false))),
            reload$: Observable<string[]> = this.reloadService.reload$.pipe(tap(() => _setReload(true)));

        const result$: Observable<ILoadContainerPredicateParameters | null> = combineWithReloadMultiple(value$, reload$, this.reloadEvents).pipe(
            map((parameters: ILoadContainerPredicateParameters | null) => ({ value: parameters?.value, reload: reload }))
        );

        return result$;
    }

    private filtersDebounceSelector(model: IPredicateModel<TPredicateFormModel>): Observable<any> {
        const debounceTime: number | empty = model.changedProperty?.debounce;
        return isDefined(debounceTime) ? timer(debounceTime!) : of(model.value);
    }

    private postPredicateAction(model: IPredicateModel<TPredicateFormModel>): void {
        this.predicatePreviousFormValue = deepClone(model.previous);
    }

    private mapPredicateModelDefault(parameters: IPredicateMapParametersModel): IPredicateMapModel {
        return { label: parameters.key, value: parameters.value, debounce: null };
    }
}