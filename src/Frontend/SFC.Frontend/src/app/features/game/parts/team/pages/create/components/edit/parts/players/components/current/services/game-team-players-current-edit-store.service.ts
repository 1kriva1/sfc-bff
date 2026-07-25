import { Injectable } from "@angular/core";
import { IGamePlayerSearchTableModel } from "@share/components";
import { ObservableBehaviorModel, removeItem } from "ngx-sfc-common";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GameTeamPlayersCurrentEditStoreService {

    private model: ObservableBehaviorModel<IGamePlayerSearchTableModel[]> = new ObservableBehaviorModel<IGamePlayerSearchTableModel[]>([]);

    public get value(): IGamePlayerSearchTableModel[] { return this.model.value || []; }

    public get value$(): Observable<IGamePlayerSearchTableModel[]> { return this.model.value$.pipe(map(value => value || [])); }

    public add(models: IGamePlayerSearchTableModel[]): void {
        const newValue = this.value.concat(models);
        this.model.subject.next(newValue);
    }

    public remove(models: IGamePlayerSearchTableModel[]): void {
        models.forEach(model => removeItem(this.value, model));
        this.model.subject.next(this.value);
    }

    public clear(): void {
        this.model.subject.next([]);
    }
}