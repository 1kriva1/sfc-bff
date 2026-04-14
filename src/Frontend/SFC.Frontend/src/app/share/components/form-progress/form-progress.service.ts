import { Injectable } from "@angular/core";
import { ObservableBehaviorModel } from "ngx-sfc-common";
import { Observable } from "rxjs";
import { IFormProgressStepModel } from "./parts/step/form-progress-step.model";
import { Router } from "@angular/router";
import { navigateWithOneTimeAccess } from "@core/utils";
import { OneTimeAccessService } from "@core/guards/allow-access/one-time-access.guard";
import { IFormProgressModel } from "./form-progress.model";

@Injectable({
    providedIn: 'root'
})
export class FormProgressService {

    private model: ObservableBehaviorModel<IFormProgressModel[]> = new ObservableBehaviorModel<IFormProgressModel[]>();

    public get steps$(): Observable<IFormProgressModel[]> { return this.model.value$; }

    constructor(private router: Router, private oneTimeAccessService: OneTimeAccessService) { }

    public init(models: IFormProgressStepModel[]): void {
        const data: IFormProgressModel[] = models.map((step, index) => ({ step: step, selected: index == 0, pristine: index != 0 }));
        this.model.subject.next(data);
    }

    public navigate(model: IFormProgressStepModel): void {
        const data: IFormProgressModel[] = this.model.subject.value.map((item: IFormProgressModel) =>
            item.step.key === model.key ? { ...item, selected: true, pristine: false } : { ...item, selected: false }
        );

        this.model.subject.next(data);

        if (model.command) {
            navigateWithOneTimeAccess(this.router, this.oneTimeAccessService, model.command);
        }
    }
}