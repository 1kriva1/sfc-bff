import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StatsValue } from '../../../types';
import { IStatsTypeModel } from '../../../models';
import { EnumService } from '../../../services';
import { getAverageStatsValue, getTypes } from '../../../utils/stats';
import { getProgressColorDynamicallyFunc } from 'ngx-sfc-components';

@Component({
    selector: 'sfc-stats-skills',
    templateUrl: './stats-skills.component.html',
    styleUrls: ['./stats-skills.component.scss']
})
export class StatsSkillsComponent implements OnChanges {

    // ngx-sfc-components
    getProgressColorDynamicallyFunc = getProgressColorDynamicallyFunc;

    /* Inputs */

    @Input()
    values: StatsValue[] = [];

    /* End Inputs */

    /* Fields */

    public types: IStatsTypeModel[] = [];

    /* End Fields */

    constructor(private enumService: EnumService) { }

    ngOnChanges(_: SimpleChanges): void {
        const averageStatsValue: StatsValue = getAverageStatsValue(this.values);
        this.types = getTypes(averageStatsValue, this.enumService.enums.statTypes, this.enumService.enums.statSkills);
    }
}