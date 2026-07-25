import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { from, Observable, startWith, Subscription, switchMap, tap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { GameTeamEditPageConstants } from "./game-team-edit-page.constants";
import { ChangesCheckService } from "@core/guards/changes-check/changes-check.service";
import { IUpdateTeamRequest, IUpdateTeamResponse, TeamService } from "@share/services";
import { GameTeamEditPageLocalization } from "./game-team-edit-page.localization";
import { INotification, NotificationService } from "@core/services";
import { buildPropertyPath, buildTitle, findUrlSegments } from "@core/utils";
import { Title } from "@angular/platform-browser";
import { IGameTeamEditPageModel } from "./models/game-team-edit-page.model";
import { IGameTeamEditPageFormModel } from "./models/game-team-edit-page-form.model";
import { ISideMenuItemModel, ISideMenuModel, SideMenuItemType } from "ngx-sfc-components";
import { faBoxesStacked, faChessBoard, faHouse, faInfo, faPeopleGroup, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { setMenuActiveItem, setMenuInvalidItem } from "@share/utils";
import { mapUpdateTeamRequestAsync } from "./game-team-edit-page.mapper";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { GameTeamEditPageRoute } from "./game-team-edit-page-route.enum";
import { GameTeamProfileEditRoute } from "../../components/edit/parts/profile/enums/game-team-profile-edit-route.enum";
import { addGameTeamProfileEditControl } from "../../components/edit/parts/profile/game-team-profile-edit.utils";
import { addGameTeamGeneralProfileEditControlAsync } from "../../components/edit/parts/profile/parts/general/game-team-general-profile-edit.utils";
import { addGameTeamInventaryProfileEditControl } from "../../components/edit/parts/profile/parts/inventary/game-team-inventary-profile-edit.utils";
import { addGameTeamEditMainControlAsync } from "./components/edit/parts/main/game-team-edit-main.utils";
import { isMenuItemInvalid } from "./game-team-edit-page.utils";
import { RouteKey } from "@core/enums";

@Component({
    templateUrl: './game-team-edit-page.component.html',
    styleUrls: ['./game-team-edit-page.component.scss']
})
export class GameTeamEditPageComponent implements OnInit, OnDestroy {

    // icons
    faQuestionCircle = faQuestionCircle;

    // component
    Localization = GameTeamEditPageLocalization;
    Constants = GameTeamEditPageConstants;

    public form!: FormGroup;

    public get value(): IGameTeamEditPageFormModel { return this.form.value; }

    public get value$(): Observable<IGameTeamEditPageFormModel> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    public get model(): IGameTeamEditPageModel { return this.route.snapshot.data[GameTeamEditPageConstants.RESOLVE_KEY].result; };

    public update: (value: IGameTeamEditPageFormModel) => Observable<IUpdateTeamResponse> = () => {
        const updateTeamRequest$: Observable<IUpdateTeamRequest> = from(mapUpdateTeamRequestAsync(this.value));

        return updateTeamRequest$.pipe(
            switchMap((request: IUpdateTeamRequest) => this.teamService.update(this.model.gameTeam?.gameTeam.team!.id, request)),
            tap((response: IUpdateTeamResponse) => this.onUpdated(response))
        );
    }

    public menu: ISideMenuModel = {
        label: GameTeamEditPageLocalization.MENU.TITLE,
        open: true,
        switch: true,
        items: [
            {
                id: GameTeamEditPageRoute.Profile,
                label: GameTeamEditPageLocalization.MENU.ITEMS.PROFILE,
                icon: faHouse,
                type: SideMenuItemType.Item,
                active: true,
                open: true,
                items: [
                    {
                        id: GameTeamProfileEditRoute.General,
                        label: GameTeamEditPageLocalization.MENU.ITEMS.GENERAL,
                        icon: faInfo,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, GameTeamEditPageRoute.Profile)
                    },
                    {
                        id: GameTeamProfileEditRoute.Inventary,
                        label: GameTeamEditPageLocalization.MENU.ITEMS.INVENTARY,
                        icon: faBoxesStacked,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, GameTeamEditPageRoute.Profile)
                    }
                ]
            },
            {
                id: GameTeamEditPageRoute.Players,
                label: GameTeamEditPageLocalization.MENU.ITEMS.PLAYERS,
                icon: faPeopleGroup,
                type: SideMenuItemType.Item,
                open: false,
                click: item => this.navigate(item)
            },
            {
                id: GameTeamEditPageRoute.Schemes,
                label: GameTeamEditPageLocalization.MENU.ITEMS.SCHEMES,
                icon: faChessBoard,
                type: SideMenuItemType.Item,
                open: false,
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
        private teamService: TeamService
    ) {
    }

    async ngOnInit(): Promise<void> {
        this.form = await this.buildFormAsync();
        this.changesCheckService.init(this.form);
        this.setPageTitle();
        this.setMenuActiveItem();
        this._menuSubscription = this.form.statusChanges.subscribe(() =>
            setMenuInvalidItem(this.menu, (key: string) => isMenuItemInvalid(this.form, key)));
    }

    ngOnDestroy(): void {
        this._menuSubscription.unsubscribe();
    }

    private async buildFormAsync(): Promise<FormGroup> {
        const form: FormGroup = this.formBuilder.group({});

        // main
        await addGameTeamEditMainControlAsync(this.formBuilder, form, this.model);

        // profile
        addGameTeamProfileEditControl(this.formBuilder, form);
        await addGameTeamGeneralProfileEditControlAsync(this.formBuilder, form, this.model.gameTeam.gameTeam.team!.profile);
        addGameTeamInventaryProfileEditControl(this.formBuilder, form, this.model.gameTeam.gameTeam.team!.profile);

        return form;
    }

    private setPageTitle(): void {
        const pageTitle = buildTitle(this.value.profile.general.name);
        this.titleService.setTitle(pageTitle);
    }

    private setMenuActiveItem(): void {
        const segments: string[] = findUrlSegments(this.router.url, RouteKey.Edit, false);
        setMenuActiveItem(this.menu, buildPropertyPath(segments));
    }

    private navigate(item: ISideMenuItemModel, command?: string): void {
        const commandValue: string = command ? `${command}/${item.id}` : item.id!;
        this.router.navigate([commandValue], { relativeTo: this.route });
    }

    public onUpdated(response: IUpdateTeamResponse): void {
        if (response.Success) {
            this.setPageTitle();
            this.notify();
            this.changesCheckService.set(this.form);
        }
    }

    private notify(): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: GameTeamEditPageLocalization.NOTIFICATION.UPDATED.VALUE,
            title: GameTeamEditPageLocalization.NOTIFICATION.UPDATED.TITLE
        };

        this.notificationService.notify(notification);
    }
}