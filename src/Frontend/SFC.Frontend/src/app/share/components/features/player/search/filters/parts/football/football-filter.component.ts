import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroupDirective } from "@angular/forms";
import { CoreConstants } from "@core/constants";
import { IForm } from "@core/types";
import { EnumService } from "@share/services";
import { IBubbleModel } from "ngx-sfc-inputs";
import { BaseFilterComponent } from "../../base/base-filter.component";
import { PlayersFilterPart } from "../../enums/players-filter-part.enum";
import { FootballFilterConstants } from "./football-filter.constants";
import { FootballFilterLocalization } from "./football-filter.localization";
import { IFootballFilterModel } from "./football-filter.model";
import { buildPlayerSearchFilterFootballFormControls } from "./football-filter.utils";

@Component({
    selector: 'sfc-football-filter',
    templateUrl: './football-filter.component.html',
    styleUrls: ['../../base/base-filter.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class FootballFilterComponent
    extends BaseFilterComponent
    implements OnInit {
        
    Constants = FootballFilterConstants;
    Localization = FootballFilterLocalization;

    constructor(
        parent: FormGroupDirective,
        formBuilder: FormBuilder,
        public enumService: EnumService) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        if (this.build) {
            this.buildFormGroup();
        }
    }

    public POSITIONS: IBubbleModel[] = this.enumService.enums.footballPositions
        .map(d => ({ key: d.key, label: d.value, imageSrc: d.image }));

    public GAME_STYLES: IBubbleModel[] = this.enumService.enums.gameStyles
        .map(d => ({ key: d.key, label: d.value, imageSrc: d.image }));

    public generateHeightRangeLabel(from: number, to: number): string {
        return this.generateSizeRangeLabel(from, to, this.Localization.CM);
    }

    public generateWeightRangeLabel(from: number, to: number): string {
        return this.generateSizeRangeLabel(from, to, this.Localization.KG);
    }

    private buildFormGroup(): void {
        const controls: IForm<IFootballFilterModel> = buildPlayerSearchFilterFootballFormControls();
        this.form.addControl(PlayersFilterPart.Football, this.formBuilder.group(controls));
    }

    private generateSizeRangeLabel(from: number, to: number, units: string): string {
        return `${this.Localization.FROM}: ${from} - ${this.Localization.TO}: ${to} ${units}`;
    }
}