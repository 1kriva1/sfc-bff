import { Injectable } from "@angular/core";
import { ObservableBehaviorModel } from "ngx-sfc-common";
import { map, Observable } from "rxjs";
import { IGamePreviewMainModel } from "./models/game-preview-main.model";
import { ITeamModel } from "@share/models";

@Injectable({
    providedIn: 'root'
})
export class GamePreviewMainService {

    public get value$(): Observable<IGamePreviewMainModel> { return this.model.value$.pipe(map((value: IGamePreviewMainModel) => value || {})); }

    public get value(): IGamePreviewMainModel { return this.model.value || {}; }

    private model: ObservableBehaviorModel<IGamePreviewMainModel> = new ObservableBehaviorModel<IGamePreviewMainModel>({});    

    public updateTeamA(team: ITeamModel | null): void {
        this.model.subject.next({ teamA: team, teamB: this.value.teamB });
    }

    public updateTeamB(team: ITeamModel | null): void {
        this.model.subject.next({ teamA: this.value.teamA, teamB: team });
    }
}