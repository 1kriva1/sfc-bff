import { Injectable } from "@angular/core";
import { ObservableModel } from "ngx-sfc-common";
import { Observable } from "rxjs";
import { IAvailabilityEditFormModel } from "./availability-edit-form.model";

@Injectable({
    providedIn: 'root'
})
export class AvailabilityEditService {

    private addModel: ObservableModel<IAvailabilityEditFormModel> = new ObservableModel<IAvailabilityEditFormModel>();

    private removeModel: ObservableModel<IAvailabilityEditFormModel> = new ObservableModel<IAvailabilityEditFormModel>();

    public get add$(): Observable<IAvailabilityEditFormModel | null> { return this.addModel.value$; }

    public get remove$(): Observable<IAvailabilityEditFormModel | null> { return this.removeModel.value$; }

    public add(model: IAvailabilityEditFormModel): void {
        this.addModel.subject.next(model);
    }

    public remove(model: IAvailabilityEditFormModel): void {
        this.removeModel.subject.next(model);
    }
}