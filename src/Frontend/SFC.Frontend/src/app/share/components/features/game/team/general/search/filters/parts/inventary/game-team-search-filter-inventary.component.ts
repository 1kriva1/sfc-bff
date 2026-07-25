import { Component, OnInit } from "@angular/core";
import { ControlContainer, FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { GameTeamSearchFlterInventaryLocalization } from "./game-team-search-filter-inventary.localization";
import { IGameTeamSearchFilterInventaryModel } from "./game-team-search-filter-inventary.model";
import { IBubbleModel } from "ngx-sfc-inputs";
import { mapBubbles } from "@share/utils/inputs";
import { EnumService } from "@share/services";
import { buildGameTeamSearchFilterInventaryFormControls } from "./game-team-search-filter-inventary.utils";
import { GameTeamFilterPart } from "../game-team-filter-part.enum";

@Component({
    selector: 'sfc-game-team-search-filter-inventary',
    templateUrl: './game-team-search-filter-inventary.component.html',
    styleUrls: ['./game-team-search-filter-inventary.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class GameTeamSearchFilterInventaryComponent implements OnInit {

    // component
    Localization = GameTeamSearchFlterInventaryLocalization;
    GameTeamFilterPart = GameTeamFilterPart;

    public shirts: IBubbleModel[];

    constructor(
        private parent: FormGroupDirective,
        private formBuilder: FormBuilder,
        private enumService: EnumService
    ) {
        this.shirts = mapBubbles(this.enumService.enums.shirts);
    }

    ngOnInit(): void {
        this.buildFormGroup();
    }

    private buildFormGroup(): void {
        const controls: IForm<IGameTeamSearchFilterInventaryModel> = buildGameTeamSearchFilterInventaryFormControls();
        this.parent.form.addControl(GameTeamFilterPart.Inventary, this.formBuilder.group(controls));
    }
}