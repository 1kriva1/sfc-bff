import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonType, ComponentSize, nameof, removeItem, SortingDirection } from "ngx-sfc-common";
import { CoreConstants } from "@core/constants";
import { Locale } from "@core/enums";
import { StorageService } from "@core/services";
import { IEnumModel } from "@core/types";
import { getWeekDays } from "@core/utils";
import { faCalendarDay, faTimes } from "@fortawesome/free-solid-svg-icons";
import { IAvailabilityEditFormModel } from "../../availability-edit-form.model";
import { AvailabilityListLocalization } from "./availability-list.localization";
import { AvailabilityEditService } from "../../availability-edit.service";
import { CoreLocalization } from "@core/localization";

@Component({
    selector: 'sfc-availability-list',
    templateUrl: './availability-list.component.html',
    styleUrls: ['./availability-list.component.scss']
})
export class AvailabilityListComponent {

    // icons
    faCalendarDay = faCalendarDay;
    faTimes = faTimes;

    // ngx-sfc-common
    ComponentSize = ComponentSize;
    ButtonType = ButtonType;
    SortingDirection = SortingDirection;

    // core
    CoreConstants = CoreConstants;
    CoreLocalization = CoreLocalization;

    // component
    Localization = AvailabilityListLocalization;

    /* Inputs */

    @Input()
    value: IAvailabilityEditFormModel[] = [];

    @Input()
    edit: boolean = true;

    @Input()
    delimeter: boolean = true;

    @Input()
    noData: boolean = false;

    /* End Inputs */

    /* Outputs */

    @Output()
    removed: EventEmitter<IAvailabilityEditFormModel> = new EventEmitter<IAvailabilityEditFormModel>();

    /* End Outputs */

    /* Properties */

    public weekDays: IEnumModel<number>[];

    public locale: Locale;

    public sortingPath: string = nameof<IAvailabilityEditFormModel>('day');

    /* End Properties */

    constructor(private storageService: StorageService, private availabilityEditService: AvailabilityEditService) {
        this.locale = this.storageService.getWithDefault<Locale>(CoreConstants.LOCALE_KEY, Locale.English);
        this.weekDays = getWeekDays();
    }

    public remove(model: IAvailabilityEditFormModel): void {
        removeItem(this.value, model);
        this.availabilityEditService.remove(model);
        this.removed.emit(model);
    }
}