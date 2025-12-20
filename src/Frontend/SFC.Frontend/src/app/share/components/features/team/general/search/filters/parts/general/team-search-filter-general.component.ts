import { Component, OnInit } from "@angular/core";
import { ControlContainer, FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { Direction } from "ngx-sfc-common";
import { IBubbleModel } from "ngx-sfc-inputs";
import { TeamSearchFlterGeneralConstants } from "./team-search-filter-general.constants";
import { TeamSearchFlterGeneralLocalization } from "./team-search-filter-general.localization";
import { TeamSearchFilterPart } from "../../team-search-filter-part.enum";
import { ITeamSearchFilterGeneralModel } from "./team-search-filter-general.model";
import { ValidationConstants } from "@share/constants";
import { ShareLocalization, ValidationLocalization } from "@share/localization";
import { mapWeekDayBubbles, mapBubbles } from "@share/utils/inputs";
import { Locale } from "@core/enums";
import { StorageService } from "@core/services";
import { CoreConstants } from "@core/constants";
import { InputsLocalization } from "@share/localization/inputs.localization";
import { EnumService } from "@share/services";
import { buildTeamSearchFilterGeneralFormGroup } from "./team-search-filter-general.utils";

@Component({
    selector: 'sfc-team-search-filter-general',
    templateUrl: './team-search-filter-general.component.html',
    styleUrls: ['./team-search-filter-general.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class TeamSearchFilterGeneralComponent implements OnInit {

    // ngx-sfc-common
    Direction = Direction;

    // share
    ValidationConstants = ValidationConstants;
    ValidationLocalization = ValidationLocalization;
    InputLocalization = InputsLocalization;
    ShareLocalization = ShareLocalization;

    // component
    Localization = TeamSearchFlterGeneralLocalization;
    Constants = TeamSearchFlterGeneralConstants;
    TeamSearchFilterPart = TeamSearchFilterPart;

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
        const controls: IForm<ITeamSearchFilterGeneralModel> = buildTeamSearchFilterGeneralFormGroup(this.formBuilder);
        this.parent.form.addControl(TeamSearchFilterPart.General, this.formBuilder.group(controls));
    }
}