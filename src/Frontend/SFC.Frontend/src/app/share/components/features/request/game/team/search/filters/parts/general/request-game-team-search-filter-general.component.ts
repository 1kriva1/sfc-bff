import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { IBubbleModel } from "ngx-sfc-inputs";
import { mapBubbles } from "@share/utils/inputs";
import { EnumService } from "@share/services";
import { CoreConstants } from "@core/constants";
import { RequestGameTeamFilterPart } from "../request-game-team-filter-part.enum";
import { RequestGameTeamSearchFlterGeneralLocalization } from "./request-game-team-search-filter-general.localization";
import { IRequestGameTeamSearchFilterGeneralModel } from "./request-game-team-search-filter-general.model";
import { buildRequestGameTeamSearchFilterGeneralFormControls } from "./request-game-team-search-filter-general.utils";

@Component({
    selector: 'sfc-request-game-team-search-filter-general',
    templateUrl: './request-game-team-search-filter-general.component.html',
    styleUrls: ['./request-game-team-search-filter-general.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class RequestGameTeamSearchFilterGeneralComponent implements OnInit {

    // share
    RequestGameTeamFilterPart = RequestGameTeamFilterPart;

    // component
    Localization = RequestGameTeamSearchFlterGeneralLocalization;

    /* Inputs */

    @Input()
    build: boolean = false;

    /* End Inputs */

    /* Fields */

    public statuses: IBubbleModel[];

    /* End Fields */

    constructor(
        private parent: FormGroupDirective,
        private formBuilder: FormBuilder,
        private enumService: EnumService
    ) {
        this.statuses = mapBubbles(this.enumService.enums.requestStatuses);
    }

    ngOnInit(): void {
        if (this.build) {
            this.buildFormGroup();
        }
    }

    private buildFormGroup(): void {
        const controls: IForm<IRequestGameTeamSearchFilterGeneralModel> = buildRequestGameTeamSearchFilterGeneralFormControls();
        this.parent.form.addControl(RequestGameTeamFilterPart.General, this.formBuilder.group(controls));
    }
}