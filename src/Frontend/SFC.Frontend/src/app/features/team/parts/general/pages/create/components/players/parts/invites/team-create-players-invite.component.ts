import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, startWith, filter, timer, debounce, distinctUntilChanged, map, of, EMPTY } from 'rxjs';
import {
    ModalService, CommonConstants, ILoadContainerPredicateParameters, ButtonType, ModalTemplate, Position,
    FilterFunction, ILoadContainerParameters, where, isNullOrEmptyString, contains
} from 'ngx-sfc-common';
import { IForm } from '@core/types';
import { BaseErrorResponse } from '@core/models';
import { EnumService, InviteTeamPlayerStoreService } from '@share/services';
import { PageState, RouteKey } from '@core/enums';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IPlayersFilterModel, PlayersTableLocalization } from '@share/components/features/player';
import { TeamCreatePlayersInviteLocalization } from './team-create-players-invite.localization';
import { convertFileToBase64StringAsync } from '@core/utils';
import { TeamCreatePlayersInviteTableConstants } from './parts/table/team-create-players-invite-table.constants';
import { ITeamCreatePlayerInviteTableModel } from './parts/table/team-create-players-invite-table.model';
import { IDropdownMenuItemModel, TableTemplate } from 'ngx-sfc-components';
import { ITeamModel } from '@share/models/team/team.model';
import { ITeamEditFormModel } from 'src/app/features/team/parts/general/components/edit/team-edit-form.model';
import { TeamEditComponent } from 'src/app/features/team/parts/general/components/edit/team-edit.component';
import { TeamCreatePageService } from '../../../../team-create-page.service';
import { buildViewPlayerAction } from '@share/utils/features/player/player-action.utils';
import { buildCancelTeamPlayerInviteAction } from 'src/app/features/team/utils/team-actions.utils';
import { IPlayerModel } from '@share/models/player/player.model';
import { ActiveInviteStatus } from '@share/utils/enums';
import { addNavigationExtras, buildBackNavigationExtras } from '@core/utils/routing/routing.utils';
import { TeamCreatePlayersInviteConstants } from './team-create-players-invite.constants';
import { TeamLocalization } from 'src/app/features/team/localization';
import { InviteTeamPlayerConstants } from '@share/constants/features/invite';
import { InviteRoute, PlayerRoute, TeamRoute } from '@share/enums';
import { IInviteTeamPlayerResolveModel } from '@share/models';
import { PlayersFiltersConstants } from '@share/components/features/player/search/filters/constants/players-filters.constants';

@Component({
    templateUrl: './team-create-players-invite.component.html',
    styleUrls: ['./team-create-players-invite.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class TeamCreatePlayersInviteComponent<TFormValue extends ITeamEditFormModel, TResponse extends BaseErrorResponse>
    extends TeamEditComponent<TFormValue, TResponse> implements OnInit {

    // icons
    faPlus = faPlus;

    // ngx-sfc-common
    CommonConstants = CommonConstants;
    ButtonType = ButtonType;
    ModalTemplate = ModalTemplate;
    Position = Position;

    // ngx-sfc-components
    TableTemplate = TableTemplate;

    // component
    Localization = TeamCreatePlayersInviteLocalization;
    TableLocalization = PlayersTableLocalization;
    TableConstants = TeamCreatePlayersInviteTableConstants;

    /* Fields */

    private backNavigationExtras: NavigationExtras;

    /* End Fields */

    /* Table */

    public filterForm: FormGroup;

    public defaultFilterModel: IPlayersFilterModel = PlayersFiltersConstants.DEFAULT_FILTER_MODEL;

    public predicate$: Observable<ILoadContainerPredicateParameters | null> = EMPTY;

    private initialized: boolean = false;

    public data$: Observable<ITeamCreatePlayerInviteTableModel[]> = EMPTY;

    public filter: FilterFunction = (data: ITeamCreatePlayerInviteTableModel[], parameters: ILoadContainerParameters) => {
        if (!isNullOrEmptyString(parameters.params.value.name)) {
            return where(data, item =>
                contains(item.player.general.firstName, parameters.params.value.name) ||
                contains(item.player.general.lastName, parameters.params.value.name))!;
        }

        return data;
    }

    /* End Table */

    constructor(
        private enumService: EnumService,
        public inviteTeamPlayerStoreService: InviteTeamPlayerStoreService,
        private teamCreatePageService: TeamCreatePageService,
        private router: Router,
        private modalService: ModalService,
        parent: FormGroupDirective,
        formBuilder: FormBuilder
    ) {
        super(parent, formBuilder);
        this.filterForm = this.buildFilterForm();
        this.backNavigationExtras = buildBackNavigationExtras(this.router.url, TeamLocalization.NAVIGATION_BACK_LABEL);
    }

    ngOnInit(): void {
        this.predicate$ = this.filterForm.valueChanges.pipe(
            startWith(this.defaultFilterModel),
            filter(() => this.filterForm.valid),
            debounce((value: IPlayersFilterModel) => (this.initialized ? timer(PlayersFiltersConstants.SEARCH_DEBOUNCE_TIME) : of(value))),
            distinctUntilChanged(),
            map(value => ({ value }))
        );

        this.data$ = this.inviteTeamPlayerStoreService.players$.pipe(
            map((players: IPlayerModel[]) => {
                return players.map(player => {
                    const model: ITeamCreatePlayerInviteTableModel = {
                        player: player, status: ActiveInviteStatus(this.enumService.enums),
                    } as ITeamCreatePlayerInviteTableModel;

                    model.actions = this.buildActions(model);

                    return model;
                });
            })
        );
    }

    public async navigateToCreatePage(): Promise<void> {
        this.teamCreatePageService.save(this.value);
        this.router.navigate(
            [`${InviteRoute.Invites}/${TeamRoute.Teams}/${PlayerRoute.Players}/${RouteKey.Create}`],
            await this.setNavigationStateAsync()
        );
    }

    buildFilterForm(): FormGroup {
        const controls: IForm<IPlayersFilterModel> = {
            name: [null]
        };

        return this.formBuilder.group(controls);
    }

    private buildActions(model: ITeamCreatePlayerInviteTableModel): IDropdownMenuItemModel[] {
        return [
            buildCancelTeamPlayerInviteAction(model, this.modalService, true),
            buildViewPlayerAction(model.player.id, this.router)
        ];
    }

    private async setNavigationStateAsync(): Promise<any> {
        const team: ITeamModel = {
            id: TeamCreatePlayersInviteConstants.EMPTY_TEAM_ID_VALUE,
            profile: {
                general: {
                    name: this.value.profile.general.name,
                    logo: await convertFileToBase64StringAsync(this.value.main.logo),
                    city: this.value.profile.general.city,
                    availability: this.value.profile.availability.value
                }
            },
            players: this.inviteTeamPlayerStoreService.players.map(player => ({ player: player }))
        } as ITeamModel;
        const teamPlayerInvite: IInviteTeamPlayerResolveModel = { team, player: null };

        return addNavigationExtras([
            [InviteTeamPlayerConstants.CREATE_PAGE_MODEL_NAVIGATION_STATE_KEY, teamPlayerInvite],
            [InviteTeamPlayerConstants.CREATE_PAGE_STATE_NAVIGATION_STATE_KEY, PageState.Local]
        ], this.backNavigationExtras);
    }
}