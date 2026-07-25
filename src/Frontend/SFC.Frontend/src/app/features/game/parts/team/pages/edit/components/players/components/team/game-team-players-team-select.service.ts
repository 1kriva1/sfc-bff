import { Injectable } from "@angular/core";
import { ITeamPlayerSearchTableModel } from "@share/components";
import { addItem, ObservableBehaviorModel, removeItem } from "ngx-sfc-common";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GameTeamPlayersTeamSelectService {

    private model: ObservableBehaviorModel<ITeamPlayerSearchTableModel[]> = new ObservableBehaviorModel<ITeamPlayerSearchTableModel[]>([]);

    public get value(): ITeamPlayerSearchTableModel[] { return this.model.value || []; }

    public get value$(): Observable<ITeamPlayerSearchTableModel[]> { return this.model.value$.pipe(map(value => value || [])); }

    public select(model: ITeamPlayerSearchTableModel): void {
        if (addItem(this.value, model)) {
            this.model.subject.next(this.value);
        }
    }

    public unselect(model: ITeamPlayerSearchTableModel): void {
        if (removeItem(this.value, model)) {
            this.model.subject.next(this.value);
        }
    }

    public clear(): void {
        this.model.subject.next([]);
    }
}