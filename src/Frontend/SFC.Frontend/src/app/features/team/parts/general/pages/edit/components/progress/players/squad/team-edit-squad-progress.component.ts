import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { CommonConstants, where } from 'ngx-sfc-common';
import { ProgressColor } from 'ngx-sfc-components';
import { StatsValue } from '@share/types';
import { getStatsRaiting } from '@share/utils/stats';
import { IPlayersTableModel } from '@share/components/features/player';
import { EnumService } from '@share/services';
import { TeamEditSquadProgressLocalization } from './team-edit-squad-progress.localization';
import { ITeamEditSquadMetadataProgressModel, ITeamEditSquadPositionProgressModel, ITeamEditSquadProgressModel } from './team-edit-squad-progress.model';
import { calculatePercentage } from '@core/utils';
import { IEnumModel } from '@core/types';
import { CoreLocalization } from '@core/localization';
import { ShareConstants } from '@share/constants';
import { TeamEditSquadProgressPlayersLimit } from './team-edit-squad-progress-players-limit.enum';
import { ITeamPlayerModel } from '@share/models/team/player/team-player.model';

@Component({
    selector: 'sfc-team-edit-squad-progress',
    templateUrl: './team-edit-squad-progress.component.html',
    styleUrls: ['./team-edit-squad-progress.component.scss']
})
export class TeamEditSquadProgressComponent implements OnInit {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // core
    CoreLocalization = CoreLocalization;

    // component
    Localization = TeamEditSquadProgressLocalization;

    /* Inputs */

    @Input()
    players$: Observable<ITeamPlayerModel[]> = EMPTY;

    @Input()
    title: string = TeamEditSquadProgressLocalization.TITLE.LABEL;

    @Input()
    description: string = TeamEditSquadProgressLocalization.TITLE.DESCRIPTION;

    /* End Inputs */

    /* Observables */

    public progress$: Observable<ITeamEditSquadProgressModel> = EMPTY;

    /* End Observables */

    constructor(private enumService: EnumService) { }

    ngOnInit(): void {
        this.progress$ = this.players$.pipe(
            map(teamPlayers => teamPlayers.map((teamPlayer: ITeamPlayerModel) => teamPlayer.player)),
            map((players: IPlayersTableModel[]) => {
                const stats: StatsValue[] = players.map(player => player.stats),
                    positions: ITeamEditSquadPositionProgressModel[] = [...this.enumService.enums.footballPositions, ShareConstants.FOOTBALL_POSITION_EMPTY]
                        .map((position: IEnumModel<number>) => {
                            const playersByPosition: IPlayersTableModel[] =
                                where(players, player => player.football.position == position.key) || [];

                            return {
                                position: position,
                                count: playersByPosition.length,
                                percentage: calculatePercentage(playersByPosition)
                            }
                        }),
                    metadata: ITeamEditSquadMetadataProgressModel = {
                        count: players.length,
                        raiting: getStatsRaiting(stats)
                    };

                return { positions, metadata };
            }));
    }

    public getTotalPlayersColorFunc(value: number): string {
        if (value < TeamEditSquadProgressPlayersLimit.LOW) {
            return ProgressColor.LOW;
        } else if (value >= TeamEditSquadProgressPlayersLimit.LOW && value < TeamEditSquadProgressPlayersLimit.MEDIUM) {
            return ProgressColor.MEDIUM;
        } else if (value >= TeamEditSquadProgressPlayersLimit.MEDIUM && value < TeamEditSquadProgressPlayersLimit.HIGH) {
            return ProgressColor.HIGH;
        } else {
            return ProgressColor.MAX_HIGH;
        }
    }
}