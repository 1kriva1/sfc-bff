import { Component, Input, OnInit } from '@angular/core';
import { StatsValue } from '../../../types';
import { IStatsMetadataModel } from '../../../models';
import { EnumService } from '../../../services';
import { getAverageStatsValue, getMetadata, getRaiting } from '../../../utils/stats';
import { ChartOptionModel, getProgressColorDefaultFunc } from 'ngx-sfc-components';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';
import { ChartConfiguration } from "chart.js";
import { StatsRadarConstants } from './stats-radar.constants';
import { StatsRadarLocalization } from './stats-radar.localization';
import { empty, firstOrDefault } from "ngx-sfc-common";

@Component({
    selector: 'sfc-stats-radar',
    templateUrl: './stats-radar.component.html',
    styleUrls: ['./stats-radar.component.scss']
})
export class StatsRadarComponent implements OnInit {

    /* Inputs */

    @Input()
    values: StatsValue[] = [];

    @Input()
    label: string | empty = null;

    /* End Inputs */

    /* Fields */

    public options: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                ticks: {
                    stepSize: StatsRadarConstants.CHART_TICKS_STEP_SIZE
                },
                suggestedMin: StatsRadarConstants.CHART_MIN_LIMIT,
                suggestedMax: StatsRadarConstants.CHART_MAX_LIMIT
            }
        },
        plugins: {
            tooltip: {
                displayColors: false
            }
        },
        layout: {
            padding: StatsRadarConstants.CHART_LAYOUT_PADDING
        }
    };

    public chartOptions: ChartOptionModel = { legend: false, defaultColors: false };

    public data!: ChartConfiguration['data'];

    /* End Fields */

    constructor(public themeService: ThemeService, private enumService: EnumService) { }

    ngOnInit(): void {
        const averageStatsValue: StatsValue = getAverageStatsValue(this.values),
            metadata: { [key: string]: IStatsMetadataModel } = getMetadata(averageStatsValue),
            raiting: number = getRaiting(averageStatsValue);

        this.data = this.buildChartData(metadata, raiting);
    }

    private buildChartData(metadata: { [key: string]: IStatsMetadataModel }, raiting: number)
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
                    label: StatsRadarLocalization.CHART.LABEL,
                    borderColor: color,
                    backgroundColor: StatsRadarConstants.CHART_BACKGROUND_COLOR,
                    pointBackgroundColor: color,
                    pointBorderColor: color
                }
            ]
        }
    }
}