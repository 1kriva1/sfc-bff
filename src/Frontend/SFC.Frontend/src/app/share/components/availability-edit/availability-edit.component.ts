import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAvailabilityEditFormModel } from './availability-edit-form.model';

@Component({
    selector: 'sfc-availability-edit',
    templateUrl: './availability-edit.component.html'
})
export class AvailabilityEditComponent {

    /* Inputs */

    @Input()
    value: IAvailabilityEditFormModel[] = [];

    /* End Inputs */

    /* Outputs */

    @Output()
    add: EventEmitter<IAvailabilityEditFormModel[]> = new EventEmitter<IAvailabilityEditFormModel[]>();

    @Output()
    remove: EventEmitter<IAvailabilityEditFormModel> = new EventEmitter<IAvailabilityEditFormModel>();

    /* End Outputs */

    public removeValue(model: IAvailabilityEditFormModel): void {
        this.remove.emit(model);
    }

    public addValue(models: IAvailabilityEditFormModel[]): void {
        this.add.emit(models);
    }
}