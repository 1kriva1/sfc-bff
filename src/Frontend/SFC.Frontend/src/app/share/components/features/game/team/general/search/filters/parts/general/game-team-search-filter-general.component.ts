import { Component, OnInit } from "@angular/core";
import { ControlContainer, FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { Direction } from "ngx-sfc-common";
import { IBubbleModel } from "ngx-sfc-inputs";
import { GameTeamSearchFilterGeneralConstants } from "./game-team-search-filter-general.constants";
import { GameTeamSearchFilterGeneralLocalization } from "./game-team-search-filter-general.localization";
import { IGameTeamSearchFilterGeneralModel } from "./game-team-search-filter-general.model";
import { ValidationConstants } from "@share/constants";
import { ShareLocalization, ValidationLocalization } from "@share/localization";
import { mapWeekDayBubbles, mapBubbles } from "@share/utils/inputs";
import { Locale } from "@core/enums";
import { StorageService } from "@core/services";
import { CoreConstants } from "@core/constants";
import { InputsLocalization } from "@share/localization/inputs.localization";
import { EnumService } from "@share/services";
import { buildGameTeamSearchFilterGeneralFormControls } from "./game-team-search-filter-general.utils";
import { GameTeamFilterPart } from "../game-team-filter-part.enum";

@Component({
    selector: 'sfc-game-team-search-filter-general',
    templateUrl: './game-team-search-filter-general.component.html',
    styleUrls: ['./game-team-search-filter-general.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class GameTeamSearchFilterGeneralComponent implements OnInit {

    // ngx-sfc-common
    Direction = Direction;

    // share
    ValidationConstants = ValidationConstants;
    ValidationLocalization = ValidationLocalization;
    InputLocalization = InputsLocalization;
    ShareLocalization = ShareLocalization;

    // component
    Localization = GameTeamSearchFilterGeneralLocalization;
    Constants = GameTeamSearchFilterGeneralConstants;
    GameTeamFilterPart = GameTeamFilterPart;

    public weekDays: IBubbleModel[];

    public statuses: IBubbleModel[];

    public locale: Locale;

    constructor(
        private parent: FormGroupDirective,
        private formBuilder: FormBuilder,
        private storageService: StorageService,
        private enumService: EnumService
    ) {
        this.locale = this.storageService.getWithDefault<Locale>(CoreConstants.LOCALE_KEY, Locale.English);
        this.weekDays = mapWeekDayBubbles();
        this.statuses = mapBubbles(this.enumService.enums.teamStatuses);
    }

    ngOnInit(): void {
        this.buildFormGroup();
    }

    private buildFormGroup(): void {
        const controls: IForm<IGameTeamSearchFilterGeneralModel> = buildGameTeamSearchFilterGeneralFormControls(this.formBuilder);
        this.parent.form.addControl(GameTeamFilterPart.General, this.formBuilder.group(controls));
    }
}