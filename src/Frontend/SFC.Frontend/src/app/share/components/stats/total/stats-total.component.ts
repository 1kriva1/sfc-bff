import { Component, Input, OnInit } from '@angular/core';
import { getProgressColorDynamicallyFunc } from 'ngx-sfc-components';
import { ComponentSize, Direction, sum } from 'ngx-sfc-common';
import { StatsValue } from '@share/types';
import { getAverageStatsValue, getMetadata, getRaiting } from '@share/utils';
import { IStatsMetadataModel } from '@share/models';
import { StatsTotalLocalization } from './stats-total.localization';

@Component({
    selector: 'sfc-stats-total',
    templateUrl: './stats-total.component.html',
    styleUrls: ['./stats-total.component.scss']
})
export class StatsTotalComponent implements OnInit {

    // ngx-sfc-common
    ComponentSize = ComponentSize;
    Direction = Direction;

    // ngx-sfc-components
    getProgressColorDynamicallyFunc = getProgressColorDynamicallyFunc;

    // component
    Localization = StatsTotalLocalization;

    /* Inputs */

    @Input()
    values: StatsValue[] = [];

    @Input()
    delimeter: boolean = false;

    @Input()
    averageDescription: string = StatsTotalLocalization.AVERAGE.DESCRIPTION;

    @Input()
    totalDescription: string = StatsTotalLocalization.TOTAL.DESCRIPTION;

    /* End Inputs */

    /* Fields */

    public rating: number = 0;

    public value: number = 0;

    public total: number = 0;

    /* End Fields */

    ngOnInit(): void {
        const averageStatsValue: StatsValue = getAverageStatsValue(this.values),
            metadata: { [key: string]: IStatsMetadataModel } = getMetadata(averageStatsValue),
            metadataValues: IStatsMetadataModel[] = Object.values(metadata);

        this.rating = getRaiting(averageStatsValue);

        this.value = sum(metadataValues, (model: IStatsMetadataModel) => model.value);

        this.total = sum(metadataValues, (model: IStatsMetadataModel) => model.total);        
    }
}