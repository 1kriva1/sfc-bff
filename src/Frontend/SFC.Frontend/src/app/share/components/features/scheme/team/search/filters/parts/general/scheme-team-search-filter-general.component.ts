import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { SchemeTeamSearchFilterGeneralLocalization } from "./scheme-team-search-filter-general.localization";
import { ISchemeTeamSearchFilterGeneralModel } from "./scheme-team-search-filter-general.model";
import { ValidationLocalization } from "@share/localization";
import { CoreConstants } from "@core/constants";
import { buildSchemeTeamSearchFilterGeneralFormControls } from "./scheme-team-search-filter-general.utils";
import { SchemeTeamSearchFilterPart } from "../../scheme-team-search-filter-part.enum";

@Component({
    selector: 'sfc-scheme-team-search-filter-general',
    templateUrl: './scheme-team-search-filter-general.component.html',
    styleUrls: ['./scheme-team-search-filter-general.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class SchemeTeamSearchFilterGeneralComponent implements OnInit {

    // share
    ValidationLocalization = ValidationLocalization;

    // component
    Localization = SchemeTeamSearchFilterGeneralLocalization;
    SchemeTeamSearchFilterPart = SchemeTeamSearchFilterPart;

    /* Inputs */

    @Input()
    build: boolean = false;

    /* End Inputs */

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
        const controls: IForm<ISchemeTeamSearchFilterGeneralModel> = buildSchemeTeamSearchFilterGeneralFormControls();
        this.parent.form.addControl(SchemeTeamSearchFilterPart.General, this.formBuilder.group(controls));
    }
}