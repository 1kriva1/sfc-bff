import { Directive, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { HttpResponse } from "@angular/common/http";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
    ButtonType, CommonConstants, empty, IDefaultModalFooterModel, IDefaultModalHeaderModel,
    ILoadContainerLoaderResultModel, ILoadContainerParameters, ILoadContainerPredicateParameters,
    IPaginationModel, isEqual, isNullOrEmptyString, ISortingModel, ModalService, ModalTemplate, Position, ReloadService, Theme
} from "ngx-sfc-common";
import { TableTemplate } from "ngx-sfc-components";
import {
    map, Observable, of, Subject, catchError, filter, timer, switchMap,
    debounce, distinctUntilChanged, tap, startWith
} from 'rxjs';
import { BaseErrorResponse, BaseListResponse, BasePaginationRequest } from "@core/models";
import { NotificationService } from "@core/services";
import { catchPaginationError, combineWithReload, mapPaginationResponse } from "@core/utils";
import { ThemeService } from "../../../../../components/theme-toggler/services/theme/theme.service";
import { IPlayersFilterModel } from "../filters/models/players-filter.model";
import { PlayersFiltersConstants } from "../filters/constants/players-filters.constants";
import { PlayersTableConstants } from "../table/constants/players-table.constants";
import { PlayersTableLocalization } from "../table/localization/players-table.localization";
import { PlayersFiltersLocalization } from "../filters/localization/players-filter.localization";

@Directive()
export abstract class BasePlayersSearchComponent
    <FormFilterModel extends IPlayersFilterModel, // form model for filtering
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

    // filters
    FiltersConstants = PlayersFiltersConstants;
    FiltersLocalization = PlayersFiltersLocalization;

    //table
    TableLocalization = PlayersTableLocalization;
    TableConstants = PlayersTableConstants;

    /* Filters */

    public form!: FormGroup;
    private subject: Subject<FormFilterModel> = new Subject<FormFilterModel>();
    private search$: Observable<FormFilterModel> = this.subject.asObservable();
    private previousSearchValue!: FormFilterModel;

    public get headerModel(): IDefaultModalHeaderModel {
        return {
            showCloseIcon: true,
            text: PlayersFiltersLocalization.MODAL.HEADER.TITLE,
            icon: faSearch
        };
    }

    public get footerModel(): IDefaultModalFooterModel {
        return {
            applyButton: true,
            cancelButton: true,
            applyButtonText: PlayersFiltersLocalization.MODAL.FOOTER.BUTTON.APPLY,
            cancelButtonText: PlayersFiltersLocalization.MODAL.FOOTER.BUTTON.CANCEL,
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

    protected abstract buildRequest(model: FormFilterModel, pagination: IPaginationModel, sorting: ISortingModel | empty)
        : BasePaginationRequest<RequestFilterModel>;

    protected abstract search(request: BasePaginationRequest<RequestFilterModel>, loading: boolean)
        : Observable<HttpResponse<BaseListResponse<ResponseItemModel>>>;

    protected abstract map(item: ResponseItemModel): TableItemModel;

    protected abstract buildFilterForm(): FormGroup;

    protected defaultFilterModel: FormFilterModel = PlayersFiltersConstants.DEFAULT_FILTER_MODEL as FormFilterModel;

    protected action: string = CommonConstants.EMPTY_STRING;

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
            switchMap((value: FormFilterModel) => (this.modalService.isOpen ? this.search$ : of(value))),
            debounce((value: FormFilterModel) => (this.initialized ? timer(PlayersFiltersConstants.SEARCH_DEBOUNCE_TIME) : of(value))),
            distinctUntilChanged(),
            tap((value: FormFilterModel) => this.postPredicateAction(value)),
            map(value => ({ value }))
        );

        if (!isNullOrEmptyString(this.action)) {
            predicate$ = predicate$.pipe(tap(() => reload = false));

            const reload$: Observable<any> = this.reloadService.reload$.pipe(tap(() => reload = true));

            let reload: boolean = false;

            this.predicate$ = combineWithReload(predicate$, reload$, this.action).pipe(
                map((predicate: ILoadContainerPredicateParameters | null) => ({ value: predicate?.value, reload: reload }))
            );
        } else {
            this.predicate$ = predicate$;
        }
    }

    private load(parameters: ILoadContainerParameters): Observable<ILoadContainerLoaderResultModel<TableItemModel>> {
        const pagination: IPaginationModel = { page: parameters.page, size: this.TableConstants.PAGINATION_SIZE },
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

        this.modalService.close(PlayersFiltersConstants.PLAYERS_FILTERS_MODAL_ID);
    }

    private onApply(): void {
        if (!isEqual(this.previousSearchValue, this.form.value)) {
            this.subject.next(this.form.value);
        }

        this.form.setValue(this.form.value, { emitEvent: false });

        this.modalService.toggle(PlayersFiltersConstants.PLAYERS_FILTERS_MODAL_ID);
    }

    private postPredicateAction(value: FormFilterModel): void {
        this.previousSearchValue = JSON.parse(JSON.stringify(value));
        this.initialized = true;
    }
}