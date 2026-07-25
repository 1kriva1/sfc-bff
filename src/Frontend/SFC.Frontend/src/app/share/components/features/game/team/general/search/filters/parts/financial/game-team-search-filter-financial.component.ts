import { Component, OnInit } from "@angular/core";
import { ControlContainer, FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { GameTeamSearchFlterFinancialConstants } from "./game-team-search-filter-financial.constants";
import { GameTeamSearchFlterFinancialLocalization } from "./game-team-search-filter-financial.localization";
import { IGameTeamSearchFilterFinancialModel } from "./game-team-search-filter-financial.model";
import { Direction } from "ngx-sfc-common";
import { buildGameTeamSearchFilterFinancialFormControls } from "./game-team-search-filter-financial.utils";
import { GameTeamFilterPart } from "../game-team-filter-part.enum";

@Component({
    selector: 'sfc-game-team-search-filter-financial',
    templateUrl: './game-team-search-filter-financial.component.html',
    styleUrls: ['./game-team-search-filter-financial.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class GameTeamSearchFilterFinancialComponent implements OnInit {

    // ngx-sfc-common
    Direction = Direction;

    // component
    Localization = GameTeamSearchFlterFinancialLocalization;
    Constants = GameTeamSearchFlterFinancialConstants;
    GameTeamFilterPart = GameTeamFilterPart;

    constructor(
        private parent: FormGroupDirective,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.buildFormGroup();
    }

    private buildFormGroup(): void {
        const controls: IForm<IGameTeamSearchFilterFinancialModel> = buildGameTeamSearchFilterFinancialFormControls();
        this.parent.form.addControl(GameTeamFilterPart.Financial, this.formBuilder.group(controls));
    }
}