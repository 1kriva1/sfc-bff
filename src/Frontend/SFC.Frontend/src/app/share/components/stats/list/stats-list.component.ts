import { Component, Input, OnInit } from '@angular/core';
import { StatsValue } from '../../../types';
import { IStatsMetadataModel, IStatsModel } from '../../../models';
import { EnumService } from '../../../services';
import { getAverageStatsValue, getMetadata, getModel } from '../../../utils/stats';

@Component({
    selector: 'sfc-stats-list',
    templateUrl: './stats-list.component.html',
    styleUrls: ['./stats-list.component.scss']
})
export class StatsListComponent implements OnInit {

    /* Inputs */

    @Input()
    values: StatsValue[] = [];

    /* End Inputs */

    /* Fields */

    public model: IStatsModel[] = [];

    public metadata: { [key: string]: IStatsMetadataModel } = {};

    public stats: StatsValue = {};

    /* End Fields */

    constructor(private enumService: EnumService) { }

    ngOnInit(): void {
        this.stats = getAverageStatsValue(this.values);

        this.metadata = getMetadata(this.stats);

        this.model = getModel(this.enumService.enums.statTypes, this.enumService.enums.statCategories);
    }
}