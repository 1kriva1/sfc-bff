import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { SchemeGameTeamSearchFilterFormationLocalization } from "./scheme-game-team-search-filter-formation.localization";
import { ISchemeGameTeamSearchFilterFormationModel } from "./scheme-game-team-search-filter-formation.model";
import { ValidationLocalization } from "@share/localization";
import { CoreConstants } from "@core/constants";
import { buildSchemeGameTeamSearchFilterFormationFormControls } from "./scheme-game-team-search-filter-formation.utils";
import { SchemeGameTeamSearchFilterPart } from "../../scheme-game-team-search-filter-part.enum";
import { ISelectItemModel } from "ngx-sfc-inputs";
import { EnumService } from "@share/services";
import { generateMultipleLabel, mapFormationSelectItems } from "@share/utils";
import { CoreLocalization } from "@core/localization";

@Component({
    selector: 'sfc-scheme-game-team-search-filter-formation',
    templateUrl: './scheme-game-team-search-filter-formation.component.html',
    styleUrls: ['./scheme-game-team-search-filter-formation.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class SchemeGameTeamSearchFilterFormationComponent implements OnInit {

    // core
    CoreLocalization = CoreLocalization;

    // share
    ValidationLocalization = ValidationLocalization;

    // component
    Localization = SchemeGameTeamSearchFilterFormationLocalization;
    SchemeGameTeamSearchFilterPart = SchemeGameTeamSearchFilterPart;

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
        const controls: IForm<ISchemeGameTeamSearchFilterFormationModel> = buildSchemeGameTeamSearchFilterFormationFormControls();
        this.parent.form.addControl(SchemeGameTeamSearchFilterPart.Formation, this.formBuilder.group(controls));
    }
}