import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StatsValue } from '../../../types';
import { IStatsTypeModel } from '../../../models';
import { EnumService } from '../../../services';
import { getTypes } from '../../../utils';
import { getProgressColorDynamicallyFunc } from 'ngx-sfc-components';

@Component({
    selector: 'sfc-stats-skills',
    templateUrl: './stats-skills.component.html',
    styleUrls: ['./stats-skills.component.scss']
})
export class StatsSkillsComponent implements OnChanges {

    getProgressColorDynamicallyFunc = getProgressColorDynamicallyFunc;

    @Input()
    value: StatsValue = {};

    public types: IStatsTypeModel[] = [];

    constructor(private enumService: EnumService) { }

    ngOnChanges(_: SimpleChanges): void {
        this.types = getTypes(this.value, this.enumService.enums.statTypes, this.enumService.enums.statSkills);
    }
}