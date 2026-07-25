import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { addGameFinancialProfileEditControl, addGameGeneralProfileEditControl, addGameInventaryProfileEditControl, addGameProfileEditControl } from "../../components";
import { filter, from, map, Observable, startWith, Subscription, switchMap, tap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { GameEditPageConstants } from "./game-edit-page.constants";
import { ChangesCheckService } from "@core/guards/changes-check/changes-check.service";
import { EnumService, GameService, GameTeamService, IUpdateGameRequest, IUpdateGameResponse, IUpdateGameTeamsRequest } from "@share/services";
import { GameEditPageLocalization } from "./game-edit-page.localization";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { INotification, NotificationService } from "@core/services";
import { buildPropertyPath, buildTitle, findUrlSegments } from "@core/utils";
import { Title } from "@angular/platform-browser";
import { mapUpdateGameRequestAsync, mapUpdateGameTeamRequest } from "./game-edit-page.mapper";
import { GameProfileEditRoute } from "../../components/edit/parts/profile/enums/game-profile-edit-route.enum";
import { ISideMenuItemModel, ISideMenuModel, SideMenuItemType } from "ngx-sfc-components";
import { faArrowsDownToPeople, faBoxesStacked, faCoins, faEnvelope, faHand, faHouse, faInfo, faPeopleGroup, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { setMenuActiveItem, setMenuInvalidItem } from "@share/utils";
import { addGameMainEditControl } from "./components/edit/parts/main/game-main-edit.utils";
import { GameEditPageRoute } from "./game-edit-page-route.enum";
import { IGameEditPageModel } from "./models/game-edit-page.model";
import { IGameEditPageFormModel } from "./models/game-edit-page-form.model";
import { isMenuItemInvalid } from "./game-edit-page.utils";
import { RouteKey } from "@core/enums";

@Component({
    templateUrl: './game-edit-page.component.html',
    styleUrls: ['./game-edit-page.component.scss']
})
export class GameEditPageComponent implements OnInit, OnDestroy {

    // icons
    faQuestionCircle = faQuestionCircle;

    // component
    Localization = GameEditPageLocalization;

    public form!: FormGroup;

    public get value(): IGameEditPageFormModel { return this.form.value; }

    public get value$(): Observable<IGameEditPageFormModel> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    public get model(): IGameEditPageModel { return this.route.snapshot.data[GameEditPageConstants.RESOLVE_KEY].result; };

    public update: (value: IGameEditPageFormModel) => Observable<IUpdateGameResponse> = (value: IGameEditPageFormModel) => {
        const updateGameRequest$: Observable<IUpdateGameRequest> = from(mapUpdateGameRequestAsync(value)),
            updateGame$: Observable<IUpdateGameResponse> = updateGameRequest$.pipe(
                switchMap((request: IUpdateGameRequest) => this.gameService.update(this.model.game.game.id, request)),
                tap((response: IUpdateGameResponse) => this.onUpdated(response))
            );

        if (value.main.teamAId != this.model.gameTeam.a?.gameTeam.id
            || value.main.teamBId != this.model.gameTeam.b?.gameTeam.id) {
            return updateGame$.pipe(
                filter((updateGameResponse: IUpdateGameResponse) => updateGameResponse.Success),
                switchMap((updateGameResponse: IUpdateGameResponse) => {
                    const updateGameTeamRequest: IUpdateGameTeamsRequest = mapUpdateGameTeamRequest(value, this.model.gameTeam, this.enumService);
                    return this.gameTeamService.updates(this.model.game.game.id, updateGameTeamRequest).pipe(map(() => updateGameResponse));
                })
            );
        }

        return updateGame$;
    }

    public menu: ISideMenuModel = {
        label: GameEditPageLocalization.MENU.TITLE,
        open: true,
        switch: true,
        items: [
            {
                id: GameEditPageRoute.Profile,
                label: GameEditPageLocalization.MENU.ITEMS.PROFILE,
                icon: faHouse,
                type: SideMenuItemType.Item,
                active: true,
                open: true,
                items: [
                    {
                        id: GameProfileEditRoute.General,
                        label: GameEditPageLocalization.MENU.ITEMS.GENERAL,
                        icon: faInfo,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, GameEditPageRoute.Profile)
                    },
                    {
                        id: GameProfileEditRoute.Inventary,
                        label: GameEditPageLocalization.MENU.ITEMS.INVENTARY,
                        icon: faBoxesStacked,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, GameEditPageRoute.Profile)
                    },
                    {
                        id: GameProfileEditRoute.Financial,
                        label: GameEditPageLocalization.MENU.ITEMS.FINANCIAL,
                        icon: faCoins,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, GameEditPageRoute.Profile)
                    }
                ]
            },
            {
                id: GameEditPageRoute.Invites,
                label: GameEditPageLocalization.MENU.ITEMS.INVITES,
                icon: faEnvelope,
                type: SideMenuItemType.Item,
                open: false,
                items: [
                    {
                        id: 'players',
                        label: GameEditPageLocalization.MENU.ITEMS.PLAYERS,
                        icon: faPeopleGroup,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, GameEditPageRoute.Invites)
                    },
                    {
                        id: 'teams',
                        label: GameEditPageLocalization.MENU.ITEMS.TEAMS,
                        icon: faArrowsDownToPeople,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, GameEditPageRoute.Invites)
                    }
                ]
            },
            {
                id: GameEditPageRoute.Requests,
                label: GameEditPageLocalization.MENU.ITEMS.REQUESTS,
                icon: faHand,
                type: SideMenuItemType.Item,
                open: false,
                items: [
                    {
                        id: 'players',
                        label: GameEditPageLocalization.MENU.ITEMS.PLAYERS,
                        icon: faPeopleGroup,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, GameEditPageRoute.Requests)
                    },
                    {
                        id: 'teams',
                        label: GameEditPageLocalization.MENU.ITEMS.TEAMS,
                        icon: faArrowsDownToPeople,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, GameEditPageRoute.Requests)
                    }
                ]
            },
            {
                id: GameEditPageRoute.Players,
                label: GameEditPageLocalization.MENU.ITEMS.PLAYERS,
                icon: faPeopleGroup,
                type: SideMenuItemType.Item,
                click: item => this.navigate(item)
            },
            {
                id: GameEditPageRoute.Teams,
                label: GameEditPageLocalization.MENU.ITEMS.TEAMS,
                icon: faArrowsDownToPeople,
                type: SideMenuItemType.Item,
                click: item => this.navigate(item)
            }
        ]
    };

    private _menuSubscription!: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public changesCheckService: ChangesCheckService,
        private notificationService: NotificationService,
        private titleService: Title,
        private gameService: GameService,
        private gameTeamService: GameTeamService,
        private enumService: EnumService
    ) {
    }

    ngOnInit(): void {
        this.form = this.buildForm();
        this.changesCheckService.init(this.form);
        this.setPageTitle();
        this.setMenuActiveItem();
        this._menuSubscription = this.form.statusChanges
            .subscribe(() => setMenuInvalidItem(this.menu, (key: string) => isMenuItemInvalid(this.form, key)));
    }

    ngOnDestroy(): void {
        this._menuSubscription.unsubscribe();
    }

    public onUpdated(response: IUpdateGameResponse): void {
        if (response.Success) {
            this.setPageTitle();
            this.notify();
            this.changesCheckService.set(this.form);
        }
    }

    private buildForm(): FormGroup {
        const form: FormGroup = this.formBuilder.group({});

        // main
        addGameMainEditControl(this.formBuilder, form, this.model);

        // profile
        addGameProfileEditControl(this.formBuilder, form);
        addGameGeneralProfileEditControl(this.formBuilder, form, this.model.game.game.profile);
        addGameInventaryProfileEditControl(this.formBuilder, form, this.model.game.game.profile);
        addGameFinancialProfileEditControl(this.formBuilder, form, this.model.game.game.profile);

        return form;
    }

    private setPageTitle(): void {
        const pageTitle = buildTitle(this.value.profile.general.name);
        this.titleService.setTitle(pageTitle);
    }

    private notify(): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: GameEditPageLocalization.NOTIFICATION.UPDATED.VALUE,
            title: GameEditPageLocalization.NOTIFICATION.UPDATED.TITLE
        };

        this.notificationService.notify(notification);
    }

    private navigate(item: ISideMenuItemModel, command?: string): void {
        const commandValue: string = command ? `${command}/${item.id}` : item.id!;
        this.router.navigate([commandValue], { relativeTo: this.route });
    }

    private setMenuActiveItem(): void {
        const segments: string[] = findUrlSegments(this.router.url, RouteKey.Edit, false);
        setMenuActiveItem(this.menu, buildPropertyPath(segments));
    }
}