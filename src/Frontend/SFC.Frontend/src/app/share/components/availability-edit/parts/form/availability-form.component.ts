import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
    ButtonType, Compare, empty, firstOrDefault, hasItem, isDefined, isTimeGreatOrEqual,
    isTimeLessOrEqual, nameof, NotificationType, setHours
} from "ngx-sfc-common";
import { CommonValidator, compareThan, IBubbleModel, IDateTimeModalButtonsModel } from "ngx-sfc-inputs";
import { CoreConstants } from "@core/constants";
import { Locale } from "@core/enums";
import { StorageService } from "@core/services";
import { IEnumModel, IForm } from "@core/types";
import { getWeekDay, getWeekDays, markControlTouchedAndDirty } from "@core/utils";
import { IAvailabilityEditFormModel } from "../../availability-edit-form.model";
import { AvailabilityFormConstants } from "./availability-form.constants";
import { AvailabilityFormLocalization } from "./availability-form.localization";
import { IAvailabilityFormModel } from "./availability-form.model";
import { ValidationLocalization } from "../../../../localization";
import { mapBubbles } from "@share/utils/inputs";
import { CoreLocalization } from "@core/localization";
import { AvailabilityEditService } from "../../availability-edit.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'sfc-availability-form',
    templateUrl: './availability-form.component.html',
    styleUrls: ['./availability-form.component.scss']
})
export class AvailabilityFormComponent implements OnInit, OnDestroy {

    // icons
    faPlus = faPlus;

    // ngx-sfc-common
    ButtonType = ButtonType;
    NotificationType = NotificationType;

    // ngx-sfc-inputs
    CommonValidator = CommonValidator;

    // core
    CoreLocalization = CoreLocalization;

    // shared
    ValidationLocalization = ValidationLocalization;

    // component
    Constants = AvailabilityFormConstants;
    Localization = AvailabilityFormLocalization;

    /* Inputs */

    @Input()
    value: IAvailabilityEditFormModel[] = [];

    /* End Inputs */

    /* Outputs */

    @Output()
    add: EventEmitter<IAvailabilityEditFormModel[]> = new EventEmitter<IAvailabilityEditFormModel[]>();

    /* End Outputs */

    /* Form */

    public form: FormGroup;

    public submitted: boolean = false;

    /* End Form */

    /* Properties */

    // days
    public days: IBubbleModel[] = [];

    // from/to datetimes
    public locale: Locale = Locale.English;

    public get defaultFromDate(): Date { return new Date(); };

    public get defaultToDate(): Date {
        const fromDate = this.defaultFromDate;
        return setHours(this.defaultFromDate, fromDate.getHours() + AvailabilityFormConstants.DEFAULT_TO_DATE_HOURS_DIFFERENCE);
    };

    public modalButtonsModel: IDateTimeModalButtonsModel = {
        okLabel: CoreLocalization.OK,
        cancelLabel: CoreLocalization.CANCEL
    };

    public get submitButtonDisabled(): boolean { return this.submitted && this.form.invalid; }

    /* End Properties */

    _subscription: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private storageService: StorageService,
        private availabilityEditService: AvailabilityEditService) {
        this.form = this.buildForm();
        this._subscription = this.availabilityEditService.remove$
            .subscribe((_: IAvailabilityEditFormModel | null) => this.validate());
    }

    ngOnInit(): void {
        const weekDays: IEnumModel<number>[] = getWeekDays();
        this.days = mapBubbles(weekDays);
        this.locale = this.storageService.getWithDefault<Locale>(CoreConstants.LOCALE_KEY, Locale.English);
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    public addValue(): void {
        const days: AbstractControl = markControlTouchedAndDirty(this.form, nameof<IAvailabilityFormModel>('days'))!,
            from: AbstractControl = markControlTouchedAndDirty(this.form, nameof<IAvailabilityFormModel>('from'))!,
            to: AbstractControl = markControlTouchedAndDirty(this.form, nameof<IAvailabilityFormModel>('to'))!;

        this.submitted = true;

        if (this.form.valid && this.validate()) {
            const items: IAvailabilityEditFormModel[] = this.form.value.days.map((day: number) => ({
                day: day,
                from: this.form.value.from,
                to: this.form.value.to
            }));

            this.value.push(...items);
            this.add.emit(items);
            this.reset(days, from, to);
        }
    }

    private validate(): boolean {
        const model: IAvailabilityEditFormModel | empty =
            firstOrDefault(this.value, (model: IAvailabilityEditFormModel) => {
                const daysAlreadyExist: boolean = hasItem(this.form.value.days, model.day);

                if (daysAlreadyExist) {
                    const fromAlreadyExist: boolean = isTimeGreatOrEqual(this.form.value.from, model.from)
                        && isTimeLessOrEqual(this.form.value.from, model.to),
                        toAlreadyExist: boolean = isTimeLessOrEqual(this.form.value.to, model.to)
                            && isTimeGreatOrEqual(this.form.value.to, model.from);

                    return fromAlreadyExist || toAlreadyExist;
                }

                return daysAlreadyExist;
            }),
            errors: ValidationErrors | null = model ? this.buildValidationErrors(model) : null;

        this.form.setErrors(errors);

        return !isDefined(errors);
    }

    private buildForm(): FormGroup {
        const controls: IForm<IAvailabilityFormModel> = {
            days: [null, [Validators.required]],
            from: [null, [Validators.required, compareThan(nameof<IAvailabilityFormModel>('to'), Compare.Less)]],
            to: [null, [Validators.required, compareThan(nameof<IAvailabilityFormModel>('from'), Compare.More, true)]]
        };

        return this.formBuilder.group(controls);
    }

    private buildValidationErrors(model: IAvailabilityEditFormModel): ValidationErrors {
        const day: IEnumModel<number> = getWeekDay(model.day),
            from: string = model.from.toLocaleTimeString(this.locale, CoreConstants.DATE_TIME_FORMAT_OPTIONS),
            to: string = model.to.toLocaleTimeString(this.locale, CoreConstants.DATE_TIME_FORMAT_OPTIONS);

        return { [CommonValidator.Exist]: `${AvailabilityFormLocalization.VALIDATION.ALREADY_EXIST_PART_1} ${day.value} ${CoreLocalization.FROM} ${from} ${CoreLocalization.TO} ${to}.` }
    }

    private reset(days: AbstractControl, from: AbstractControl, to: AbstractControl): void {
        days.markAsPristine();
        from.markAsPristine();
        to.markAsPristine();

        this.form.setValue({ days: [], from: null, to: null });
        this.submitted = false;
    }
}