import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { TeamSearchFlterFinancialConstants } from "./team-search-filter-financial.constants";
import { TeamSearchFlterFinancialLocalization } from "./team-search-filter-financial.localization";
import { TeamSearchFilterPart } from "../../team-search-filter-part.enum";
import { ITeamSearchFilterFinancialModel } from "./team-search-filter-financial.model";
import { Direction } from "ngx-sfc-common";
import { buildTeamSearchFilterFinancialFormControls } from "./team-search-filter-financial.utils";
import { CoreConstants } from "@core/constants";

@Component({
    selector: 'sfc-team-search-filter-financial',
    templateUrl: './team-search-filter-financial.component.html',
    styleUrls: ['./team-search-filter-financial.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class TeamSearchFilterFinancialComponent implements OnInit {

    @Input()
    build: boolean = true;

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
        if (this.build) {
            this.buildFormGroup();
        }
    }

    private buildFormGroup(): void {
        const controls: IForm<ITeamSearchFilterFinancialModel> = buildTeamSearchFilterFinancialFormControls();
        this.parent.form.addControl(TeamSearchFilterPart.Financial, this.formBuilder.group(controls));
    }
}