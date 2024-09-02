import { Injectable } from "@angular/core";
import { IPlayersTableModel } from "@share/components/players/search/table";
import { getRaiting } from "@share/utils";
import { removeItem, removeItemBy } from "ngx-sfc-common";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PlayersService {
    private subject: Subject<IPlayersTableModel[]> = new Subject<IPlayersTableModel[]>();

    public players$: Observable<IPlayersTableModel[]> = this.subject.asObservable();

    private players: IPlayersTableModel[] = [];

    public get stars(): number {
        const MAX_STARS_VALUE = 5;
        const MAX_STAT_VALUE: number = 100;
        const length: number = this.players.length || 1,
            raitings: number[] = this.players.map(player => getRaiting(player.stats)),
            sum: number = raitings.reduce((a, b) => a + b, 0),
            total = MAX_STAT_VALUE * length;

        return MAX_STARS_VALUE * sum / total;
    }

    public add(player: IPlayersTableModel): void {
        this.players.push(player);
        this.subject.next(this.players);
    }

    public remove(player: IPlayersTableModel): void {
        removeItem(this.players, player);
        this.subject.next(this.players);
    }

    public removeById(id: number): void {
        removeItemBy(this.players, player => player.id === id);
        this.subject.next(this.players);
    }
}