import { Component, OnInit } from '@angular/core';
import { getDataFromRouteRecursively } from '@core/utils';
import { IGamePlayerSearchTableModel, IGameTeamPlayerSearchTableModel, ITeamPlayerSearchTableModel } from '@share/components';
import { GameTeamPlayerService, ICreatesGameTeamPlayerRequest, IDeletesGameTeamPlayerRequest } from '@share/services';
import { CommonConstants, ReloadService, any, ButtonType } from 'ngx-sfc-common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IBubbleModel } from 'ngx-sfc-inputs';
import { faAnglesLeft, faAnglesRight, faArrowsDownToPeople, faFutbol, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { GameTeamPlayersLocalization } from './game-team-players.localization';
import { GameAction } from '@share/enums';
import { IForm } from '@core/types';
import { mapCreatesGameTeamPlayerRequest, mapDeletesGameTeamPlayerRequest } from './game-team-players.mapper';
import { IGameTeamEditPageModel } from '../../models/game-team-edit-page.model';
import { GameTeamEditPageConstants } from '../../game-team-edit-page.constants';
import { GameTeamEditPlayersCurrentSelectService } from './components/current/game-team-players-current-select.service';
import { GameTeamPlayersTeamSelectService } from './components/team/game-team-players-team-select.service';
import { GameTeamPlayersSource } from './game-team-players-source.enum';
import { IGameTeamPlayersFormModel } from './game-team-players-form.model';
import { GameTeamPlayersGameSelectService } from '../../../../components/players/parts/game/game-team-players-game-select.service';
import { buildGameTeamPlayersFilterFormGroup } from '../../../../components/players/game-team-players.utils';

@Component({
    selector: 'sfc-game-team-players',
    templateUrl: './game-team-players.component.html',
    styleUrls: ['./game-team-players.component.scss']
})
export class GameTeamPlayersComponent implements OnInit {

    // icons
    faQuestionCircle = faQuestionCircle;
    faAnglesLeft = faAnglesLeft;
    faAnglesRight = faAnglesRight;

    ButtonType = ButtonType;

    CommonConstants = CommonConstants;

    // component
    Localization = GameTeamPlayersLocalization;
    GameTeamPlayersSource = GameTeamPlayersSource;

    /* Fields */

    public predicateForm!: FormGroup;

    public form!: FormGroup;

    public sources: IBubbleModel[] = [
        {
            key: GameTeamPlayersSource.Game,
            label: 'From game',
            icon: faFutbol
        },
        {
            key: GameTeamPlayersSource.Team,
            label: 'From team',
            icon: faArrowsDownToPeople
        }
    ];

    /* End Fields */

    /* Properties */

    public get model(): IGameTeamEditPageModel {
        return getDataFromRouteRecursively<IGameTeamEditPageModel>(this.route, GameTeamEditPageConstants.RESOLVE_KEY)!;
    };

    public get actionDisabled(): boolean {
        return !any(this.gameTeamPlayersGameSelectService.value)
            && !any(this.gameTeamEditPlayersCurrentSelectService.value)
            && !any(this.gameTeamPlayersTeamSelectService.value);
    }

    /* End Properties */

    constructor(
        private formBuilder: FormBuilder,
        private gameTeamPlayerService: GameTeamPlayerService,
        private route: ActivatedRoute,
        private reloadService: ReloadService,
        private gameTeamEditPlayersCurrentSelectService: GameTeamEditPlayersCurrentSelectService,
        private gameTeamPlayersGameSelectService: GameTeamPlayersGameSelectService,
        private gameTeamPlayersTeamSelectService: GameTeamPlayersTeamSelectService
    ) { }

    ngOnInit(): void {
        this.form = this.buildForm();
        this.predicateForm = buildGameTeamPlayersFilterFormGroup(this.formBuilder);
    }

    public onSourceChange(): void {
        this.gameTeamPlayersGameSelectService.clear();
        this.gameTeamPlayersTeamSelectService.clear();
        this.reloadService.reload(GameAction.GamePlayer);
    }

    public togglePlayers(): void {
        const gamePlayersSelected: IGamePlayerSearchTableModel[] = this.gameTeamPlayersGameSelectService.value,
            teamPlayersSelected: ITeamPlayerSearchTableModel[] = this.gameTeamPlayersTeamSelectService.value,
            playersToDelete: number[] = this.gameTeamEditPlayersCurrentSelectService.value.map(item => item.gameTeamPlayer.player!.id),
            playersToCreate: number[] = gamePlayersSelected.map(item => item.gamePlayer.id).concat(teamPlayersSelected.map(item => item.player.id));

        if (any(playersToCreate)) {
            const playersCreateRequest: ICreatesGameTeamPlayerRequest = mapCreatesGameTeamPlayerRequest(playersToCreate);
            this.gameTeamPlayerService.creates(this.model.game.game.id, this.model.gameTeam.gameTeam.id, playersCreateRequest)
                .subscribe(() => this.reloadService.reload(GameAction.GamePlayer, GameAction.GameTeamPlayer));
        }

        if (any(playersToDelete)) {
            const playersDeleteRequest: IDeletesGameTeamPlayerRequest = mapDeletesGameTeamPlayerRequest(playersToDelete);
            this.gameTeamPlayerService.deletes(this.model.game.game.id, this.model.gameTeam.gameTeam.id, playersDeleteRequest)
                .subscribe(() => this.reloadService.reload(GameAction.GamePlayer, GameAction.GameTeamPlayer));
        }
    }

    public onAddPlayer(model: IGamePlayerSearchTableModel | ITeamPlayerSearchTableModel): void {
        this.gameTeamPlayerService.create(this.model.game.game.id, this.model.gameTeam.gameTeam.id, (model as ITeamPlayerSearchTableModel).player.id)
            .subscribe(() => this.reloadService.reload(GameAction.GamePlayer, GameAction.GameTeamPlayer));
    }

    public onRemovePlayer(model: IGameTeamPlayerSearchTableModel): void {
        this.gameTeamPlayerService.delete(this.model.game.game.id, this.model.gameTeam.gameTeam.id, model.gameTeamPlayer.player!.id)
            .subscribe(() => this.reloadService.reload(GameAction.GamePlayer, GameAction.GameTeamPlayer));
    }

    private buildForm(): FormGroup {
        const controls: IForm<IGameTeamPlayersFormModel> = {
            source: [this.sources[0].key]
        };

        return this.formBuilder.group(controls);
    }
}