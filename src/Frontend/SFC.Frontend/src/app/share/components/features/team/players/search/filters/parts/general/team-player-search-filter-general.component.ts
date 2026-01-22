import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { IBubbleModel } from "ngx-sfc-inputs";
import { mapBubbles } from "@share/utils/inputs";
import { EnumService } from "@share/services";
import { TeamPlayerSearchFlterGeneralLocalization } from "./team-player-search-filter-general.localization";
import { ITeamPlayerSearchFilterGeneralModel } from "./team-player-search-filter-general.model";
import { buildTeamPlayerSearchFilterGeneralFormControls } from "./team-player-search-filter-general.utils";
import { CoreConstants } from "@core/constants";
import { TeamPlayerFilterPart } from "../../enums/team-player-filter-part.enum";

@Component({
    selector: 'sfc-team-player-search-filter-general',
    templateUrl: './team-player-search-filter-general.component.html',
    styleUrls: ['./team-player-search-filter-general.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class TeamPlayerSearchFilterGeneralComponent implements OnInit {

    // share
    TeamPlayerFilterPart = TeamPlayerFilterPart;

    // component
    Localization = TeamPlayerSearchFlterGeneralLocalization;

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
        this.statuses = mapBubbles(this.enumService.enums.teamPlayerStatuses);
    }

    ngOnInit(): void {
        if (this.build) {
            this.buildFormGroup();
        }
    }

    private buildFormGroup(): void {
        const controls: IForm<ITeamPlayerSearchFilterGeneralModel> = buildTeamPlayerSearchFilterGeneralFormControls();
        this.parent.form.addControl(TeamPlayerFilterPart.General, this.formBuilder.group(controls));
    }
}