import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { IBubbleModel } from "ngx-sfc-inputs";
import { mapBubbles } from "@share/utils/inputs";
import { EnumService } from "@share/services";
import { CoreConstants } from "@core/constants";
import { GamePlayerFilterPart } from "../game-player-filter-part.enum";
import { GamePlayerSearchFlterGeneralLocalization } from "./game-player-search-filter-general.localization";
import { IGamePlayerSearchFilterGeneralModel } from "./game-player-search-filter-general.model";
import { buildGamePlayerSearchFilterGeneralFormControls } from "./game-player-search-filter-general.utils";

@Component({
    selector: 'sfc-game-player-search-filter-general',
    templateUrl: './game-player-search-filter-general.component.html',
    styleUrls: ['./game-player-search-filter-general.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class GamePlayerSearchFilterGeneralComponent implements OnInit {

    // share
    GamePlayerFilterPart = GamePlayerFilterPart;

    // component
    Localization = GamePlayerSearchFlterGeneralLocalization;

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
        this.statuses = mapBubbles(this.enumService.enums.gamePlayerStatuses);
    }

    ngOnInit(): void {
        if (this.build) {
            this.buildFormGroup();
        }
    }

    private buildFormGroup(): void {
        const controls: IForm<IGamePlayerSearchFilterGeneralModel> = buildGamePlayerSearchFilterGeneralFormControls();
        this.parent.form.addControl(GamePlayerFilterPart.General, this.formBuilder.group(controls));
    }
}