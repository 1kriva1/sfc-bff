import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { EnumService } from "@share/services";
import { CoreConstants } from "@core/constants";
import { GameTeamPlayerFilterPart } from "../game-team-player-filter-part.enum";
import { GameTeamPlayerSearchFlterGeneralLocalization } from "./game-team-player-search-filter-general.localization";
import { IGameTeamPlayerSearchFilterGeneralModel } from "./game-team-player-search-filter-general.model";
import { buildGameTeamPlayerSearchFilterGeneralFormControls } from "./game-team-player-search-filter-general.utils";

@Component({
    selector: 'sfc-game-team-player-search-filter-general',
    templateUrl: './game-team-player-search-filter-general.component.html',
    styleUrls: ['./game-team-player-search-filter-general.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class GameTeamPlayerSearchFilterGeneralComponent implements OnInit {

    // share
    GameTeamPlayerFilterPart = GameTeamPlayerFilterPart;

    // component
    Localization = GameTeamPlayerSearchFlterGeneralLocalization;

    /* Inputs */

    @Input()
    build: boolean = false;

    /* End Inputs */

    constructor(
        private parent: FormGroupDirective,
        private formBuilder: FormBuilder,
        private enumService: EnumService
    ) {
    }

    ngOnInit(): void {
        if (this.build) {
            this.buildFormGroup();
        }
    }

    private buildFormGroup(): void {
        const controls: IForm<IGameTeamPlayerSearchFilterGeneralModel> = buildGameTeamPlayerSearchFilterGeneralFormControls();
        this.parent.form.addControl(GameTeamPlayerFilterPart.General, this.formBuilder.group(controls));
    }
}