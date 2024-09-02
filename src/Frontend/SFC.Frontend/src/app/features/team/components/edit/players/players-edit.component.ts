import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import {
    ILoadContainerParameters, ILoadContainerLoaderResultModel,
    ButtonType, IDefaultModalHeaderModel, IDefaultModalFooterModel, isEqual,
    ModalService, ModalTemplate, Position, Theme, removeItem, ILoadContainerPredicateParameters, hasItem
} from 'ngx-sfc-common';
import { IForm } from '@core/types';
import { map, Observable, of, Subject, catchError, filter, timer, switchMap, debounce, distinctUntilChanged, tap, startWith } from 'rxjs';
import { faPeopleGroup, faSearch, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { ExpandedTableRowTemplate, IDropdownMenuItemModel, TableTemplate } from 'ngx-sfc-components';
import { IPlayersTableModel, PlayersTableLocalization } from '@share/components/players/search/table';
import { ThemeService } from '@share/components/theme-toggler/services/theme/theme.service';
import { MessageSeverity } from '@core/services/message/message-severity.enum';
import { INotification, NotificationService } from '@core/services';
import { EnumService, PlayerService } from '@share/services';
import { IFindPlayersRequest, IPlayerItemModel } from '@share/services/player/models/find';
import { BaseErrorResponse } from '@core/models';
import { mapPageResponse } from "@core/utils";
import { mapFindPlayersRequest, mapPlayerTableModel } from '@share/mappers';
import { ISearchPlayersFilterModel } from '@share/components/players/search/filters';
import { BaseEditComponent } from '../base-edit.component';
import { EditPagePart } from '../edit-page-part.enum';
import { PlayersTableConstants } from './constants/players-table.constants';
import { PlayersService } from '../../../services/players/players.service';
import { PlayersEditConstants } from './constants/players-edit.constants';

@Component({
    selector: 'sfc-players-edit',
    templateUrl: './players-edit.component.html',
    styleUrls: ['./players-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class PlayersEditComponent
    extends BaseEditComponent
    implements OnInit {

    ButtonType = ButtonType;
    ModalTemplate = ModalTemplate;
    TableTemplate = TableTemplate;
    ExpandedTableRowTemplate = ExpandedTableRowTemplate;
    Position = Position;

    EditPagePart = EditPagePart;

    TableLocalization = PlayersTableLocalization;

    Constants = PlayersEditConstants;
    TableConstants = PlayersTableConstants;

    public searchForm!: FormGroup;

    // modal filters
    private subject = new Subject<any>();
    private search$: Observable<any> = this.subject.asObservable();
    private previousSearchValue!: ISearchPlayersFilterModel;

    // modal
    public get headerModel(): IDefaultModalHeaderModel {
        return {
            showCloseIcon: true,
            text: 'Players filters',
            icon: faSearch
        };
    }

    public get footerModel(): IDefaultModalFooterModel {
        return {
            applyButton: true,
            cancelButton: true,
            applyButtonText: 'Search',
            cancelButtonText: 'Cancel',
            onApply: () => this.onApply(),
            onCancel: () => this.onCancel()
        }
    }

    public get showLoading(): boolean { return this.themeService.theme == Theme.Default; }

    // table
    public predicate$!: Observable<ILoadContainerPredicateParameters | null>;

    private initialized: boolean = false;

    constructor(
        parent: FormGroupDirective,
        formBuilder: FormBuilder,
        private modalService: ModalService,
        private themeService: ThemeService,
        private enumService: EnumService,
        private notificationService: NotificationService,
        private playerService: PlayerService,
        private playersService: PlayersService) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        this.initForm();

        this.initSearchForm();

        this.predicate$ = this.searchForm.valueChanges.pipe(
            startWith(this.searchForm.value),
            filter(() => this.searchForm.valid),
            switchMap((value: ISearchPlayersFilterModel) => (this.modalService.isOpen ? this.search$ : of(value))),
            debounce((value: ISearchPlayersFilterModel) => (this.initialized ? timer(PlayersEditConstants.SEARCH_DEBOUNCE_TIME) : of(value))),
            distinctUntilChanged(),
            tap((value: ISearchPlayersFilterModel) => {
                this.previousSearchValue = JSON.parse(JSON.stringify(value));
                this.initialized = true;
            }),
            map(value => ({ value }))
        );
    }

    public loader(parameters: ILoadContainerParameters): Observable<ILoadContainerLoaderResultModel<IPlayersTableModel>> {
        const request: IFindPlayersRequest = mapFindPlayersRequest(
            parameters.params?.value,
            parameters.page, PlayersTableConstants.PAGINATION_SIZE,
            parameters.sorting);

        return this.playerService.find(request, !this.showLoading).pipe(
            mapPageResponse<IPlayerItemModel, IPlayersTableModel>(
                (item: IPlayerItemModel) => mapPlayerTableModel(item, this.enumService)
            ),
            catchError((error: BaseErrorResponse) => {
                const notification: INotification = {
                    severity: MessageSeverity.ERROR,
                    value: error.Message,
                    title: 'Fetch error'
                };

                this.notificationService.notify(notification);

                return of({ next: false, items: [], total: 0 });
            })
        );
    }

    public getTableActions(player: IPlayersTableModel): IDropdownMenuItemModel[] {
        const exist: boolean = hasItem(this.form.value.players, player.id),
            action: IDropdownMenuItemModel = {
                label: exist ? 'Cancel request to join team' : 'Send request to join team',
                icon: exist ? faUserMinus : faPeopleGroup,
                click: (item: IDropdownMenuItemModel) => this.onClick(item, player)
            };

        return [action]
    };

    private initForm(): void {
        this.form.addControl(EditPagePart.Players, this.formBuilder.array([]));
    }

    private initSearchForm(): void {
        const controls: IForm<ISearchPlayersFilterModel> = {
            name: [null]
        };

        this.searchForm = this.formBuilder.group(controls);
    }

    private onCancel(): void {
        const previousValue = JSON.parse(JSON.stringify(this.previousSearchValue));

        if (!isEqual(previousValue, this.searchForm.value)) {
            this.searchForm.setValue(previousValue, { emitEvent: false });
        }

        this.modalService.close();
    }

    private onApply(): void {
        if (!isEqual(this.previousSearchValue, this.searchForm.value)) {
            this.subject.next(this.searchForm.value);
        }

        this.searchForm.setValue(this.searchForm.value, { emitEvent: false });

        this.modalService.toggle();
    }

    private onClick(item: IDropdownMenuItemModel, player: IPlayersTableModel): void {
        const players: number[] = this.form.value.players || [],
            exist: boolean = hasItem(players, player.id),
            notification: INotification = {
                severity: MessageSeverity.INFO,
                value: exist
                    ? `After create a team request to join will NOT be send to this player`
                    : `After create a team request to join will be send to this player`,
                title: `${player.general.firstName} ${player.general.lastName}`
            };

        if (exist) {
            removeItem(players, player.id);
            this.playersService.remove(player);
        } else {
            players.push(player.id);
            this.playersService.add(player);
        }

        this.updateJoinRequestAction(item, !exist);

        this.notificationService.notify(notification);
    }

    private updateJoinRequestAction(item: IDropdownMenuItemModel, cancel: boolean): void {
        if (cancel) {
            item.label = 'Cancel request to join team';
            item.icon = faUserMinus;
        } else {
            item.label = 'Send request to join team';
            item.icon = faPeopleGroup;
        }
    }
}