import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faIdCard, faTableList } from '@fortawesome/free-solid-svg-icons';
import { EnumService } from '@share/services';
import { getRaiting, getStars } from '@share/utils';
import { ComponentSize, firstOrDefault, getAge, isDefined, IToggleSwitcherModel, where } from 'ngx-sfc-common';
import { map, Observable, startWith } from 'rxjs';
import { PreviewType } from './preview-data-type.enum';
import { CommonConstants as ApplicationCommonConstants } from '@core/constants';
import { IPlayersTableModel } from '@share/components/players/search/table';
import { IPlayersByPositionModel } from './parts/players-by-position-preview/players-by-position-preview.model';
import { PlayersService } from '../../services/players/players.service';
import { IPlayerItemModel } from './parts/item/models/player-item.model';

@Component({
    selector: 'sfc-players-preview',
    templateUrl: './players-preview.component.html',
    styleUrls: ['./players-preview.component.scss']
})
export class PlayersPreviewComponent implements OnInit {

    ComponentSize = ComponentSize;

    @Output()
    remove: EventEmitter<number> = new EventEmitter<number>();

    public leftModel: IToggleSwitcherModel = {
        label: 'List',
        icon: faTableList
    };

    public rightModel: IToggleSwitcherModel = {
        label: 'Icons',
        icon: faIdCard
    };

    public type: PreviewType = PreviewType.List;

    public models$!: Observable<IPlayersByPositionModel[]>;

    constructor(private enumService: EnumService, private playersService: PlayersService) { }

    ngOnInit(): void {
        this.models$ = this.playersService.players$.pipe(
            startWith([]),
            map((players: IPlayersTableModel[]) => {
                const mappedPlayers: IPlayerItemModel[] = players.map((player: IPlayersTableModel) => {
                    const raiting = getRaiting(player.stats);
                    return {
                        id: player.id,
                        age: player.general.birthday ? getAge(player.general.birthday) : null,
                        city: player.general.city,
                        firstName: player.general.firstName,
                        lastName: player.general.lastName,
                        photo: player.general.photo || ApplicationCommonConstants.DEFAULT_AVATAR_PATH,
                        position: isDefined(player.football.position)
                            ? firstOrDefault(this.enumService.enums.footballPositions, p => p.key == player.football.position)
                            : null,
                        raiting: raiting,
                        stars: getStars(raiting)
                    }
                });

                return [...this.enumService.enums.footballPositions, ApplicationCommonConstants.FOOTBALL_POSITION_EMPTY]
                    .map(position => ({
                        position: position.value,
                        players: where(mappedPlayers, player => player.position?.key == position.key) || []
                    }));
            })
        );
    }

    public onToggle(): void {
        this.type = this.type == PreviewType.List
            ? PreviewType.Icons
            : PreviewType.List;
    }
}