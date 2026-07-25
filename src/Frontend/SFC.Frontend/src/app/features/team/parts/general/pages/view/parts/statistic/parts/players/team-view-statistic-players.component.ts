import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { buildBackNavigationExtras, getDataFromRouteRecursively } from "@core/utils";
import { faFontAwesomeFlag, faMapPin, faPeopleGroup, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import { IStatisticEnumModel, IStatisticModel, ITeamModel, ITeamPlayerStatisticModel, ITeamPlayerStatisticValueModel } from "@share/models";
import { EnumService, IFindTeamPlayerStatisticFilterModel, IGetTeamPlayerStatisticResponse, ITeamPlayerStatisticItemServiceModel, TeamPlayerStatisticService } from "@share/services";
import { ChartConfiguration } from "chart.js";
import { Color, CommonConstants, empty, firstOrDefault, IPaginationModel, ISortingModel, lastItem, LoadContainerLoadType, ReloadService, sum, where } from "ngx-sfc-common";
import { DEFAULT_CHART_OPTIONS, IDropdownMenuItemModel, ITableColumnExtendedModel, TableColumnType } from "ngx-sfc-components";
import { EMPTY, map, Observable } from "rxjs";
import { TeamViewPageConstants } from "../../../../team-view-page.constants";
import { ITeamViewStatisticPlayersModel } from "../../../../parts/statistic/parts/players/models/team-view-statistic-players.model";
import { mapTeamPlayerStatisticModel } from "@share/mappers";
import { ChartConstants } from "@share/constants";
import { buildViewPlayerAction, buildViewTeamPlayerAction, getMonthYearLabels } from "@share/utils";
import { BaseTableComponent, ITeamPlayerSearchTableModel, mapTeamPlayerSearchTableStatisticModel, TeamPlayerSearchTableColumn } from "@share/components";
import { HttpResponse } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BasePaginationRequest, BaseListResponse } from "@core/models";
import { NotificationService } from "@core/services";
import { CoreLocalization } from "@core/localization";
import { ISelectItemModel, ISelectValue, ISelectValueType } from "ngx-sfc-inputs";
import { ITeamViewStatisticPlayersFormModel } from "../../../../parts/statistic/parts/players/models/team-view-statistic-players-form.model";
import { TeamViewStatisticPlayersLocalization } from "./team-view-statistic-players.localization";
import { TeamLocalization } from "@share/localization";

