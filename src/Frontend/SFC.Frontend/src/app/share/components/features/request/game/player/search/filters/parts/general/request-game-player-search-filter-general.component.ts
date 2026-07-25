import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { IBubbleModel } from "ngx-sfc-inputs";
import { mapBubbles } from "@share/utils/inputs";
import { EnumService } from "@share/services";
import { CoreConstants } from "@core/constants";
import { RequestGamePlayerFilterPart } from "../request-game-player-filter-part.enum";
import { RequestGamePlayerSearchFlterGeneralLocalization } from "./request-game-player-search-filter-general.localization";
import { IRequestGamePlayerSearchFilterGeneralModel } from "./request-game-player-search-filter-general.model";
import { buildRequestGamePlayerSearchFilterGeneralFormControls } from "./request-game-player-search-filter-general.utils";

@Component({
    selector: 'sfc-request-game-player-search-filter-general',
    templateUrl: './request-game-player-search-filter-general.component.html',
    styleUrls: ['./request-game-player-search-filter-general.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class RequestGamePlayerSearchFilterGeneralComponent implements OnInit {

    // share
    RequestGamePlayerFilterPart = RequestGamePlayerFilterPart;

    // component
    Localization = RequestGamePlayerSearchFlterGeneralLocalization;

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
        const controls: IForm<IRequestGamePlayerSearchFilterGeneralModel> = buildRequestGamePlayerSearchFilterGeneralFormControls();
        this.parent.form.addControl(RequestGamePlayerFilterPart.General, this.formBuilder.group(controls));
    }
}