import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { ThemeService } from "@share/components/theme-toggler/services/theme/theme.service";
import { IStatsMetadataModel } from "@share/models";
import { EnumService } from "@share/services";
import { getMetadata, getRaiting, getModel } from "@share/utils";
import { ChartConfiguration } from "chart.js";
import { ComponentSize, Direction, firstOrDefault } from "ngx-sfc-common";
import { ChartOptionModel, getProgressColorDefaultFunc, getProgressColorDynamicallyFunc } from "ngx-sfc-components";
import { map, Observable } from "rxjs";
import { IPlayerModel } from "../../../mapper/models";
import { ViewPageConstants } from "../../../view.page.constants";
import { StatsViewConstants } from "./stats-view.constants";
import { StatsViewLocalization } from "./stats-view.localization";
import { IStatsViewModel } from "./stats-view.model";

@Component({
    templateUrl: './stats-view.component.html',
    styleUrls: ['../base/base-view.component.scss', './stats-view.component.scss']
})
export class StatsViewComponent implements OnInit {

    Localization = StatsViewLocalization;
    ComponentSize = ComponentSize;
    Direction = Direction;

    getProgressColorDynamicallyFunc = getProgressColorDynamicallyFunc;

    public radarChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                ticks: {
                    stepSize: StatsViewConstants.RADAR_CHART_TICKS_STEP_SIZE
                },
                suggestedMin: StatsViewConstants.RADAR_CHART_MIN_LIMIT,
                suggestedMax: StatsViewConstants.RADAR_CHART_MAX_LIMIT
            }
        },
        plugins: {
            tooltip: {
                displayColors: false
            }
        },
        layout: {
            padding: StatsViewConstants.RADAR_CHART_LAYOUT_PADDING
        }
    };

    public radarChartOptionsModel: ChartOptionModel = { legend: false, defaultColors: false };

    public vm$!: Observable<IStatsViewModel>;

    constructor(
        public themeService: ThemeService,
        private route: ActivatedRoute,
        private enumService: EnumService
    ) { }

    ngOnInit(): void {
        if (this.route.parent) {
            this.vm$ = this.route.parent.data.pipe(
                map((data: Data) => {
                    const model: IPlayerModel = data[ViewPageConstants.RESOLVE_KEY].result,
                        metadata: { [key: string]: IStatsMetadataModel } = getMetadata(model.stats.value),
                        raiting: number = getRaiting(model.stats.value);

                    return {
                        chart: {
                            radar: { data: this.buildRadarChartData(metadata, raiting) }
                        },
                        progress: raiting,
                        total: Object.values(metadata).reduce((accumulator: number, model: IStatsMetadataModel) =>
                            accumulator += model.total, 0),
                        value: Object.values(metadata).reduce((accumulator: number, model: IStatsMetadataModel) =>
                            accumulator += model.value, 0),
                        model: getModel(this.enumService.enums.statTypes, this.enumService.enums.statCategories),
                        metadata: metadata,
                        stats: model.stats.value
                    };
                })
            )
        }
    }

    private buildRadarChartData(metadata: { [key: string]: IStatsMetadataModel }, raiting: number)
        : ChartConfiguration['data'] {
        const labels: string[] = [],
            data: number[] = [],
            color: string = getProgressColorDefaultFunc(raiting);

        Object.keys(metadata).forEach(key => {
            labels.push(firstOrDefault(this.enumService.enums.statCategories, category => category.key === +key)?.value!);
            data.push(metadata[key].average);
        });

        return {
            labels: labels.map(x => { return x.split(' '); }),
            datasets: [
                {
                    data: data,
                    label: StatsViewLocalization.CHART.RADAR.TITLE,
                    borderColor: color,
                    backgroundColor: StatsViewConstants.RADAR_CHART_BACKGROUND_COLOR,
                    pointBackgroundColor: color,
                    pointBorderColor: color
                }
            ]
        }
    }
}