import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { getDataFromRouteRecursively } from "@core/utils";
import {
    faChartSimple, faGamepad, faSoccerBall,
    faTrophy, faFaceSadCry, faEquals,
    faHandshake, faCrosshairs, faShield,
    faFaceAngry, faBan, faChartPie,
    faLocationCrosshairs
} from "@fortawesome/free-solid-svg-icons";
import { IInfoPanelModel } from "@share/components/info-panel/info-panel.model";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import {
    IStatisticModel, ITeamGameStatisticModel, ITeamGameStatisticValueModel,
    ITeamModel, ITeamStatisticActivityValueModel, ITeamStatisticModel
} from "@share/models";
import { Color, sum, IPositionModel } from "ngx-sfc-common";
import 'chartjs-adapter-date-fns';
import { ChartConfiguration } from "chart.js";
import { DEFAULT_CHART_OPTIONS } from "ngx-sfc-components";
import { TeamViewStatisticOverallLocalization } from "./team-view-statistic-overall.localization";
import { TeamViewPageConstants } from "../../../../team-view-page.constants";
import { IGetTeamGameStatisticResponse, IGetTeamStatisticResponse, TeamGameStatisticService, TeamStatisticService } from "@share/services";
import { EMPTY, map, Observable } from "rxjs";
import { mapTeamStatisticModel, mapTeamGameStatisticModel } from "@share/mappers";
import { ITeamViewStatisticOverallModel } from "./team-view-statistic-overall.model";
import { ChartConstants } from "@share/constants";
import { getMonthTick, getMonthTooltipTitle } from "@share/utils";

@Component({
    templateUrl: './team-view-statistic-overall.component.html',
    styleUrls: ['./team-view-statistic-overall.component.scss']
})
export class TeamViewStatisticOverallComponent implements OnInit {

    // icons
    faChartSimple = faChartSimple;
    faGamepad = faGamepad;
    faChartPie = faChartPie;
    faLocationCrosshairs = faLocationCrosshairs;
    faTrophy = faTrophy;
    faBan = faBan;

    // ngx-sfc-components
    DEFAULT_CHART_OPTIONS = DEFAULT_CHART_OPTIONS;

    // component
    Localization = TeamViewStatisticOverallLocalization;

    /* Properties */

    public get model(): ITeamModel {
        return getDataFromRouteRecursively<ITeamModel>(this.route, TeamViewPageConstants.RESOLVE_KEY)!;
    };

    /* End Properties */

    /* Fields */

    public gamesChartOptions: ChartConfiguration<any, [], unknown>['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        interaction: { intersect: false, },
        scales: {
            y: {
                min: 0,
                ticks: { precision: 0 },
                grid: { drawTicks: false }
            },
            x: {
                type: 'time',
                min: new Date(2025, 0, 0),
                time: ChartConstants.TIME_MONTH_CONFIGURATION,
                ticks: { callback: getMonthTick },
                grid: { display: true, },
                border: { display: false, }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: { title: getMonthTooltipTitle }
            }
        }
    };

