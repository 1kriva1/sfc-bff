import { Injectable } from "@angular/core";
import { empty, isDefined, ObservableBehaviorModel } from "ngx-sfc-common";
import { Observable } from "rxjs";
import { TeamCreatePageFormModel } from "./team-create-page-form.model";

@Injectable({
    providedIn: 'root'
})
export class TeamCreatePageService {

    private model: ObservableBehaviorModel<TeamCreatePageFormModel | null> = new ObservableBehaviorModel<TeamCreatePageFormModel| null>();

    public get value(): TeamCreatePageFormModel | empty { return this.model.value; }

    public get value$(): Observable<TeamCreatePageFormModel | empty> { return this.model.value$; }

    public get exist(): boolean { return isDefined(this.value); }

    public save(value: TeamCreatePageFormModel): void {
        this.model.subject.next(value);
    }

    public clear(): void {
        this.model.subject.next(null);
    }
}