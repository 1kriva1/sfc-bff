import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { IForm } from "@core/types";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import {
    CommonConstants, ILoadContainerLoaderResultModel,
    ILoadContainerParameters, nameof
} from "ngx-sfc-common";
import { IBubbleModel } from "ngx-sfc-inputs";
import {
    combineLatest, map, Observable, of, startWith,
    distinctUntilChanged, filter, timer, debounce, tap, catchError
} from "rxjs";
import { GamesViewConstants } from "./games-view.constants";
import { GamesViewLocalization } from "./games-view.localization";
import { GameService } from '../../../../../services/game/game.service';
import { IGetGamesRequest, IGetGamesItemModel } from '../../../../../services/game/models/get';
import { IGamesViewModel } from "./games-view.model";
import { mapPageResponse } from "@core/utils";
import { BaseErrorResponse } from "@core/models";
import { NotificationService } from "@core/services";
import { mapGetGamesRequest, mapGameRowModel } from "./mapper/games-view.mapper";
import { BaseSearchViewComponent } from "../base/search/base-search-view.component";
import { EnumService } from "@share/services";
import { IGameRowModel } from "./parts/table/row/game-row.model";
import { GamesTableConstants } from "./parts/table/games-table.constants";
import { GamesTableLocalization } from "./parts/table/games-table.localization";

@Component({
    templateUrl: './games-view.component.html',
    styleUrls: [
        '../base/base-view.component.scss',
        '../base/search/base-search-view.component.scss',
        './games-view.component.scss'
    ]
})
export class GamesViewComponent
    extends BaseSearchViewComponent<IGameRowModel>
    implements OnInit {

    Localization = GamesViewLocalization;
    Constants = GamesViewConstants;
    TableLocalization = GamesTableLocalization;
    TableConstants = GamesTableConstants;

    public statuses: IBubbleModel[] = [
        { key: 5, label: GamesViewLocalization.FILTER.STATUSES.OPTION.TODAY, icon: faCalendarDay }
    ];

    constructor(
        themeService: ThemeService,
        formBuilder: FormBuilder,
        notificationService: NotificationService,
        private gameService: GameService,
        private enumService: EnumService
    ) {
        super(themeService, formBuilder, notificationService);
    }

    ngOnInit(): void {
        this.statuses = (this.enumService.enums.gameStatuses
            .map(status => ({ key: status.key, label: status.value, icon: status.icon })) as IBubbleModel[])
            .concat(this.statuses);

        this.buildForm();

        this.predicate$ = combineLatest([
            this.searchForm.get(nameof<IGamesViewModel>('name'))!.valueChanges.pipe(
                debounce((value: string) => (this.initialized
                    ? timer(GamesViewConstants.SEARCH_NAME_DEBOUNCE_TIME)
                    : of(value))),
                startWith(CommonConstants.EMPTY_STRING)
            ),
            this.searchForm.get(nameof<IGamesViewModel>('statuses'))!.valueChanges.pipe(startWith([]))
        ]).pipe(
            filter(() => this.searchForm.valid),
            distinctUntilChanged(),
            tap(() => this.initialized = true),
            map(filters => ({
                value: { name: filters[0], statuses: filters[1] }
            }))
        );
    }

    public loader(parameters: ILoadContainerParameters): Observable<ILoadContainerLoaderResultModel<IGameRowModel>> {
        const request: IGetGamesRequest = mapGetGamesRequest(parameters.params?.value,
            parameters.page, GamesTableConstants.PAGINATION_SIZE,
            parameters.sorting);

        return this.gameService.get(request, !this.showLoading).pipe(
            mapPageResponse<IGetGamesItemModel, IGameRowModel>(
                (item: IGetGamesItemModel) => mapGameRowModel(item, this.enumService.enums.gameStatuses)
            ),
            catchError((error: BaseErrorResponse) => this.handleError(error))
        );
    }

    private buildForm(): void {
        const controls: IForm<IGamesViewModel> = {
            statuses: [[]],
            name: [CommonConstants.EMPTY_STRING]
        };

        this.searchForm = this.formBuilder.group(controls);
    }
}