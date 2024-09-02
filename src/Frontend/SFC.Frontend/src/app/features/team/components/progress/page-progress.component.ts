import { Component } from '@angular/core';
import { CommonConstants, where } from 'ngx-sfc-common';
import { map, Observable, startWith } from 'rxjs';
import { PageProgressLocalization } from './page-progress.localization';
import { ProgressService } from "../../services/progress/progress.service";
import { PlayersService } from '../../services/players/players.service';
import { getRaiting } from '@share/utils';
import { IPlayersTableModel } from '@share/components/players/search/table';
import { EnumService } from '@share/services';
import { IPagePlayersProgressModel } from './page-progress.model';
import { IProgressModel } from 'src/app/features/team/services/progress/progress.model';
import { CommonConstants as ApplicationCommonConstants } from '@core/constants';

@Component({
    selector: 'sfc-page-progress',
    templateUrl: './page-progress.component.html',
    styleUrls: ['./page-progress.component.scss']
})
export class EditPageProgressComponent {

    CommonConstants = CommonConstants;

    Localization = PageProgressLocalization;

    public progress$!: Observable<IProgressModel>;

    public players$!: Observable<IPagePlayersProgressModel>;

    constructor(
        public progressService: ProgressService,
        private playersService: PlayersService,
        private enumService: EnumService) { }

    ngAfterViewInit(): void {
        this.progress$ = this.progressService.progress$;

        this.players$ = this.playersService.players$.pipe(
            startWith([]),
            map((players: IPlayersTableModel[]) => {
                const length: number = players.length || 1,
                    raitings: number[] = players.map(player => getRaiting(player.stats)),
                    sum: number = raitings.reduce((a, b) => a + b, 0),
                    avarage: number = Math.round((sum / length));

                return {
                    total: {
                        count: players.length,
                        avarage: avarage
                    },
                    footballPositions: [...this.enumService.enums.footballPositions, ApplicationCommonConstants.FOOTBALL_POSITION_EMPTY]
                        .map(position => {
                            const playersByPosition: IPlayersTableModel[] = where(players,
                                player => player.football.position == position.key) || [];

                            return {
                                position: position.value,
                                count: playersByPosition.length,
                                percentage: Math.round((playersByPosition.length / length * CommonConstants.FULL_PERCENTAGE))
                            }
                        })
                };
            }));
    }
}