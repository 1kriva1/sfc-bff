import { Directive, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { HttpResponse } from "@angular/common/http";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
    any,
    ButtonType, empty, IDefaultModalFooterModel, IDefaultModalHeaderModel,
    ILoadContainerLoaderResultModel, ILoadContainerParameters, ILoadContainerPredicateParameters,
    IPaginationModel, isEqual, ISortingModel, ModalService, ModalTemplate, ObservableModel, Position, ReloadService, Theme
} from "ngx-sfc-common";
import { TableTemplate } from "ngx-sfc-components";
import {
    map, Observable, of, catchError, filter, timer, switchMap,
    debounce, distinctUntilChanged, tap, startWith
} from 'rxjs';
import { BaseErrorResponse, BaseListResponse, BasePaginationRequest } from "@core/models";
import { NotificationService } from "@core/services";
import { mapPaginationResponse } from "@core/utils";
import { catchPaginationError } from "@core/utils";
import { SearchLocalization } from "./search.localization";
import { SearchConstants } from "./search.constants";
import { combineWithReloadMultiple } from "@core/utils";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";

@Directive()
export abstract class SearchComponent
    <FormFilterModel, // form model for filtering
    RequestFilterModel, // API request model for filtering
    ResponseItemModel, // API response list item model
    TableItemModel> // Table row model
    implements OnInit {

    // ngx-sfc-common
    ButtonType = ButtonType;
    ModalTemplate = ModalTemplate;
    Position = Position;

    // ngx-sfc-components
    TableTemplate = TableTemplate;

    // component
    SearchConstants = SearchConstants;
    SearchLocalization = SearchLocalization;

    /* Filters */

    public form!: FormGroup;
    private filterModel: ObservableModel<FormFilterModel> = new ObservableModel<FormFilterModel>();
    private previousSearchValue!: FormFilterModel;

    public get modalHeaderModel(): IDefaultModalHeaderModel {
        return {
            showCloseIcon: true,
            text: SearchLocalization.MODAL.HEADER.TITLE,
            icon: faSearch
        };
    }

    public get modalFooterModel(): IDefaultModalFooterModel {
        return {
            applyButton: true,
            cancelButton: true,
            applyButtonText: SearchLocalization.MODAL.FOOTER.BUTTON.APPLY,
            cancelButtonText: SearchLocalization.MODAL.FOOTER.BUTTON.CANCEL,
            onApply: () => this.onApply(),
            onCancel: () => this.onCancel()
        }
    }

    /* End Filters */

    /* Table */

    public predicate$!: Observable<ILoadContainerPredicateParameters | null>;

    protected initialized: boolean = false;

    public get showLoading(): boolean { return this.themeService.theme === Theme.Default; }

    public loader: (parameters: ILoadContainerParameters) => Observable<ILoadContainerLoaderResultModel<TableItemModel>>
        = (parameters: ILoadContainerParameters) => this.load(parameters);

    /* End Table */

    /* Abstract */

    protected abstract buildFilterForm(): FormGroup;

    protected abstract buildRequest(model: FormFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<RequestFilterModel>;

    protected abstract search(request: BasePaginationRequest<RequestFilterModel>, loading: boolean)
        : Observable<HttpResponse<BaseListResponse<ResponseItemModel>>>;

    protected abstract map(item: ResponseItemModel): TableItemModel;

    protected defaultFilterModel: FormFilterModel = SearchConstants.DEFAULT_FILTER_MODEL;

    protected actions: string[] = [];

    /* End Abstract */

    constructor(
        protected modalService: ModalService,
        private themeService: ThemeService,
        private notificationService: NotificationService,
        protected reloadService: ReloadService
    ) { }

    ngOnInit(): void {
        this.form = this.buildFilterForm();
        this.initObservables();
    }

    protected initObservables(): void {
        let predicate$: Observable<ILoadContainerPredicateParameters | null> = this.form.valueChanges.pipe(
            startWith(this.defaultFilterModel),
            filter(() => this.form.valid),
            switchMap((value: FormFilterModel) => (this.modalService.isOpen ? this.filterModel.value$ : of(value))),
            debounce((value: FormFilterModel) => (this.initialized ? timer(SearchConstants.SEARCH_DEBOUNCE_TIME) : of(value))),
            distinctUntilChanged(),
            tap((value: FormFilterModel) => this.postPredicateAction(value)),
            map(value => ({ value }))
        );

        if (any(this.actions)) {
            predicate$ = predicate$.pipe(tap(() => reload = false));

            const reload$: Observable<any> = this.reloadService.reload$.pipe(tap(() => reload = true));

            let reload: boolean = false;

            this.predicate$ = combineWithReloadMultiple(predicate$, reload$, this.actions).pipe(
                map((predicate: ILoadContainerPredicateParameters | null) => ({ value: predicate?.value, reload: reload }))
            );
        } else {
            this.predicate$ = predicate$;
        }
    }

    private load(parameters: ILoadContainerParameters): Observable<ILoadContainerLoaderResultModel<TableItemModel>> {
        const pagination: IPaginationModel = { page: parameters.page, size: SearchConstants.PAGINATION_SIZE },
            loading: boolean = this.themeService.theme === Theme.Dark,
            request: BasePaginationRequest<RequestFilterModel> = this.buildRequest(
                parameters.params.value,
                pagination,
                parameters.sorting);

        return this.search(request, loading)
            .pipe(
                mapPaginationResponse<ResponseItemModel, TableItemModel>((item: ResponseItemModel) => this.map(item)),
                catchError((error: BaseErrorResponse) => catchPaginationError<TableItemModel>(error, this.notificationService))
            );
    }

    private onCancel(): void {
        const previousValue = JSON.parse(JSON.stringify(this.previousSearchValue));

        if (!isEqual(previousValue, this.form.value)) {
            this.form.patchValue(previousValue, { emitEvent: false });
        }

        this.modalService.close(SearchConstants.FILTERS_MODAL_ID);
    }

    private onApply(): void {
        if (!isEqual(this.previousSearchValue, this.form.value)) {
            this.filterModel.subject.next(this.form.value);
        }

        this.form.setValue(this.form.value, { emitEvent: false });

        this.modalService.toggle(SearchConstants.FILTERS_MODAL_ID);
    }

    private postPredicateAction(value: FormFilterModel): void {
        this.previousSearchValue = JSON.parse(JSON.stringify(value));
        this.initialized = true;
    }
}