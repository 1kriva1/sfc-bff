import { Component, OnInit } from "@angular/core";
import { ControlContainer, FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { TeamSearchFlterFinancialConstants } from "./team-search-filter-financial.constants";
import { TeamSearchFlterFinancialLocalization } from "./team-search-filter-financial.localization";
import { TeamSearchFilterPart } from "../../team-search-filter-part.enum";
import { ITeamSearchFilterFinancialModel } from "./team-search-filter-financial.model";
import { Direction } from "ngx-sfc-common";

@Component({
    selector: 'sfc-team-search-filter-financial',
    templateUrl: './team-search-filter-financial.component.html',
    styleUrls: ['./team-search-filter-financial.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class TeamSearchFilterFinancialComponent implements OnInit {

    // ngx-sfc-common
    Direction = Direction;

    // component
    Localization = TeamSearchFlterFinancialLocalization;
    Constants = TeamSearchFlterFinancialConstants;
    TeamSearchFilterPart = TeamSearchFilterPart;

    constructor(
        private parent: FormGroupDirective,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.buildFormGroup();
    }

    private buildFormGroup(): void {
        const controls: IForm<ITeamSearchFilterFinancialModel> = {
            freePlay: [null]
        };

        this.parent.form.addControl(TeamSearchFilterPart.Financial, this.formBuilder.group(controls));
    }
}