import { Component, Input, OnInit } from '@angular/core';
import { faIdCard, faTableList } from '@fortawesome/free-solid-svg-icons';
import { EMPTY, map, Observable } from 'rxjs';
import { getAge, IToggleSwitcherModel, where, ItemsView } from 'ngx-sfc-common';
import { CoreConstants } from '@core/constants';
import { getEnum } from '@core/utils';
import { EnumService } from '@share/services';
import { getRaiting, getStars } from '@share/utils/stats';
import { ShareConstants } from '@share/constants';
import { ITeamPlayersPreviewListModel } from './parts/list/team-players-preview-list.model';
import { ITeamPlayersPreviewListPartModel } from './parts/list/parts/team-players-preview-list-part.model';
import { TeamPlayersPreviewLocalization } from './team-players-preview.localization';
import { CoreLocalization } from '@core/localization';
import { ITeamPlayersPreviewModel } from './team-players-preview.model';

@Component({
    selector: 'sfc-team-players-preview',
    templateUrl: './team-players-preview.component.html',
    styleUrls: ['./team-players-preview.component.scss']
})
export class TeamPlayersPreviewComponent implements OnInit {

    // component
    Localization = TeamPlayersPreviewLocalization;

    /* Inputs */

    @Input()
    title: string = TeamPlayersPreviewLocalization.TITLE.LABEL;

    @Input()
    description: string = TeamPlayersPreviewLocalization.TITLE.DESCRIPTION;

    @Input()
    players$: Observable<ITeamPlayersPreviewModel[]> = EMPTY;

    /* End Inputs */

    /* Fields */

    public leftToggleModel: IToggleSwitcherModel = {
        label: CoreLocalization.LIST,
        icon: faTableList
    };

    public rightToggleModel: IToggleSwitcherModel = {
        label: CoreLocalization.CARDS,
        icon: faIdCard
    };

    public view: ItemsView = ItemsView.List;

    public active: boolean = false;

    /* End Fields */

    /* Observables */

    public model$: Observable<ITeamPlayersPreviewListModel[]> = EMPTY;

    /* End Observables */

    constructor(private enumService: EnumService) { }

    ngOnInit(): void {
        this.model$ = this.players$.pipe(
            map((players: ITeamPlayersPreviewModel[]) => {
                const previewPlayers: ITeamPlayersPreviewListPartModel[] = players.map((player: ITeamPlayersPreviewModel) => {
                    const raiting: number = getRaiting(player.stats);
                    return {
                        id: player.id,
                        age: getAge(player.general.birthday),
                        city: player.general.city,
                        firstName: player.general.firstName,
                        lastName: player.general.lastName,
                        photo: player.general.photo || CoreConstants.DEFAULT_AVATAR_PATH,
                        position: getEnum(player.football.position, this.enumService.enums.footballPositions),
                        raiting: raiting,
                        stars: getStars(raiting),
                        actions: player.actions
                    }
                });

                return [...this.enumService.enums.footballPositions, ShareConstants.FOOTBALL_POSITION_EMPTY]
                    .map(position => ({
                        position: position,
                        players: where(previewPlayers, player => player.position?.key == position.key) || []
                    }));
            })
        );
    }

    public onToggle(active: boolean): void {
        this.view = active ? ItemsView.Cards : ItemsView.List;
    }
}