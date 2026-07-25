import { Injectable } from "@angular/core";
import { IGamePlayerSearchTableModel } from "@share/components";
import { addItem, ObservableBehaviorModel, removeItem } from "ngx-sfc-common";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GameTeamPlayersGameSelectService {

    private model: ObservableBehaviorModel<IGamePlayerSearchTableModel[]> = new ObservableBehaviorModel<IGamePlayerSearchTableModel[]>([]);

    public get value(): IGamePlayerSearchTableModel[] { return this.model.value || []; }

    public get value$(): Observable<IGamePlayerSearchTableModel[]> { return this.model.value$.pipe(map(value => value || [])); }

    public select(model: IGamePlayerSearchTableModel): void {
        if (addItem(this.value, model)) {
            this.model.subject.next(this.value);
        }
    }

    public unselect(model: IGamePlayerSearchTableModel): void {
        if (removeItem(this.value, model)) {
            this.model.subject.next(this.value);
        }
    }

    public clear(): void {
        this.model.subject.next([]);
    }
}