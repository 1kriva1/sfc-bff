import { Component, OnInit } from "@angular/core";
import { ControlContainer, FormBuilder, FormGroupDirective, Validators } from "@angular/forms";
import { IForm } from "@core/types";
import { Compare, Direction, nameof } from "ngx-sfc-common";
import { compareThan, IBubbleModel, maxArrayLength } from "ngx-sfc-inputs";
import { TeamSearchFlterGeneralConstants } from "./team-search-filter-general.constants";
import { TeamSearchFlterGeneralLocalization } from "./team-search-filter-general.localization";
import { TeamSearchFilterPart } from "../../team-search-filter-part.enum";
import { ITeamSearchFilterGeneralModel } from "./team-search-filter-general.model";
import { ValidationConstants } from "@share/constants";
import { ShareLocalization, ValidationLocalization } from "@share/localization";
import { mapWeekDayBubbles } from "@share/utils/inputs";
import { Locale } from "@core/enums";
import { StorageService } from "@core/services";
import { CoreConstants } from "@core/constants";
import { IAvailabilityLimitModel } from "@share/models/common/availability-limit.model";
import { InputsLocalization } from "@share/localization/inputs.localization";

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

    public locale: Locale;

    constructor(
        private parent: FormGroupDirective,
        private formBuilder: FormBuilder,
        private storageService: StorageService
    ) {
        this.locale = this.storageService.getWithDefault<Locale>(CoreConstants.LOCALE_KEY, Locale.English);
        this.weekDays = mapWeekDayBubbles();
    }

    ngOnInit(): void {
        this.buildFormGroup();
    }

    private buildFormGroup(): void {
        const availabilityControls: IForm<IAvailabilityLimitModel> = {
            days: [null],
            from: [null, [compareThan(nameof<IAvailabilityLimitModel>('to'), Compare.Less)]],
            to: [null, [compareThan(nameof<IAvailabilityLimitModel>('from'), Compare.More, true)]]
        }, controls: IForm<ITeamSearchFilterGeneralModel> = {
            city: [null, [Validators.maxLength(ValidationConstants.MAX_CITY_LENGTH)]],
            tags: [null, [maxArrayLength(ValidationConstants.MAX_TAGS_LENGTH)]],
            availability: this.formBuilder.group(availabilityControls),
            hasLogo: [null],
            locationId: [null]
        };

        this.parent.form.addControl(TeamSearchFilterPart.General, this.formBuilder.group(controls));
    }
}