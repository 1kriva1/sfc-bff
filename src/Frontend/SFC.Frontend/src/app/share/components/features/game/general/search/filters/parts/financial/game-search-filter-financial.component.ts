import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { GameSearchFlterFinancialConstants } from "./game-search-filter-financial.constants";
import { GameSearchFlterFinancialLocalization } from "./game-search-filter-financial.localization";
import { IGameSearchFilterFinancialModel } from "./game-search-filter-financial.model";
import { Direction } from "ngx-sfc-common";
import { buildGameSearchFilterFinancialFormControls } from "./game-search-filter-financial.utils";
import { CoreConstants } from "@core/constants";
import { GameSearchFilterPart } from "../../game-search-filter-part.enum";
import { generateMultipleLabel } from "@share/utils";
import { GameSearchFilterFinancialPart } from "./game-search-filter-financial-part.enum";

@Component({
    selector: 'sfc-game-search-filter-financial',
    templateUrl: './game-search-filter-financial.component.html',
    styleUrls: ['./game-search-filter-financial.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class GameSearchFilterFinancialComponent implements OnInit {

    @Input()
    build: boolean = true;

    @Input()
    parts: GameSearchFilterFinancialPart[] = [];

    // ngx-sfc-common
    Direction = Direction;

    // component
    Localization = GameSearchFlterFinancialLocalization;
    Constants = GameSearchFlterFinancialConstants;
    GameSearchFilterPart = GameSearchFilterPart;
    GameSearchFilterFinancialPart = GameSearchFilterFinancialPart;

    public generatePayAmountRangeLabel: (from: number, to: number) => string = generateMultipleLabel;

    constructor(
        private parent: FormGroupDirective,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        if (this.build) {
            this.buildFormGroup();
        }
    }

    public isPartVisible(part: GameSearchFilterFinancialPart): boolean {
        return this.parts.length === 0 || this.parts.includes(part);
    }

    private buildFormGroup(): void {
        const controls: IForm<IGameSearchFilterFinancialModel> = buildGameSearchFilterFinancialFormControls();
        this.parent.form.addControl(GameSearchFilterPart.Financial, this.formBuilder.group(controls));
    }
}