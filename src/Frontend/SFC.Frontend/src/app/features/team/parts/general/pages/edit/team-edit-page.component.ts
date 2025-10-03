import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { CoreLocalization } from "@core/localization";
import { INotification, NotificationService } from "@core/services";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { buildBackNavigationExtras, buildTitle, getUrlSegment } from "@core/utils";
import { switchReloadWithStartAndShare } from "@core/utils/observable/observable.utils";
import { faBookOpen, faChessBoard, faCircleInfo, faClock, faDollarSign, faEnvelopesBulk, faHand, faPeopleArrows, faPeopleGroup, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { ValidationConstants } from "@share/constants/validation.constants";
import { EnumService, IGetTeamPlayersResponse, IUpdateTeamRequest, IUpdateTeamResponse, TeamPlayerService, TeamService } from "@share/services";
import { setMenuActiveItem } from "@share/utils/components";
import { CommonConstants, ModalService, ReloadService } from "ngx-sfc-common";
import { IDropdownMenuItemModel, ISideMenuItemModel, ISideMenuModel, SideMenuItemType } from "ngx-sfc-components";
import { fileMaxSize, maxArrayLength } from "ngx-sfc-inputs";
import { from, map, Observable, startWith, switchMap, EMPTY } from "rxjs";
import { TeamEditPart } from "../../components/edit/team-edit-part.enum";
import { TeamProfileEditPart } from "../../components/edit/parts/profile/enums/team-profile-edit-part.enum";
import { TeamProfileEditRoute } from "../../components/edit/parts/profile/enums/team-profile-edit-route.enum";
import { TeamEditPageConstants } from "./team-edit-page.constants";
import { TeamEditPageLocalization } from "./team-edit-page.localization";
import { TeamEditPageRoute } from "./team-edit-page-route.enum";
import { mapEditTeamPlayerModel, mapUpdateTeamRequestAsync } from "./team-edit-page.mapper";
import { TeamEditPageFormModel } from "./team-edit-page-form.model";
import { IChangesCheck } from "@core/guards/changes-check/changes-check.model";
import { ChangesCheckService } from "@core/guards/changes-check/changes-check.service";
import { ITeamMainEditFormModel } from "../../components/edit/parts/main/team-main-edit-form.model";
import { IForm } from "@core/types";
import { ITeamGeneralProfileEditFormModel } from "../../components/edit/parts/profile/parts/general/team-general-profile-edit-form.model";
import { ITeamAvailabilityProfileEditFormModel } from "../../components/edit/parts/profile/parts/availability/team-availability-profile-edit-form.model";
import { ITeamFinancialProfileEditFormModel } from "../../components/edit/parts/profile/parts/financial/team-financial-profile-edit-form.model";
import { TeamEditPlayersRoute } from "./components/players/team-edit-players-route.enum";
import { ITeamPlayerModel } from "@share/models/team/team-player.model";
import { ITeamPlayerModel as ITeamPlayerServiceModel } from "@share/services/team/player/models/common/team-player.model";
import { ITeamPlayersPreviewModel } from "../../components/preview/team-players-preview.model";
import { buildViewPlayerAction } from "@share/utils/features/player/player-action.utils";
import { TeamLocalization } from "../../../../localization/team.localization";
import { buildRemoveTeamPlayerAction, buildViewTeamPlayerAction } from "../../../../utils/team-actions.utils";
import { InviteAction, RequestAction, SchemeAction, TeamAction } from "@share/enums";

@Component({
    templateUrl: './team-edit-page.component.html',
    styleUrls: ['./team-edit-page.component.scss']
})
export class TeamEditPageComponent implements OnInit, IChangesCheck {

    // icons
    faQuestionCircle = faQuestionCircle;

    // core
    CoreLocalization = CoreLocalization;

    //share
    InviteAction = InviteAction;
    RequestAction = RequestAction;
    TeamAction = TeamAction;
    SchemeAction = SchemeAction;

    // component
    Localization = TeamEditPageLocalization;
    TeamEditPlayersRoute = TeamEditPlayersRoute;

    public menu: ISideMenuModel = {
        label: TeamEditPageLocalization.MENU.TITLE,
        open: true,
        switch: false,
        items: [
            {
                id: TeamEditPageRoute.Profile,
                label: TeamEditPageLocalization.MENU.ITEMS.PROFILE,
                icon: faCircleInfo,
                type: SideMenuItemType.Item,
                active: true,
                open: true,
                items: [
                    {
                        id: TeamProfileEditRoute.General,
                        label: TeamEditPageLocalization.MENU.ITEMS.GENERAL,
                        icon: faBookOpen,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, TeamEditPageRoute.Profile)
                    },
                    {
                        id: TeamProfileEditRoute.Availability,
                        label: TeamEditPageLocalization.MENU.ITEMS.AVAILABILITY,
                        icon: faClock,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, TeamEditPageRoute.Profile)
                    },
                    {
                        id: TeamProfileEditRoute.Financial,
                        label: TeamEditPageLocalization.MENU.ITEMS.FINANCIAL,
                        icon: faDollarSign,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, TeamEditPageRoute.Profile)
                    }
                ]
            },
            {
                id: TeamEditPageRoute.Players,
                label: TeamEditPageLocalization.MENU.ITEMS.PLAYERS,
                icon: faPeopleGroup,
                type: SideMenuItemType.Item,
                active: false,
                open: true,
                items: [
                    {
                        id: TeamEditPlayersRoute.Squad,
                        label: TeamEditPageLocalization.MENU.ITEMS.SQUAD,
                        icon: faPeopleArrows,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, TeamEditPageRoute.Players)
                    },
                    {
                        id: TeamEditPlayersRoute.Invites,
                        label: TeamEditPageLocalization.MENU.ITEMS.INVITES,
                        icon: faEnvelopesBulk,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, TeamEditPageRoute.Players)
                    },
                    {
                        id: TeamEditPlayersRoute.Requests,
                        label: TeamEditPageLocalization.MENU.ITEMS.REQUESTS,
                        icon: faHand,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, TeamEditPageRoute.Players)
                    }
                ]
            },
            {
                id: TeamEditPageRoute.Schemes,
                label: TeamEditPageLocalization.MENU.ITEMS.SCHEMES,
                icon: faChessBoard,
                type: SideMenuItemType.Item,
                active: false,
                click: item => this.navigate(item)
            }
        ]
    };

    public form: FormGroup;

    public get value(): TeamEditPageFormModel { return this.form.value; }

    public get value$(): Observable<TeamEditPageFormModel> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    public get model(): TeamEditPageFormModel { return this.route.snapshot.data[TeamEditPageConstants.RESOLVE_KEY].result; };

    public players$: Observable<ITeamPlayerModel[]> = EMPTY;

    public previewPlayers$: Observable<ITeamPlayersPreviewModel[]> = EMPTY;

    public get playersRoute(): TeamEditPlayersRoute { return getUrlSegment(this.router.url) as TeamEditPlayersRoute; }

    private backNavigationExtras: NavigationExtras;

    public update: (value: TeamEditPageFormModel) => Observable<IUpdateTeamResponse> = (value: TeamEditPageFormModel) => {
        const request$: Observable<IUpdateTeamRequest> = from(mapUpdateTeamRequestAsync(value));
        return request$.pipe(switchMap((request: IUpdateTeamRequest) => this.teamService.update(this.model.id, request)));
    }

    constructor(
        public changesCheckService: ChangesCheckService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private titleService: Title,
        private reloadService: ReloadService,
        private enumService: EnumService,
        private teamService: TeamService,
        private teamPlayerService: TeamPlayerService,
        private notificationService: NotificationService,
        private modalService: ModalService) {
        this.form = this.buildForm();
        this.backNavigationExtras = buildBackNavigationExtras(this.router.url, TeamLocalization.NAVIGATION_BACK_LABEL);
        this.setMenuActiveItem();
    }

    ngOnInit(): void {
        this.setFormValue();
        this.setPageTitle();
        this.setTeamPlayers();
        this.changesCheckService.init(this.form);
    }

    public onUpdated(response: IUpdateTeamResponse): void {
        if (response.Success) {
            this.setPageTitle();
            this.notify();
            this.changesCheckService.set(this.form);
        }
    }

    private buildForm(): FormGroup {
        const form: FormGroup = this.formBuilder.group({});

        // main
        const mainEditControls: IForm<ITeamMainEditFormModel> = {
            logo: [null, fileMaxSize(ValidationConstants.MAX_IMAGE_SIZE)]
        }, mainEditFormGroup: FormGroup = this.formBuilder.group(mainEditControls);

        form.addControl(TeamEditPart.Main, mainEditFormGroup);

        // profile
        const profileEditFormGroup: FormGroup = this.formBuilder.group({});

        const generalProfileEditControls: IForm<ITeamGeneralProfileEditFormModel> = {
            name: [null, [Validators.required, Validators.maxLength(ValidationConstants.MAX_NAME_LENGTH)]],
            city: [null, [Validators.required, Validators.maxLength(ValidationConstants.MAX_CITY_LENGTH)]],
            stadium: [null],
            description: [CommonConstants.EMPTY_STRING, [Validators.maxLength(ValidationConstants.MAX_DESCRIPTION_LENGTH)]],
            tags: [null, [maxArrayLength(ValidationConstants.MAX_TAGS_LENGTH)]]
        }, generalProfileEditFormGroup: FormGroup = this.formBuilder.group(generalProfileEditControls);

        profileEditFormGroup.addControl(TeamProfileEditPart.General, generalProfileEditFormGroup);

        const availabilityProfileEditControls: IForm<ITeamAvailabilityProfileEditFormModel> = {
            value: [[], fileMaxSize(ValidationConstants.MAX_IMAGE_SIZE)]
        }, availabilityProfileEditFormGroup: FormGroup = this.formBuilder.group(availabilityProfileEditControls);

        profileEditFormGroup.addControl(TeamProfileEditPart.Availability, availabilityProfileEditFormGroup);

        const financialProfileEditControls: IForm<ITeamFinancialProfileEditFormModel> = {
            shirts: [null],
            freePlay: [false],
            hasManiches: [false]
        }, financialProfileEditFormGroup: FormGroup = this.formBuilder.group(financialProfileEditControls);

        profileEditFormGroup.addControl(TeamProfileEditPart.Financial, financialProfileEditFormGroup);

        form.addControl(TeamEditPart.Profile, profileEditFormGroup);

        return form;
    }

    private setMenuActiveItem(): void {
        const segment: string = getUrlSegment(this.router.url);
        setMenuActiveItem(this.menu, segment);
    }

    private setFormValue(): void {
        const { id, ...value } = this.model;
        this.form.setValue(value, { emitEvent: true });
    }

    private setPageTitle(): void {
        const pageTitle = buildTitle(this.value.profile.general.name);
        this.titleService.setTitle(pageTitle);
    }

    private setTeamPlayers(): void {
        const teamPlayers$: Observable<ITeamPlayerModel[]> = this.teamPlayerService.get(this.model.id)
            .pipe(map((response: IGetTeamPlayersResponse) =>
                response.TeamPlayers.map((model: ITeamPlayerServiceModel) =>
                    mapEditTeamPlayerModel(model, this.enumService))));

        this.players$ = switchReloadWithStartAndShare(teamPlayers$, TeamAction.Player, this.reloadService.reload$);
        this.previewPlayers$ = this.players$.pipe(
            map((teamPlayers: ITeamPlayerModel[]) => teamPlayers.map((teamPlayer: ITeamPlayerModel) =>
                ({ ...teamPlayer.player, actions: this.buildActions(teamPlayer) })))
        );
    }

    private navigate(item: ISideMenuItemModel, command?: string): void {
        const commandValue: string = command ? `${command}/${item.id}` : item.id!;
        this.router.navigate([commandValue], { relativeTo: this.route });
    }

    private notify(): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: TeamEditPageLocalization.NOTIFICATION.UPDATED.VALUE,
            title: TeamEditPageLocalization.NOTIFICATION.UPDATED.TITLE
        };

        this.notificationService.notify(notification);
    }

    private buildActions(teamPlayer: ITeamPlayerModel): IDropdownMenuItemModel[] {
        return [
            buildRemoveTeamPlayerAction(teamPlayer.player, this.modalService),
            buildViewTeamPlayerAction(this.model.id, teamPlayer.player.id, this.router, this.backNavigationExtras),
            buildViewPlayerAction(teamPlayer.player.id, this.router)
        ];
    }
}