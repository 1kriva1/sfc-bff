import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { IForm } from "@core/types";
import {
    faCrown
} from "@fortawesome/free-solid-svg-icons";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import {
    CommonConstants, ILoadContainerLoaderResultModel, ILoadContainerParameters,
    nameof
} from "ngx-sfc-common";
import { IBubbleModel } from "ngx-sfc-inputs";
import {
    combineLatest, map, Observable, of, startWith, distinctUntilChanged,
    filter, timer, debounce, tap, catchError
} from "rxjs";
import { TeamService } from '../../../../../services/team/team.service';
import { mapPageResponse } from "@core/utils";
import { BaseErrorResponse } from "@core/models";
import { NotificationService } from "@core/services";
import { IGetTeamsItemModel, IGetTeamsRequest } from "../../../../../services/team/models/get";
import { ITeamsViewModel } from "./teams-view.model";
import { TeamsViewConstants } from "./teams-view.constants";
import { TeamsViewLocalization } from "./teams-view.localization";
import { mapGetTeamsRequest, mapTeamRowModel } from "./mapper/teams-view.mapper";
import { ITeamRowModel } from "./parts/table/row/team-row.model";
import { BaseSearchViewComponent } from "../base/search/base-search-view.component";
import { EnumService } from "@share/services";
import { TeamsTableLocalization } from "./parts/table/teams-table.localization";
import { TeamsTableConstants } from "./parts/table/teams-table.constants";

@Component({
    templateUrl: './teams-view.component.html',
    styleUrls: [
        '../base/base-view.component.scss',
        '../base/search/base-search-view.component.scss',
        './teams-view.component.scss'
    ]
})
export class TeamsViewComponent
    extends BaseSearchViewComponent<ITeamRowModel>
    implements OnInit {

    Localization = TeamsViewLocalization;
    Constants = TeamsViewConstants;
    TableLocalization = TeamsTableLocalization;
    TableConstants = TeamsTableConstants;

    public statuses: IBubbleModel[] = [
        { key: 5, label: TeamsViewLocalization.FILTER.STATUSES.OPTION.CREATED_BY_ME, icon: faCrown }
    ];

    constructor(
        themeService: ThemeService,
        formBuilder: FormBuilder,
        notificationService: NotificationService,
        private teamService: TeamService,
        private enumService: EnumService
    ) {
        super(themeService, formBuilder, notificationService);
    }

    ngOnInit(): void {
        this.statuses = (this.enumService.enums.teamStatuses
            .map(status => ({ key: status.key, label: status.value, icon: status.icon })) as IBubbleModel[])
            .concat(this.statuses);

        this.buildForm();

        this.predicate$ = combineLatest([
            this.searchForm.get(nameof<ITeamsViewModel>('name'))!.valueChanges.pipe(
                debounce((value: string) => (this.initialized
                    ? timer(TeamsViewConstants.SEARCH_NAME_DEBOUNCE_TIME)
                    : of(value))),
                startWith(CommonConstants.EMPTY_STRING)
            ),
            this.searchForm.get(nameof<ITeamsViewModel>('statuses'))!.valueChanges.pipe(startWith([]))
        ]).pipe(
            filter(() => this.searchForm.valid),
            distinctUntilChanged(),
            tap(() => this.initialized = true),
            map(filters => ({
                value: { name: filters[0], statuses: filters[1] }
            }))
        );
    }

    public loader(parameters: ILoadContainerParameters): Observable<ILoadContainerLoaderResultModel<ITeamRowModel>> {
        const request: IGetTeamsRequest = mapGetTeamsRequest(parameters.params?.value,
            parameters.page, TeamsTableConstants.PAGINATION_SIZE,
            parameters.sorting);

        return this.teamService.get(request, !this.showLoading).pipe(
            mapPageResponse<IGetTeamsItemModel, ITeamRowModel>(
                (item: IGetTeamsItemModel) => mapTeamRowModel(item, this.enumService.enums.teamStatuses)
            ),
            catchError((error: BaseErrorResponse) => this.handleError(error))
        );
    }

    private buildForm(): void {
        const controls: IForm<ITeamsViewModel> = {
            statuses: [[]],
            name: [CommonConstants.EMPTY_STRING]
        };

        this.searchForm = this.formBuilder.group(controls);
    }
}