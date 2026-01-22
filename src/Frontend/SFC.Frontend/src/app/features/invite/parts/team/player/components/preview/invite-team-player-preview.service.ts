import { Injectable } from "@angular/core";
import { IPlayerModel } from "@share/models/player/player.model";
import { ITeamModel } from "@share/models/team/general/team.model";
import { ObservableBehaviorModel } from "ngx-sfc-common";
import { map, Observable } from "rxjs";
import { IInviteTeamPlayerPreviewModel } from "./invite-team-player-preview.model";

@Injectable({
    providedIn: 'root'
})
export class InviteTeamPlayerPreviewService {

    private model: ObservableBehaviorModel<IInviteTeamPlayerPreviewModel> = new ObservableBehaviorModel<IInviteTeamPlayerPreviewModel>({});

    public get preview(): IInviteTeamPlayerPreviewModel { return this.model.value || {}; }

    public get preview$(): Observable<IInviteTeamPlayerPreviewModel> { return this.model.value$.pipe(map((value: IInviteTeamPlayerPreviewModel) => value || {})); }

    public updatePlayer(player: IPlayerModel | null): void {
        this.model.subject.next({ player: player, team: this.preview.team });
    }

    public updateTeam(team: ITeamModel | null): void {
        this.model.subject.next({ player: this.preview.player, team: team });
    }

    public clear(): void {
        this.model.subject.next({ player: null, team: null });
    }
}