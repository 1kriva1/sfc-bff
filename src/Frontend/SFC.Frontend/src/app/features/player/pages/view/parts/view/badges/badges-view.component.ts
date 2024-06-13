import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { BaseErrorResponse } from "@core/models";
import { NotificationService } from "@core/services";
import { IForm } from "@core/types";
import { mapPageResponse } from "@core/utils";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import {
    CommonConstants, ILoadContainerLoaderResultModel, ILoadContainerParameters,
    LoadContainerLoadType, nameof
} from "ngx-sfc-common";
import { TableDataType } from "ngx-sfc-components";
import {
    catchError, combineLatest, debounce, distinctUntilChanged,
    filter, map, Observable, of, startWith, tap, timer
} from "rxjs";
import { IBadgesViewModel } from "./badges-view.model";
import { BadgesViewConstants } from "./badges-view.constants";
import { BadgesViewLocalization } from "./badges-view.localization";
import { mapGetBadgesRequest, mapBadgeCardModel } from "./mapper/badges-view.mapper";
import { IBadgeCardModel } from "./parts/table/card/badge-card.model";
import { IGetBadgesRequest, IGetBadgesItemModel } from "../../../../../services/badge/models/get";
import { BadgeService } from "../../../../../services/badge/badge.service";
import { EnumService } from "@share/services";
import { BaseSearchViewComponent } from "../base/search/base-search-view.component";
import { BadgesTableLocalization } from "./parts/table/badges-table.localization";
import { BadgesTableConstants } from "./parts/table/badges-table.constants";

@Component({
    templateUrl: './badges-view.component.html',
    styleUrls: [
        '../base/base-view.component.scss',
        '../base/search/base-search-view.component.scss',
        './badges-view.component.scss'
    ]
})
export class BadgesViewComponent
    extends BaseSearchViewComponent<IBadgeCardModel>
    implements OnInit {

    Localization = BadgesViewLocalization;
    Constants = BadgesViewConstants;
    TableLocalization = BadgesTableLocalization;
    TableConstants = BadgesTableConstants;
    TableDataType = TableDataType;
    LoadContainerLoadType = LoadContainerLoadType;

    constructor(
        themeService: ThemeService,
        formBuilder: FormBuilder,
        notificationService: NotificationService,
        private badgeService: BadgeService,
        private enumService: EnumService
    ) {
        super(themeService, formBuilder, notificationService);
    }

    ngOnInit(): void {
        this.buildForm();

        this.predicate$ = combineLatest([
            this.searchForm.get(nameof<IBadgesViewModel>('name'))!.valueChanges.pipe(
                debounce((value: string) => (this.initialized
                    ? timer(BadgesViewConstants.SEARCH_NAME_DEBOUNCE_TIME)
                    : of(value))),
                startWith(CommonConstants.EMPTY_STRING)
            ),
            this.searchForm.get(nameof<IBadgesViewModel>('statuses'))!.valueChanges.pipe(startWith([]))
        ]).pipe(
            filter(() => this.searchForm.valid),
            distinctUntilChanged(),
            tap(() => this.initialized = true),
            map(filters => ({
                value: { name: filters[0], statuses: filters[1] }
            }))
        );
    }

    public loader(parameters: ILoadContainerParameters): Observable<ILoadContainerLoaderResultModel<IBadgeCardModel>> {
        const request: IGetBadgesRequest = mapGetBadgesRequest(parameters.params?.value,
            parameters.page, BadgesTableConstants.PAGINATION_SIZE,
            parameters.sorting);

        return this.badgeService.get(request, !this.showLoading).pipe(
            mapPageResponse<IGetBadgesItemModel, IBadgeCardModel>(
                (item: IGetBadgesItemModel) => mapBadgeCardModel(item, this.enumService.enums.badgeTypes)
            ),
            catchError((error: BaseErrorResponse) => this.handleError(error))
        );
    }

    private buildForm(): void {
        const controls: IForm<IBadgesViewModel> = {
            name: [CommonConstants.EMPTY_STRING],
            statuses: [[]]
        };

        this.searchForm = this.formBuilder.group(controls);
    }
}