import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { IBubbleModel } from "ngx-sfc-inputs";
import { mapBubbles } from "@share/utils/inputs";
import { EnumService } from "@share/services";
import { CoreConstants } from "@core/constants";
import { InviteGameTeamFilterPart } from "../invite-game-team-filter-part.enum";
import { InviteGameTeamSearchFlterGeneralLocalization } from "./invite-game-team-search-filter-general.localization";
import { IInviteGameTeamSearchFilterGeneralModel } from "./invite-game-team-search-filter-general.model";
import { buildInviteGameTeamSearchFilterGeneralFormControls } from "./invite-game-team-search-filter-general.utils";

@Component({
    selector: 'sfc-invite-game-team-search-filter-general',
    templateUrl: './invite-game-team-search-filter-general.component.html',
    styleUrls: ['./invite-game-team-search-filter-general.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class InviteGameTeamSearchFilterGeneralComponent implements OnInit {

    // share
    InviteGameTeamFilterPart = InviteGameTeamFilterPart;

    // component
    Localization = InviteGameTeamSearchFlterGeneralLocalization;

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
        this.statuses = mapBubbles(this.enumService.enums.inviteStatuses);
    }

    ngOnInit(): void {
        if (this.build) {
            this.buildFormGroup();
        }
    }

    private buildFormGroup(): void {
        const controls: IForm<IInviteGameTeamSearchFilterGeneralModel> = buildInviteGameTeamSearchFilterGeneralFormControls();
        this.parent.form.addControl(InviteGameTeamFilterPart.General, this.formBuilder.group(controls));
    }
}