@Component({
    templateUrl: './team-view-statistic-players.component.html',
    styleUrls: ['./team-view-statistic-players.component.scss']
})
export class TeamViewStatisticPlayersComponent
    extends BaseTableComponent<ITeamViewStatisticPlayersFormModel, IFindTeamPlayerStatisticFilterModel, ITeamPlayerStatisticItemServiceModel, ITeamPlayerSearchTableModel>
    implements OnInit {

    // icons
    faPeopleGroup = faPeopleGroup;
    faFontAwesomeFlag = faFontAwesomeFlag;
    faMapPin = faMapPin;
    faStopwatch = faStopwatch;

    // ngx-sfc-common
    LoadContainerLoadType = LoadContainerLoadType;

    // ngx-sfc-components
    DEFAULT_CHART_OPTIONS = DEFAULT_CHART_OPTIONS;

    // core
    CoreLocalization = CoreLocalization;

    // component
    Localization = TeamViewStatisticPlayersLocalization;

    /* Abstract */

    public columns: ITableColumnExtendedModel[] = [
        {
            name: CommonConstants.EMPTY_STRING,
            field: TeamPlayerSearchTableColumn.Rating
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: TeamPlayerSearchTableColumn.Information
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: TeamPlayerSearchTableColumn.Status
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: TeamPlayerSearchTableColumn.Games
        },
        {
            name: CommonConstants.EMPTY_STRING,
            field: TeamPlayerSearchTableColumn.Actions,
            type: TableColumnType.Action,
            width: 15
        }
    ];

    /* End Abstract */

    /* Properties */

    public get model(): ITeamModel {
        return getDataFromRouteRecursively<ITeamModel>(this.route, TeamViewPageConstants.RESOLVE_KEY)!;
    };

    /* End Properties */

    /* Fields */

    public statusesChartOptions: ChartConfiguration<any, [], unknown>['options'] = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        scales: {
            y: {
                grid: { display: false, },
                ticks: {
                    precision: 0,
                    stepSize: 5
                }
            },
            x: {
                border: { display: false }
            }
        },
        plugins: { legend: ChartConstants.USE_POINT_STYLES_LEGEND_PLUGIN }
    };

    public positionsChartOptions: ChartConfiguration<any, any, unknown>['options'] = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        plugins: { legend: ChartConstants.USE_POINT_STYLES_LEGEND_PLUGIN }
    };

    public activities: ISelectItemModel[] = [
        { key: TeamPlayerSearchTableColumn.Games, value: TeamViewStatisticPlayersLocalization.ACTIVITY.GAMES },
        { key: TeamPlayerSearchTableColumn.Goals, value: TeamViewStatisticPlayersLocalization.ACTIVITY.GOALS },
        { key: TeamPlayerSearchTableColumn.Assists, value: TeamViewStatisticPlayersLocalization.ACTIVITY.ASSISTS },
        { key: TeamPlayerSearchTableColumn.YellowCards, value: TeamViewStatisticPlayersLocalization.ACTIVITY.YELLOW_CARDS },
        { key: TeamPlayerSearchTableColumn.RedCards, value: TeamViewStatisticPlayersLocalization.ACTIVITY.RED_CARDS }
    ];

    private backNavigationExtras: NavigationExtras;

    public viewModel$: Observable<ITeamViewStatisticPlayersModel> = EMPTY;

    /* End Fields */

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router,
        private teamPlayerStatisticService: TeamPlayerStatisticService,
        themeService: ThemeService,
        enumService: EnumService,
        notificationService: NotificationService,
        reloadService: ReloadService,
        changeDetector: ChangeDetectorRef) {
        super(reloadService, enumService, themeService, notificationService, changeDetector);
        this.backNavigationExtras = buildBackNavigationExtras(this.router.url, TeamLocalization.NAVIGATION_BACK_LABEL);
    }

    override ngOnInit(): void {
        super.ngOnInit();

        this.viewModel$ = this.teamPlayerStatisticService.get(this.model.id).pipe(
            map((response: IGetTeamPlayerStatisticResponse) => {
                const teamPlayerStatisticModel: ITeamPlayerStatisticModel = mapTeamPlayerStatisticModel(response.Statistic),
                    teamPlayerStatistic: IStatisticModel<ITeamPlayerStatisticValueModel> | empty = lastItem(teamPlayerStatisticModel.statistic);

                if (teamPlayerStatistic) {
                    const activeStatusPlayers: IStatisticEnumModel[] = where(teamPlayerStatistic.value.statuses, status => status.key === 0)!;

                    return {
                        total: {
                            all: sum(teamPlayerStatistic.value.statuses, status => status.total),
                            active: sum(activeStatusPlayers, status => status.total)
                        },
                        statusesChartData: this.buildStatusesChartData(teamPlayerStatisticModel.statistic),
                        positionsChartData: this.buildPositionsChartData(teamPlayerStatistic)
                    };
                }

                return { total: { all: 0, active: 0 }, statusesChartData: null, positionsChartData: null };
            })
        );
    }

    public onActivityChange(activity: ISelectValueType): void {
        const activityValue: ISelectValue = activity as ISelectValue;

        this.columns.splice(3, 1, {
            name: activityValue.value,
            field: activityValue.key
        });
    }

    protected buildPredicateForm(): FormGroup<any> {
        const form = this.formBuilder.group({ activity: [this.activities[0]] });
        return form;
    }

    protected buildPaginationRequest(model: ITeamViewStatisticPlayersFormModel, pagination: IPaginationModel, sorting: empty | ISortingModel)
        : BasePaginationRequest<IFindTeamPlayerStatisticFilterModel> {
        return {
            Pagination: { Page: pagination.page, Size: pagination.size },
            Sorting: sorting ? [{ Name: model.activity.key, Direction: sorting!.direction }] : [],
            Filter: { Period: null }
        }
    }

    protected sendPaginationRequest(request: BasePaginationRequest<IFindTeamPlayerStatisticFilterModel>)
        : Observable<HttpResponse<BaseListResponse<ITeamPlayerStatisticItemServiceModel>>> {
        return this.teamPlayerStatisticService.find(this.model.id, request);
    }

    protected mapTableModel(item: ITeamPlayerStatisticItemServiceModel): ITeamPlayerSearchTableModel[] {
        return item.Value.map(model => mapTeamPlayerSearchTableStatisticModel(model, this.enumService,
            (model: ITeamPlayerSearchTableModel) => this.buildActions(model)));
    }

    private buildActions(model: ITeamPlayerSearchTableModel): IDropdownMenuItemModel[] {
        return [
            buildViewTeamPlayerAction(this.model.id, model.player.id, this.router, this.backNavigationExtras),
            buildViewPlayerAction(model.player.id, this.router)
        ];
    }

    private buildPositionsChartData(teamPlayerStatistic: IStatisticModel<ITeamPlayerStatisticValueModel>): ChartConfiguration['data'] {
        const labels: string[] = this.enumService.enums.footballPositions.map(position => position.value),
            data: number[] = this.enumService.enums.footballPositions.map(footballPosition => {
                return firstOrDefault(teamPlayerStatistic.value.positions, position => position.key === footballPosition.key)!.total
            });

        return {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: [Color.Pink_1, Color.Magenta_1, Color.Green_1, Color.Yellow_1]
                }
            ]
        };
    }

    private buildStatusesChartData(models: IStatisticModel<ITeamPlayerStatisticValueModel>[]): ChartConfiguration['data'] {
        const labels: string[] = getMonthYearLabels(models),
            statuses: IStatisticEnumModel[] = models.flatMap(item => item.value.statuses),
            datasets: any[] = this.enumService.enums.teamPlayerStatuses.map(teamPlayuerStatus => {
                const color: any = _mapTeamPlayerStatusColors(teamPlayuerStatus.key);
                return {
                    label: teamPlayuerStatus.value,
                    data: where(statuses, status => status.key === teamPlayuerStatus.key)?.map(status => status.total) || [],
                    backgroundColor: color.backgroundColor,
                    borderColor: color.borderColor,
                    borderRadius: 3
                }
            })

        function _mapTeamPlayerStatusColors(key: number) {
            switch (key) {
                case 0:
                    return { backgroundColor: Color.Green_0, borderColor: Color.Green_1 };
                case 1:
                    return { backgroundColor: Color.Red_0, borderColor: Color.Red_1 };
                case 2:
                    return { backgroundColor: Color.Magenta_0, borderColor: Color.Magenta_1 };
                case 3:
                    return { backgroundColor: Color.Blue_0, borderColor: Color.Blue_1 };
                case 4:
                    return { backgroundColor: Color.Yellow_0, borderColor: Color.Yellow_1 };
                default:
                    return { backgroundColor: Color.Yellow_0, borderColor: Color.Yellow_1 };
            }
        }

        return {
            labels: labels,
            datasets: datasets
        };
    }
}