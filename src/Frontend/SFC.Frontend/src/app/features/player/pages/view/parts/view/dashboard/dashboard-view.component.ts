import 'chartjs-adapter-date-fns';
import { Component, HostListener } from "@angular/core";
import {
    faCircleXmark, faCrosshairs, faFutbol, faGamepad,
    faHand, faHandshakeAngle, faRankingStar, faShield,
    faTable, faUsersLine
} from "@fortawesome/free-solid-svg-icons";
import { IInfoPanelModel } from "@share/components";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import { ChartConfiguration } from "chart.js";
import { ComponentSize, MediaLimits } from "ngx-sfc-common";
import { DashboardViewLocalization } from "./dashboard-view.localization";
import { DashboardViewConstants } from "./dashboard-view.constants";
import { getLongMonth, getMonths, getShortMonth } from '@core/utils';
import { IEnumModel } from '@core/types';
import { EnumService } from '@share/services';

@Component({
    templateUrl: './dashboard-view.component.html',
    styleUrls: ['../base/base-view.component.scss', './dashboard-view.component.scss']
})
export class DashboardViewComponent {

    Localization = DashboardViewLocalization;
    ComponentSize = ComponentSize;
    Constants = DashboardViewConstants;

    public dataModels: IInfoPanelModel[] = [
        {
            title: DashboardViewLocalization.INFO.GAMES.TITLE,
            description: `${64} ${DashboardViewLocalization.INFO.GAMES.DESCRIPTION}`,
            icon: faGamepad,
            background: DashboardViewConstants.COLORS.GAMES,
            iconBackground: '#5d9cec'
        },
        {
            title: DashboardViewLocalization.INFO.GOALS.TITLE,
            description: `${14} ${DashboardViewLocalization.INFO.GOALS.DESCRIPTION}`,
            icon: faFutbol,
            background: DashboardViewConstants.COLORS.GOALS,
            iconBackground: '#48cfad'
        },
        {
            title: DashboardViewLocalization.INFO.ASSISTS.TITLE,
            description: `${24} ${DashboardViewLocalization.INFO.ASSISTS.DESCRIPTION}`,
            icon: faHandshakeAngle,
            background: DashboardViewConstants.COLORS.ASSISTS,
            iconBackground: '#ac92ec'
        },
        {
            title: DashboardViewLocalization.INFO.RED_CARDS.TITLE,
            description: `${0} ${DashboardViewLocalization.INFO.RED_CARDS.DESCRIPTION}`,
            icon: faCircleXmark,
            background: DashboardViewConstants.COLORS.RED_CARDS,
            iconBackground: '#ed5565'
        },
        {
            title: DashboardViewLocalization.INFO.YELLOW_CARDS.TITLE,
            description: `${2} ${DashboardViewLocalization.INFO.YELLOW_CARDS.DESCRIPTION}`,
            icon: faTable,
            background: DashboardViewConstants.COLORS.YELLOW_CARDS,
            iconBackground: '#ffce54'
        },
        {
            title: DashboardViewLocalization.INFO.PENALTIES.TITLE,
            description: `${1} ${DashboardViewLocalization.INFO.PENALTIES.DESCRIPTION}`,
            icon: faHand,
            background: DashboardViewConstants.COLORS.PENALTIES,
            iconBackground: '#ec87c0'
        },
        {
            title: DashboardViewLocalization.INFO.MVP.TITLE,
            description: `${1} ${DashboardViewLocalization.INFO.MVP.DESCRIPTION}`,
            icon: faRankingStar,
            background: DashboardViewConstants.COLORS.MVP,
            iconBackground: '#a0d468'
        },
        {
            title: DashboardViewLocalization.INFO.CLEAN_SHEETS.TITLE,
            description: `${0} ${DashboardViewLocalization.INFO.CLEAN_SHEETS.DESCRIPTION}`,
            icon: faShield,
            background: DashboardViewConstants.COLORS.CLEAM_SHEETS,
            iconBackground: '#fc6e51'
        },
        {
            title: DashboardViewLocalization.INFO.FREE_KICKS.TITLE,
            description: `${0} ${DashboardViewLocalization.INFO.FREE_KICKS.DESCRIPTION}`,
            icon: faCrosshairs,
            background: DashboardViewConstants.COLORS.FREE_KICKS,
            iconBackground: '#4fc1e9'
        },
        {
            title: DashboardViewLocalization.INFO.TEAMS.TITLE,
            description: `${2} ${DashboardViewLocalization.INFO.TEAMS.DESCRIPTION} ${1}`,
            icon: faUsersLine,
            background: DashboardViewConstants.COLORS.TEAMS,
            iconBackground: '#a0d468'
        }
    ];

