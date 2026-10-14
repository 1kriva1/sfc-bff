import { Injectable } from "@angular/core";
import { ISchemeGameTeamFormationPlayerModel } from "@share/models";
import { addItem, any, ObservableBehaviorModel, removeItemBy, where } from "ngx-sfc-common";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SchemeGameTeamFormationEditFieldService { 

    private model: ObservableBehaviorModel<ISchemeGameTeamFormationPlayerModel[]> = new ObservableBehaviorModel<ISchemeGameTeamFormationPlayerModel[]>([]);

    public get players(): ISchemeGameTeamFormationPlayerModel[] { return this.model.value!; }

    public get players$(): Observable<ISchemeGameTeamFormationPlayerModel[]> { return this.model.value$; }

    public get selectedPlayers(): ISchemeGameTeamFormationPlayerModel[] { return where(this.model.value!, formationPlayer => !!formationPlayer.gameTeamPlayer) || []; }

    public get selectedPlayerIds(): number[] { return this.selectedPlayers.map(fieldPlayer => fieldPlayer.gameTeamPlayer!.gameTeamPlayer!.id) }

    public get selectedPlayers$(): Observable<ISchemeGameTeamFormationPlayerModel[]> {
        return this.model.value$.pipe(
            map(formationPlayers => where(formationPlayers, formationPlayer => !!formationPlayer.gameTeamPlayer) || [])
        );
    }

    public get any(): boolean { return any(this.players); }

    /* End Properties */

    public init(players: ISchemeGameTeamFormationPlayerModel[]): void {
        this.model.subject.next(players);
    }

    public select(player: ISchemeGameTeamFormationPlayerModel): void {
        addItem(this.players, player);
        this.model.subject.next(this.players);
    }

    public unselect(player: ISchemeGameTeamFormationPlayerModel): void {
        removeItemBy(this.players, item =>
            item.position.formationPosition.key === player.position.formationPosition.key &&
            item.position.index === player.position.index);
        this.model.subject.next(this.players);
    }

    public toggle(model: ISchemeGameTeamFormationPlayerModel): void {
        if (model.gameTeamPlayer) this.select(model);
        else this.unselect(model);
    }

    public clear(): void {
        this.model.subject.next([]);
    }
}