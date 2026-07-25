import { Injectable } from "@angular/core";
import { IGameTeamPlayerSearchTableModel } from "@share/components";
import { addItem, ObservableBehaviorModel, removeItem } from "ngx-sfc-common";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GameTeamEditPlayersCurrentSelectService {

    private model: ObservableBehaviorModel<IGameTeamPlayerSearchTableModel[]> = new ObservableBehaviorModel<IGameTeamPlayerSearchTableModel[]>([]);

    public get value(): IGameTeamPlayerSearchTableModel[] { return this.model.value || []; }

    public get value$(): Observable<IGameTeamPlayerSearchTableModel[]> { return this.model.value$.pipe(map(value => value || [])); }

    public select(model: IGameTeamPlayerSearchTableModel): void {
        if (addItem(this.value, model)) {
            this.model.subject.next(this.value);
        }
    }

    public unselect(model: IGameTeamPlayerSearchTableModel): void {
        if (removeItem(this.value, model)) {
            this.model.subject.next(this.value);
        }
    }

    public clear(): void {
        this.model.subject.next([]);
    }
}