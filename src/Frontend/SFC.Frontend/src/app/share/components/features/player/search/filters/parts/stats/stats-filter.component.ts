import { Component, OnInit } from "@angular/core";
import { CoreConstants } from "@core/constants";
import { IForm } from "@core/types";
import { CommonConstants } from "ngx-sfc-common";
import { BaseFilterComponent } from "../../base/base-filter.component";
import { PlayersFilterPart } from "../../enums/players-filter-part.enum";
import { StatsFilterLocalization } from "./stats-filter.localization";
import { IStatsFilterModel } from "./stats-filter.model";
import { buildPlayerSearchFilterStatsFormControls } from "./stats-filter.utils";

@Component({
    selector: 'sfc-stats-filter',
    templateUrl: './stats-filter.component.html',
    styleUrls: ['../../base/base-filter.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class StatsFilterComponent
    extends BaseFilterComponent
    implements OnInit {

    Localization = StatsFilterLocalization;

    ngOnInit(): void {
        if (this.build) {
            this.buildFormGroup();
        }
    }

    public generateRangeLabel(from: number, to: number): string {
        return `${StatsFilterLocalization.FROM}: ${from} - ${StatsFilterLocalization.TO}: ${to} ${CommonConstants.PERCENTAGE_SYMBOL}`;
    }

    private buildFormGroup(): void {
        const controls: IForm<IStatsFilterModel> = buildPlayerSearchFilterStatsFormControls();
        this.form.addControl(PlayersFilterPart.Stats, this.formBuilder.group(controls));
    }
}