    public innerWidth: number;

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.innerWidth = window.innerWidth;
    }

    private onGamesChartResize = (chart: any) => {
        if (this.innerWidth <= MediaLimits.MobileLarge) {
            chart.config.options.scales.x.ticks.display = false;
        } else if (this.innerWidth <= MediaLimits.Tablet) {
            chart.config.options.scales.x.ticks.display = true;
            chart.config.options.maintainAspectRatio = false;
        } else {
            chart.config.options.scales.x.ticks.display = true;
            chart.config.options.maintainAspectRatio = true;
        }
    }

    public gamesChartOptions: ChartConfiguration<any, [], unknown>['options'] = {
        responsive: true,
        maintainAspectRatio: true,
        interaction: {
            intersect: false,
        },
        onResize: this.onGamesChartResize,
        scales: {
            y: {
                ticks: {
                    precision: 0
                },
                grid: {
                    drawTicks: false
                }
            },
            x: {
                type: 'time',
                min: new Date(2023, 1, 0),
                time: {
                    unit: 'month',
                    tooltipFormat: 'MMMM yyy',
                    displayFormats: {
                        quarter: 'MMMM'
                    }
                },
                ticks: {
                    callback: function (value: string) {
                        const parts = value.split(' ');
                        return `${getShortMonth(parts[0])} ${parts[1]}`;
                    }
                },
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    title: (item: any[]) => {
                        const parts = item[0].label.split(' ');
                        return `${getLongMonth(parts[0])} ${parts[1]}`;
                    }
                }
            }
        }
    };

    private onActivitiesChartResize = (chart: any) => {
        if (this.innerWidth <= MediaLimits.MobileLarge) {
            chart.config.options.plugins.legend.display = false;
        } else if (this.innerWidth <= MediaLimits.Tablet) {
            chart.config.options.scales.x.ticks.display = true;
            chart.config.options.maintainAspectRatio = false;
        } else {
            chart.config.options.maintainAspectRatio = true;
            chart.config.options.plugins.legend.display = true;
        }
    }

    public activitiesChartOptions: ChartConfiguration<any, [], unknown>['options'] = {
        responsive: true,
        maintainAspectRatio: true,
        onResize: this.onActivitiesChartResize,
        scales: {
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    precision: 0
                }
            },
            x: {
                border: {
                    display: false,
                }
            }
        }
    };

    public foulsChartOptions: ChartConfiguration<any, any, unknown>['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1
    };

    public positionsChartOptions: ChartConfiguration<any, [], unknown>['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        scales: {
            r: {
                ticks: {
                    display: false
                }
            }
        },
        layout: {
            padding: 10
        }
    };

    public actionsChartOptions: ChartConfiguration<any, any, unknown>['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1
    };

    public gamesChartData: any = {
        datasets: [
            {
                data: [
                    { x: new Date(2023, 1), y: 3 },
                    { x: new Date(2023, 2), y: 1 },
                    { x: new Date(2023, 3), y: 5 },
                    { x: new Date(2023, 4), y: 0 },
                    { x: new Date(2023, 5), y: 0 },
                    { x: new Date(2023, 6), y: 1 },
                    { x: new Date(2023, 7), y: 4 },
                    { x: new Date(2023, 8), y: 4 },
                    { x: new Date(2023, 9), y: 4 },
                    { x: new Date(2023, 10), y: 4 },
                    { x: new Date(2023, 11), y: 4 },
                    { x: new Date(2023, 12), y: 4 }
                ],
                label: DashboardViewLocalization.CHART.GAMES.LABEL,
                tension: 0.3,
                borderColor: DashboardViewConstants.COLORS.GAMES,
                backgroundColor: DashboardViewConstants.COLORS.GAMES,
            }
        ],
    }

    public activitiesChartData: ChartConfiguration['data'] = {
        labels: (getMonths([0, 1, 2, 3, 4, 5, 6]) as IEnumModel<number>[])
            .map((month: IEnumModel<number>) => month.value),
        datasets: [
            {
                label: DashboardViewLocalization.CHART.ACTIVITIES.GOALS,
                data: [1, 0, 2, 1, 4, 3, 2, 4, 2, 1, 0, 2],
                backgroundColor: DashboardViewConstants.COLORS.GOALS,
                borderColor: DashboardViewConstants.COLORS.GOALS,
                borderRadius: 3
            },
            {
                label: DashboardViewLocalization.CHART.ACTIVITIES.ASSISTS,
                data: [3, 1, 2, 3, 1, 2, 4, 0, 1, 4, 1, 2],
                backgroundColor: DashboardViewConstants.COLORS.ASSISTS,
                borderColor: DashboardViewConstants.COLORS.ASSISTS,
                borderRadius: 3
            },
            {
                label: DashboardViewLocalization.CHART.ACTIVITIES.PENALTIES,
                data: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
                backgroundColor: DashboardViewConstants.COLORS.PENALTIES,
                borderColor: DashboardViewConstants.COLORS.PENALTIES,
                borderRadius: 3
            },
            {
                label: DashboardViewLocalization.CHART.ACTIVITIES.FREE_KICKS,
                data: [1, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 1],
                backgroundColor: DashboardViewConstants.COLORS.FREE_KICKS,
                borderColor: DashboardViewConstants.COLORS.FREE_KICKS,
                borderRadius: 3
            }
        ]
    }

    public foulsChartData: ChartConfiguration['data'] = {
        labels: [DashboardViewLocalization.CHART.FOULS.RED_CARDS, DashboardViewLocalization.CHART.FOULS.YELLOW_CARDS],
        datasets: [
            {
                data: [1, 2],
                backgroundColor: [DashboardViewConstants.COLORS.RED_CARDS, DashboardViewConstants.COLORS.YELLOW_CARDS]
            }
        ]
    }

    public actionsChartData: ChartConfiguration['data'] = {
        labels: [DashboardViewLocalization.CHART.ACTIONS.GOALS, DashboardViewLocalization.CHART.ACTIONS.ASSISTS],
        datasets: [
            {
                data: [22, 24],
                backgroundColor: [DashboardViewConstants.COLORS.GOALS, DashboardViewConstants.COLORS.ASSISTS],
            }
        ]
    }

    public positionsChartData: ChartConfiguration['data'] = {
        labels: this.enumService.enums.footballPositions.map(position => position.value),
        datasets: [
            {
                data: [1, 2, 3, 4],
                backgroundColor: [
                    DashboardViewConstants.COLORS.POSITIONS.GOALKEEPER,
                    DashboardViewConstants.COLORS.POSITIONS.DEFENDER,
                    DashboardViewConstants.COLORS.POSITIONS.MIDFIELDER,
                    DashboardViewConstants.COLORS.POSITIONS.FORWARD
                ],
            }
        ]
    }

    constructor(public themeService: ThemeService, private enumService: EnumService) {
        this.innerWidth = window.innerWidth;
    }
}