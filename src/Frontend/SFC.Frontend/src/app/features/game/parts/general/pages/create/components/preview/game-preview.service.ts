import { Injectable } from "@angular/core";
import { ObservableBehaviorModel } from "ngx-sfc-common";
import { map, Observable } from "rxjs";
import { IGamePreviewModel } from "./models/game-preview.model";
import { ITeamModel } from "@share/models";

@Injectable({
    providedIn: 'root'
})
export class GamePreviewService {

    public get value$(): Observable<IGamePreviewModel> { return this.model.value$.pipe(map((value: IGamePreviewModel) => value || {})); }

    public get value(): IGamePreviewModel { return this.model.value || {}; }

    private model: ObservableBehaviorModel<IGamePreviewModel> = new ObservableBehaviorModel<IGamePreviewModel>({});    

    public updateTeamA(team: ITeamModel | null): void {
        this.model.subject.next({ teamA: team, teamB: this.value.teamB });
    }

    public updateTeamB(team: ITeamModel | null): void {
        this.model.subject.next({ teamA: this.value.teamA, teamB: team });
    }
}