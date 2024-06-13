import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HeaderService } from "@core/components";
import { IForm } from "@core/types";
import { faClock, faLocationDot, faRegistered, faSearch, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { IInfoPanelModel, IPlayerInfoPanelModel } from "@share/components";
import {
    ButtonType, ComponentSize, IDefaultModalFooterModel,
    IDefaultModalHeaderModel, ILoadContainerLoaderResultModel,
    ILoadContainerParameters, ILoadContainerPredicateParameters,
    IPaginationModel, isEqual, MediaLimits, ModalService,
    ModalTemplate, PaginationConstants, Position, ResizeService,
    Theme
} from "ngx-sfc-common";
import { ExpandedTableRowTemplate, ITableColumnExtendedModel, TableTemplate } from "ngx-sfc-components";
import { IFiltersVisabilityModel } from "./models/filters-visability.model";
import { ISearchPageModel } from "./models/search.page.model";
import { IRecommendationsVisabilityModel } from "./models/recommendations-visability.model";
import { SearchPageConstants } from "./search.page.constants";
import {
    catchError, filter, of, Subject, debounce,
    timer, tap, map, Observable, switchMap, distinctUntilChanged, Subscription
} from 'rxjs';
import { PlayerService } from "../../services/player/player.service";
import { EnumService } from "@share/services";
import { mapPageResponse } from "@core/utils";
import { INotification, NotificationService } from "@core/services";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { BaseErrorResponse } from "@core/models";
import { SearchPageLocalization } from "./search.page.localization";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import { IFindPlayersRequest, IPlayerItemModel } from "../../services/player/models/find";
import { mapGetPlayersRequest, mapSearchPageTableModel } from "./mapper/search.page.mapper";
import { IPlayersTableModel } from "./parts/table/players-table.model";
import { PlayersTableConstants } from "./parts/table/players-table.constants";
import { PlayersTableLocalization } from "./parts/table/players-table.localization";

@Component({
    templateUrl: './search.page.component.html',
    styleUrls: ['./search.page.component.scss']
})
export class SearchPageComponent
    implements OnInit, AfterViewInit, OnDestroy {

    Position = Position;
    Constants = SearchPageConstants;
    TableConstants = PlayersTableConstants;
    TableTemplate = TableTemplate;
    ExpandedTableRowTemplate = ExpandedTableRowTemplate;
    ButtonType = ButtonType;
    ModalTemplate = ModalTemplate;
    ComponentSize = ComponentSize;
    Localization = SearchPageLocalization;
    TableLocalization = PlayersTableLocalization;

    // table
    public columns: ITableColumnExtendedModel[] = PlayersTableConstants.COLUMNS;

    public pagination: IPaginationModel = { page: PaginationConstants.DEFAULT_PAGE, size: PlayersTableConstants.PAGINATION_SIZE };

    public predicate$!: Observable<ILoadContainerPredicateParameters | null>;

    private initialized: boolean = false;

    // statistic
    public showStatistic: boolean = true;

    public statistics: IInfoPanelModel[] = [
        {
            title: this.Localization.STATISTIC.REGISTERED.LABEL,
            description: `${this.Localization.STATISTIC.REGISTERED.DESCRIPTION_1} 100 ${this.Localization.STATISTIC.REGISTERED.DESCRIPTION_2}`,
            icon: faRegistered, background: '#4a89dc', iconBackground: '#5d9cec'
        },
        {
            title: this.Localization.STATISTIC.NEIGHBORS.LABEL,
            description: `124 ${this.Localization.STATISTIC.NEIGHBORS.DESCRIPTION}`,
            icon: faLocationDot, background: '#2bbbad', iconBackground: '#48cfad'
        },
        {
            title: this.Localization.STATISTIC.AVAILABLE.LABEL,
            description: `10 ${this.Localization.STATISTIC.AVAILABLE.DESCRIPTION}`,
            icon: faClock, background: '#967adc', iconBackground: '#ac92ec'
        },
        {
            title: this.Localization.STATISTIC.FRIENDS.LABEL,
            description: `${this.Localization.STATISTIC.FRIENDS.DESCRIPTION_1} 0 ${this.Localization.STATISTIC.FRIENDS.DESCRIPTION_2}`,
            icon: faUserGroup, background: '#fcbb42', iconBackground: '#ffce54'
        }
    ];

    // filters
    public filtersVisability: IFiltersVisabilityModel = {
        general: true,
        football: false,
        stats: false
    };

    // modal
    public get filtersModalHeaderModel(): IDefaultModalHeaderModel {
        return {
            showCloseIcon: true,
            text: this.Localization.FILTER.TITLE.LABEL,
            icon: faSearch
        };
    }

    public get filtersModalFooterModel(): IDefaultModalFooterModel {
        return {
            applyButton: true,
            cancelButton: true,
            applyButtonText: this.Localization.BUTTON_SEARCH_LABEL,
            cancelButtonText: this.Localization.BUTTON_CANCEL_LABEL,
            onApply: () => {
                if (!isEqual(this.previousFormValue, this.searchForm.value)) {
                    this.modalSearchSubject.next(this.searchForm.value);
                }

                this.searchForm.setValue(this.searchForm.value, { emitEvent: false });

                this.modalService.toggle();
            },
            onCancel: () => this.cancelFiltersAndCloseModal(),
        }
    }

    private modalSearchSubject = new Subject<ISearchPageModel>();

    private modalSearch$: Observable<ISearchPageModel> = this.modalSearchSubject.asObservable();

    // recomendations
    public recommendationsVisability: IRecommendationsVisabilityModel = {
        search: true,
        location: true
    };

    public searchRecommendations: IPlayerInfoPanelModel[] = [
        {
            photo: null,
            firstName: 'Andrii',
            lastName: 'Kryvoruk',
            city: 'Kyiv',
            position: { key: 1, value: 'Defender' },
            raiting: 31
        },
        {
            photo: null,
            firstName: 'Andrii',
            lastName: 'Kryvoruk',
            city: 'Kyiv',
            position: { key: 1, value: 'Defender' },
            raiting: 31
        },
        {
            photo: null,
            firstName: 'Andrii',
            lastName: 'Kryvoruk',
            city: 'Kyiv',
            position: { key: 1, value: 'Defender' },
            raiting: 31
        },
        {
            photo: null,
            firstName: 'Andrii',
            lastName: 'Kryvoruk',
            city: 'Kyiv',
            position: { key: 1, value: 'Defender' },
            raiting: 31
        }
    ];

    public locationRecommendations: IPlayerInfoPanelModel[] = [
        // {
        //     photo: null,
        //     firstName: 'Andrii',
        //     lastName: 'Kryvoruk',
        //     city: 'Kyiv',
        //     position: { key: 1, value: 'Defender' },
        //     raiting: 31
        // }
    ];

    public searchForm!: FormGroup;

    public get showLoading(): boolean { return this.themeService.theme == Theme.Default; }

    private previousFormValue!: ISearchPageModel;

    private _resizeSubscription!: Subscription;

    constructor(
        public headerService: HeaderService,
        private playerService: PlayerService,
        private formBuilder: FormBuilder,
        private resizeService: ResizeService,
        private modalService: ModalService,
        private enumService: EnumService,
        private notificationService: NotificationService,
        private themeService: ThemeService,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.buildForm();

        this.predicate$ = this.searchForm.valueChanges.pipe(
            filter(() => this.searchForm.valid),
            switchMap((value: ISearchPageModel) => (this.modalService.isOpen ? this.modalSearch$ : of(value))),
            debounce((value: ISearchPageModel) => (this.initialized ? timer(this.Constants.SEARCH_DEBOUNCE_TIME) : of(value))),
            distinctUntilChanged(),
            tap((value: ISearchPageModel) => {
                this.previousFormValue = JSON.parse(JSON.stringify(value));
                this.initialized = true;
            }),
            map(value => ({ value }))
        );
    }

    ngAfterViewInit(): void {
        this._resizeSubscription = this.resizeService.onResize$
            .subscribe(window => {
                if (window.innerWidth > MediaLimits.Laptop && this.modalService.isOpen) {
                    this.cancelFiltersAndCloseModal();
                }
            });

        this.searchForm.updateValueAndValidity();

        this.previousFormValue = JSON.parse(JSON.stringify(this.searchForm.value));

        this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy(): void {
        this._resizeSubscription.unsubscribe();
    }

    public loader(parameters: ILoadContainerParameters): Observable<ILoadContainerLoaderResultModel<IPlayersTableModel>> {
        const request: IFindPlayersRequest = mapGetPlayersRequest(parameters.params?.value,
            parameters.page, this.pagination.size,
            parameters.sorting);

        return this.playerService.find(request, !this.showLoading).pipe(
            mapPageResponse<IPlayerItemModel, IPlayersTableModel>(
                (item: IPlayerItemModel) => mapSearchPageTableModel(item, this.enumService)
            ),
            catchError((error: BaseErrorResponse) => {
                const notification: INotification = {
                    severity: MessageSeverity.ERROR,
                    value: error.Message,
                    title: this.Localization.ERROR.FETCH
                };

                this.notificationService.notify(notification);

                return of({ next: false, items: [], total: 0 });
            })
        );
    }

    private buildForm(): void {
        const controls: IForm<ISearchPageModel> = { name: [null] };
        this.searchForm = this.formBuilder.group(controls);
    }

    private cancelFiltersAndCloseModal(): void {
        const previousValue = JSON.parse(JSON.stringify(this.previousFormValue));

        if (!isEqual(previousValue, this.searchForm.value)) {
            this.searchForm.setValue(previousValue, { emitEvent: false });
        }

        this.modalService.close();
    }
}