import { Injectable } from "@angular/core";
import { hasItemBy, ObservableBehaviorModel, removeItemBy } from "ngx-sfc-common";
import { map, Observable } from "rxjs";
import { IPlayerModel } from "../../../../../models/player/player.model";
import { ITeamPlayerInviteModel } from "../../../../../models/invite/team-player-invite.model";

@Injectable({
    providedIn: 'root'
})
export class InviteTeamPlayerStoreService {

    private model: ObservableBehaviorModel<ITeamPlayerInviteModel[]> = new ObservableBehaviorModel<ITeamPlayerInviteModel[]>([]);

    public get invites(): ITeamPlayerInviteModel[] { return this.model.value!; }

    public get players(): IPlayerModel[] { return this.model.value?.map(invite => invite.player) || []; }

    public get players$(): Observable<IPlayerModel[]> { return this.model.value$.pipe(map(data => data?.map(invite => invite.player) ?? [])); }

    public add(invite: ITeamPlayerInviteModel): void {
        this.model.subject.next([...this.model.value!, invite]);
    }

    public remove(playerId: number): void {
        removeItemBy(this.model.value!, invite => invite.player.id === playerId);
        this.model.subject.next(this.model.value!);
    }

    public exist(playerId: number): boolean {
        return hasItemBy(this.players, player => player.id === playerId);
    }

    public clear(): void {
        this.model.subject.next([]);
    }
}