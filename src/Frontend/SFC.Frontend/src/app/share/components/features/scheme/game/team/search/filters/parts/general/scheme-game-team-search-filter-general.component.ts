import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { SchemeGameTeamSearchFilterGeneralLocalization } from "./scheme-game-team-search-filter-general.localization";
import { ISchemeGameTeamSearchFilterGeneralModel } from "./scheme-game-team-search-filter-general.model";
import { ValidationLocalization } from "@share/localization";
import { CoreConstants } from "@core/constants";
import { buildSchemeGameTeamSearchFilterGeneralFormControls } from "./scheme-game-team-search-filter-general.utils";
import { SchemeGameTeamSearchFilterPart } from "../../scheme-game-team-search-filter-part.enum";

@Component({
    selector: 'sfc-scheme-game-team-search-filter-general',
    templateUrl: './scheme-game-team-search-filter-general.component.html',
    styleUrls: ['./scheme-game-team-search-filter-general.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class SchemeGameTeamSearchFilterGeneralComponent implements OnInit {

    // share
    ValidationLocalization = ValidationLocalization;

    // component
    Localization = SchemeGameTeamSearchFilterGeneralLocalization;
    SchemeGameTeamSearchFilterPart = SchemeGameTeamSearchFilterPart;

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
        const controls: IForm<ISchemeGameTeamSearchFilterGeneralModel> = buildSchemeGameTeamSearchFilterGeneralFormControls();
        this.parent.form.addControl(SchemeGameTeamSearchFilterPart.General, this.formBuilder.group(controls));
    }
}