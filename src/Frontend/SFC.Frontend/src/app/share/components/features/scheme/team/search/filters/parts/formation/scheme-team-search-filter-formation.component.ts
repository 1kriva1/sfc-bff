import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { SchemeTeamSearchFilterFormationLocalization } from "./scheme-team-search-filter-formation.localization";
import { ISchemeTeamSearchFilterFormationModel } from "./scheme-team-search-filter-formation.model";
import { ValidationLocalization } from "@share/localization";
import { CoreConstants } from "@core/constants";
import { buildSchemeTeamSearchFilterFormationFormControls } from "./scheme-team-search-filter-formation.utils";
import { SchemeTeamSearchFilterPart } from "../../scheme-team-search-filter-part.enum";
import { ISelectItemModel } from "ngx-sfc-inputs";
import { EnumService } from "@share/services";
import { generateMultipleLabel, mapFormationSelectItems } from "@share/utils";
import { CoreLocalization } from "@core/localization";

@Component({
    selector: 'sfc-scheme-team-search-filter-formation',
    templateUrl: './scheme-team-search-filter-formation.component.html',
    styleUrls: ['./scheme-team-search-filter-formation.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class SchemeTeamSearchFilterFormationComponent implements OnInit {

    // core
    CoreLocalization = CoreLocalization;

    // share
    ValidationLocalization = ValidationLocalization;

    // component
    Localization = SchemeTeamSearchFilterFormationLocalization;
    SchemeTeamSearchFilterPart = SchemeTeamSearchFilterPart;

    /* Inputs */

    @Input()
    build: boolean = false;

    /* End Inputs */

    /* Fields */

    public formations: ISelectItemModel[] = [];

    public generateRaitingLabel: (from: number, to: number) => string = generateMultipleLabel;

    /* End Fields */

    constructor(
        private parent: FormGroupDirective,
        private formBuilder: FormBuilder,
        private enumService: EnumService
    ) { }

    ngOnInit(): void {
        if (this.build) {
            this.buildFormGroup();
        }

        this.formations = mapFormationSelectItems(this.enumService.enums.formations);
    }

    private buildFormGroup(): void {
        const controls: IForm<ISchemeTeamSearchFilterFormationModel> = buildSchemeTeamSearchFilterFormationFormControls();
        this.parent.form.addControl(SchemeTeamSearchFilterPart.Formation, this.formBuilder.group(controls));
    }
}