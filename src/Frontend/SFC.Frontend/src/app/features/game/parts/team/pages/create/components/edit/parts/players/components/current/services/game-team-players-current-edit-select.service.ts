import { Injectable } from "@angular/core";
import { IGamePlayerSearchTableModel } from "@share/components";
import { addItem, ObservableBehaviorModel, removeItem } from "ngx-sfc-common";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GameTeamPlayersCurrentEditSelectService {

    private model: ObservableBehaviorModel<IGamePlayerSearchTableModel[]> = new ObservableBehaviorModel<IGamePlayerSearchTableModel[]>([]);

    public get selected(): IGamePlayerSearchTableModel[] { return this.model.value || []; }

    public get selected$(): Observable<IGamePlayerSearchTableModel[]> { return this.model.value$.pipe(map(value => value || [])); } 

    public select(model: IGamePlayerSearchTableModel): void {
        if (addItem(this.selected, model)) {
            this.model.subject.next(this.selected);
        }
    }

    public unselect(model: IGamePlayerSearchTableModel): void {
        if (removeItem(this.selected, model)) {
            this.model.subject.next(this.selected);
        }
    }

    public clear(): void {
        this.model.subject.next([]);
    }
}