    public resultsChartOptions: ChartConfiguration<any, any, unknown>['options'] = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.5,
        plugins: {
            legend: ChartConstants.USE_POINT_STYLES_LEGEND_PLUGIN
        }
    };

    public activitiesChartOptions: ChartConfiguration<any, [], unknown>['options'] = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.5,
        scales: {
            r: {
                ticks: {
                    display: false
                }
            }
        },
        layout: {
            padding: 10
        },
        plugins: {
            legend: ChartConstants.USE_POINT_STYLES_LEGEND_PLUGIN
        }
    };

    public foulsChartOptions: ChartConfiguration<any, any, unknown>['options'] = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.5,
        plugins: {
            legend: ChartConstants.USE_POINT_STYLES_LEGEND_PLUGIN
        }
    };

    public gamesChartData$: Observable<any> = EMPTY;

    public viewModel$: Observable<ITeamViewStatisticOverallModel> = EMPTY;

    /* End Fields */

    constructor(
        public themeService: ThemeService,
        private route: ActivatedRoute,
        private teamStatisticService: TeamStatisticService,
        private teamGameStatisticService: TeamGameStatisticService
    ) { }

    ngOnInit(): void {
        this.gamesChartData$ = this.teamGameStatisticService.get(this.model.id, { Period: 2 }).pipe(
            map((response: IGetTeamGameStatisticResponse) => {
                const teamGameStatisticModel: ITeamGameStatisticModel = mapTeamGameStatisticModel(response.Statistic);
                return this.buildGamesChartData(teamGameStatisticModel.statistic);
            })
        );

        this.viewModel$ = this.teamStatisticService.get(this.model.id).pipe(
            map((response: IGetTeamStatisticResponse) => {
                const teamStatisticModel: ITeamStatisticModel = mapTeamStatisticModel(response.Statistic),
                    teamStatistic: IStatisticModel<ITeamStatisticActivityValueModel> | null = teamStatisticModel.statistic.length
                        ? teamStatisticModel.statistic[0] : null;

                if (teamStatistic) {
                    return {
                        panels: this.buildInfoPanelModels(teamStatistic),
                        resultsChartData: this.buildResultsChartData(teamStatistic),
                        activitiesChartData: this.buildActivitiesChartData(teamStatistic),
                        foulsChartData: this.buildFoulsChartData(teamStatistic)
                    };
                }

                return { panels: [], resultsChartData: null, activitiesChartData: null, foulsChartData: null };
            })
        );
    }

    private buildInfoPanelModels(model: IStatisticModel<ITeamStatisticActivityValueModel>): IInfoPanelModel[] {
        return [
            {
                title: TeamViewStatisticOverallLocalization.INFO_PANEL.GAMES.TITLE,
                value: model.value.games,
                description: TeamViewStatisticOverallLocalization.INFO_PANEL.GAMES.DESCRIPTION,
                icon: faGamepad,
                background: Color.Blue_1,
                iconBackground: Color.Blue_0
            },
            {
                title: TeamViewStatisticOverallLocalization.INFO_PANEL.WINS.TITLE,
                value: model.value.wins,
                description: TeamViewStatisticOverallLocalization.INFO_PANEL.WINS.DESCRIPTION,
                icon: faTrophy,
                background: Color.Green_1,
                iconBackground: Color.Green_0
            },
            {
                title: TeamViewStatisticOverallLocalization.INFO_PANEL.LOSES.TITLE,
                value: model.value.loses,
                description: TeamViewStatisticOverallLocalization.INFO_PANEL.LOSES.DESCRIPTION,
                icon: faFaceSadCry,
                background: Color.Pink_1,
                iconBackground: Color.Pink_0
            },
            {
                title: TeamViewStatisticOverallLocalization.INFO_PANEL.DRAWS.TITLE,
                value: model.value.draws,
                description: TeamViewStatisticOverallLocalization.INFO_PANEL.DRAWS.DESCRIPTION,
                icon: faEquals,
                background: Color.Magenta_1,
                iconBackground: Color.Magenta_0
            },
            {
                title: TeamViewStatisticOverallLocalization.INFO_PANEL.GOALS.TITLE,
                value: model.value.goals,
                description: TeamViewStatisticOverallLocalization.INFO_PANEL.GOALS.DESCRIPTION,
                icon: faSoccerBall,
                background: Color.Blue_3,
                iconBackground: Color.Blue_2
            },
            {
                title: TeamViewStatisticOverallLocalization.INFO_PANEL.ASSISTS.TITLE,
                value: model.value.assists,
                description: TeamViewStatisticOverallLocalization.INFO_PANEL.ASSISTS.DESCRIPTION,
                icon: faHandshake,
                background: Color.Green_3,
                iconBackground: Color.Green_2
            },
            {
                title: TeamViewStatisticOverallLocalization.INFO_PANEL.PENALTIES.TITLE,
                value: model.value.penalties,
                description: TeamViewStatisticOverallLocalization.INFO_PANEL.PENALTIES.DESCRIPTION,
                icon: faCrosshairs,
                background: Color.Green_4,
                iconBackground: Color.Green_2
            },
            {
                title: TeamViewStatisticOverallLocalization.INFO_PANEL.CLEAN_SHEETS.TITLE,
                value: model.value.cleanSheets,
                description: TeamViewStatisticOverallLocalization.INFO_PANEL.CLEAN_SHEETS.DESCRIPTION,
                icon: faShield,
                background: Color.Blue_2,
                iconBackground: Color.Blue_3
            },
            {
                title: TeamViewStatisticOverallLocalization.INFO_PANEL.RED_CARDS.TITLE,
                value: model.value.redCards,
                description: TeamViewStatisticOverallLocalization.INFO_PANEL.RED_CARDS.DESCRIPTION,
                icon: faBan,
                background: Color.Red_1,
                iconBackground: Color.Red_0
            },
            {
                title: TeamViewStatisticOverallLocalization.INFO_PANEL.YELLOW_CARDS.TITLE,
                value: model.value.yellowCards,
                description: TeamViewStatisticOverallLocalization.INFO_PANEL.YELLOW_CARDS.DESCRIPTION,
                icon: faFaceAngry,
                background: Color.Orange_1,
                iconBackground: Color.Orange_0
            }
        ];
    }

    private buildResultsChartData(model: IStatisticModel<ITeamStatisticActivityValueModel>): ChartConfiguration['data'] {
        return {
            labels: [
                TeamViewStatisticOverallLocalization.CHART.RESULTS.LABEL.WINS,
                TeamViewStatisticOverallLocalization.CHART.RESULTS.LABEL.LOSES,
                TeamViewStatisticOverallLocalization.CHART.RESULTS.LABEL.DRAWS
            ],
            datasets: [
                {
                    data: [model.value.wins, model.value.loses, model.value.draws],
                    backgroundColor: [Color.Green_1, Color.Yellow_1, Color.Magenta_1]
                }
            ]
        }
    }

    private buildActivitiesChartData(model: IStatisticModel<ITeamStatisticActivityValueModel>): ChartConfiguration['data'] {
        return {
            labels: [
                TeamViewStatisticOverallLocalization.CHART.ACTIVITIES.LABEL.GOALS,
                TeamViewStatisticOverallLocalization.CHART.ACTIVITIES.LABEL.ASSISTS,
                TeamViewStatisticOverallLocalization.CHART.ACTIVITIES.LABEL.PENALTIES,
                TeamViewStatisticOverallLocalization.CHART.ACTIVITIES.LABEL.CLEAN_SHEETS
            ],
            datasets: [
                {
                    data: [model.value.goals, model.value.assists, model.value.penalties, model.value.cleanSheets],
                    backgroundColor: [
                        Color.Green_1,
                        Color.Blue_1,
                        Color.Pink_1,
                        Color.Magenta_1
                    ],
                }
            ]
        }
    }

    private buildFoulsChartData(model: IStatisticModel<ITeamStatisticActivityValueModel>): ChartConfiguration['data'] {
        return {
            labels: [
                TeamViewStatisticOverallLocalization.CHART.FOULS.LABEL.RED_CARDS,
                TeamViewStatisticOverallLocalization.CHART.FOULS.LABEL.YELLOW_CARDS
            ],
            datasets: [
                {
                    data: [model.value.redCards, model.value.yellowCards],
                    backgroundColor: [Color.Red_1, Color.Yellow_1]
                }
            ]
        }
    }

    private buildGamesChartData(models: IStatisticModel<ITeamGameStatisticValueModel>[]): any {
        const data: IPositionModel<Date, number>[] = models.map((model: IStatisticModel<ITeamGameStatisticValueModel>) =>
            ({ x: model.date, y: sum(model.value.statuses, status => status.total) }));

        return {
            datasets: [
                {
                    data: data,
                    label: TeamViewStatisticOverallLocalization.CHART.GAMES.DATASET_LABEL,
                    tension: 0.3,
                    borderColor: Color.Blue_1,
                    backgroundColor: Color.Blue_1
                }
            ]
        };
    }
}