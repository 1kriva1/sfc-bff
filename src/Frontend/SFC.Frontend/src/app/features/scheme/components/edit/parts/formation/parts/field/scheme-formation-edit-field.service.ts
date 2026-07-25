import { Injectable } from "@angular/core";
import { ISchemeTeamFormationPlayerModel } from "@share/models";
import { addItem, any, ObservableBehaviorModel, removeItemBy, where } from "ngx-sfc-common";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SchemeFormationEditFieldService { 

    private model: ObservableBehaviorModel<ISchemeTeamFormationPlayerModel[]> = new ObservableBehaviorModel<ISchemeTeamFormationPlayerModel[]>([]);

    public get players(): ISchemeTeamFormationPlayerModel[] { return this.model.value!; }

    public get players$(): Observable<ISchemeTeamFormationPlayerModel[]> { return this.model.value$; }

    public get selectedPlayers(): ISchemeTeamFormationPlayerModel[] { return where(this.model.value!, formationPlayer => !!formationPlayer.player) || []; }

    public get selectedPlayerIds(): number[] { return this.selectedPlayers.map(fieldPlayer => fieldPlayer.player!.id) }

    public get selectedPlayers$(): Observable<ISchemeTeamFormationPlayerModel[]> {
        return this.model.value$.pipe(
            map(formationPlayers => where(formationPlayers, formationPlayer => !!formationPlayer.player) || [])
        );
    }

    public get any(): boolean { return any(this.players); }

    /* End Properties */

    public init(players: ISchemeTeamFormationPlayerModel[]): void {
        this.model.subject.next(players);
    }

    public select(player: ISchemeTeamFormationPlayerModel): void {
        addItem(this.players, player);
        this.model.subject.next(this.players);
    }

    public unselect(player: ISchemeTeamFormationPlayerModel): void {
        removeItemBy(this.players, item =>
            item.position.formationPosition.key === player.position.formationPosition.key &&
            item.position.index === player.position.index);
        this.model.subject.next(this.players);
    }

    public toggle(model: ISchemeTeamFormationPlayerModel): void {
        if (model.player) this.select(model);
        else this.unselect(model);
    }

    public clear(): void {
        this.model.subject.next([]);
    }
}