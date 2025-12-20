import { HttpResponse } from "@angular/common/http";
import { AfterViewInit, ChangeDetectorRef, Directive, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseErrorResponse, BaseListResponse, BasePaginationRequest } from "@core/models";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import { EnumService, IEnumsModel } from "@share/services";
import {
    any,
    deepClone,
    empty, ILoadContainerLoaderResultModel, ILoadContainerParameters, ILoadContainerPredicateParameters,
    IPaginationModel, isDefined, ISortingModel, LoaderFunction, ObservableModel, Position, ReloadService, Theme
} from "ngx-sfc-common";
import { TableTemplate } from "ngx-sfc-components";
import { EMPTY, Observable, startWith, filter, distinctUntilChanged, pairwise, timer, of, debounce, tap, map, catchError } from "rxjs";
import { TableConstants } from "./table.constants";
import { TableLocalization } from "./table.localization";
import {
    catchPaginationError, combineWithReloadMultiple, IPredicateMapModel,
    IPredicateMetadataModel,
    IPredicateModel, mapPaginationResponse, mapPredicateModel,
    MapPredicateModelFunction
} from "@core/utils";
import { NotificationService } from "@core/services";

@Directive()
export abstract class BaseTableComponent<TPredicateFormModel, TRequestServiceFiltersModel, TResponseServiceItemModel, TTableModel>
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

    // table loader
    public loader: LoaderFunction = (parameters: ILoadContainerParameters) => this.load(parameters);

    // list of events for trigering search
    protected reloadEvents: string[] = [];

    /* End Fields */

    /* Properties */

    public get showLoading(): boolean { return this.themeService.theme === Theme.Default; }

    /* End Properties */

    /* Abstract */

    protected abstract buildPredicateForm(): FormGroup;

    protected abstract buildPaginationRequest(model: TPredicateFormModel, pagination: IPaginationModel, sorting: ISortingModel | empty): BasePaginationRequest<TRequestServiceFiltersModel>;

    protected abstract sendPaginationRequest(request: BasePaginationRequest<TRequestServiceFiltersModel>): Observable<HttpResponse<BaseListResponse<TResponseServiceItemModel>>>;

    protected abstract mapTableModel(item: TResponseServiceItemModel): TTableModel;

    /* End Abstract */

    constructor(
        protected reloadService: ReloadService,
        protected enumService: EnumService,
        private themeService: ThemeService,
        private notificationService: NotificationService,
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

    private load(parameters: ILoadContainerParameters): Observable<ILoadContainerLoaderResultModel<TTableModel>> {
        const pagination: IPaginationModel = { page: parameters.page, size: parameters.size },
            request: BasePaginationRequest<TRequestServiceFiltersModel> = this.buildPaginationRequest(
                parameters.params.value,
                pagination,
                parameters.sorting);

        return this.sendPaginationRequest(request)
            .pipe(
                mapPaginationResponse<TResponseServiceItemModel, TTableModel>((item: TResponseServiceItemModel) => this.mapTableModel(item)),
                catchError((error: BaseErrorResponse) => catchPaginationError<TTableModel>(error, this.notificationService))
            );
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

    private mapPredicateModelDefault(key: string, value: any, _enums?: IEnumsModel | empty): IPredicateMapModel {
        return { label: key, value: value, debounce: null };
    }
}