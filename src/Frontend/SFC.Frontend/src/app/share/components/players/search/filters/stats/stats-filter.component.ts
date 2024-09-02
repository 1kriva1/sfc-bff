import { Component, OnInit } from "@angular/core";
import { ControlContainer, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { CommonConstants } from "ngx-sfc-common";
import { BaseFilterComponent } from "../base-filter.component";
import { FilterPart } from "../filter-part.enum";
import { StatsFilterConstants } from "./stats-filter.contants";
import { StatsFilterLocalization } from "./stats-filter.localization";
import { IStatsFilterModel } from "./stats-filter.model";

@Component({
    selector: 'sfc-stats-filter',
    templateUrl: './stats-filter.component.html',
    styleUrls: ['../base-filter.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class StatsFilterComponent
    extends BaseFilterComponent
    implements OnInit {

    FilterPart = FilterPart;
    Localization = StatsFilterLocalization;

    ngOnInit(): void {
        const controls: IForm<IStatsFilterModel> = {
            total: [{ from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT }],
            physical: [{ from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT }],
            mental: [{ from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT }],
            skill: [{ from: StatsFilterConstants.FROM_STATS_DEFAULT, to: StatsFilterConstants.TO_STATS_DEFAULT }],
            raiting: [null]
        };
        this.form.addControl(FilterPart.Stats, this.formBuilder.group(controls));
    }

    public generateRangeLabel(from: number, to: number): string {
        return `${StatsFilterLocalization.FROM}: ${from} - ${StatsFilterLocalization.TO}: ${to} ${CommonConstants.PERCENTAGE_SYMBOL}`;
    }
}