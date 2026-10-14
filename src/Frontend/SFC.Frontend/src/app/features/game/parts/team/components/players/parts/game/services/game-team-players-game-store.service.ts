import { Injectable } from "@angular/core";
import { ObservableBehaviorModel, removeItem } from "ngx-sfc-common";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GameTeamPlayersGameStoreService {

    private model: ObservableBehaviorModel<number[]> = new ObservableBehaviorModel<number[]>([]);

    public get value(): number[] { return this.model.value || []; }

    public get value$(): Observable<number[]> { return this.model.value$.pipe(map(value => value || [])); }

    public add(models: number[]): void {
        const newValue = this.value.concat(models);
        this.model.subject.next(newValue);
    }

    public remove(models: number[]): void {
        models.forEach(model => removeItem(this.value, model));
        this.model.subject.next(this.value);
    }

    public clear(): void {
        this.model.subject.next([]);
    }
}