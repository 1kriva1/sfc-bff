import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RouteKey } from "@core/enums";
import { CoreLocalization } from "@core/localization";
import { INotification, NotificationService } from "@core/services";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { IForm } from "@core/types";
import { getUrlSegment } from "@core/utils";
import { faBookOpen, faCircleInfo, faClock, faDollarSign, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { ValidationConstants } from "@share/constants/validation.constants";
import { setMenuActiveItem } from "@share/utils/components";
import { any, CommonConstants, ModalService } from "ngx-sfc-common";
import { IDropdownMenuItemModel, ISideMenuItemModel, ISideMenuModel, SideMenuItemType } from "ngx-sfc-components";
import { fileMaxSize, maxArrayLength } from "ngx-sfc-inputs";
import { EMPTY, filter, from, map, Observable, startWith, switchMap } from "rxjs";
import { ITeamMainEditFormModel } from "../../components/edit/parts/main/team-main-edit-form.model";
import { TeamProfileEditPart } from "../../components/edit/parts/profile/enums/team-profile-edit-part.enum";
import { TeamProfileEditRoute } from "../../components/edit/parts/profile/enums/team-profile-edit-route.enum";
import { ITeamAvailabilityProfileEditFormModel } from "../../components/edit/parts/profile/parts/availability/team-availability-profile-edit-form.model";
import { ITeamFinancialProfileEditFormModel } from "../../components/edit/parts/profile/parts/financial/team-financial-profile-edit-form.model";
import { ITeamGeneralProfileEditFormModel } from "../../components/edit/parts/profile/parts/general/team-general-profile-edit-form.model";
import { TeamCreatePageLocalization } from "./team-create-page.localization";
import { TeamCreatePageRoute } from "./team-create-page-route.enum";
import { mapCreateTeamPlayerInvitesRequest, mapCreateTeamRequestAsync } from "./team-create-page.mapper";
import { TeamCreatePageFormModel } from "./team-create-page-form.model";
import { TeamCreatePlayersRoute } from "./components/players/team-create-players-route.enum";
import { TeamCreatePageService } from "./team-create-page.service";
import { ITeamPlayersPreviewModel } from "../../components/preview/team-players-preview.model";
import { IPlayerModel } from "@share/models/player/player.model";
import { buildViewPlayerAction } from "@share/utils/features/player/player-action.utils";
import { buildCancelTeamPlayerInviteAction } from "../../../../utils/team-actions.utils";
import { ITeamPlayerInviteModel } from "@share/models/invite/team-player-invite.model";
import { ICreateTeamPlayerInvitesRequest, InviteTeamPlayerService, InviteTeamPlayerStoreService } from "@share/services";
import { InviteTeamPlayerModal } from "@share/components";
import { TeamRoute } from "@share/enums";
import { ICreateTeamRequest, ICreateTeamResponse, TeamService } from "@share/services";
import { TeamEditPart } from "../../components/edit/team-edit-part.enum";

@Component({
    templateUrl: './team-create-page.component.html',
    styleUrls: ['./team-create-page.component.scss']
})
export class TeamCreatePageComponent implements OnInit {

    // icons
    faQuestionCircle = faQuestionCircle;

    // core
    CoreLocalization = CoreLocalization;

    // share
    InviteTeamPlayerModal = InviteTeamPlayerModal;
    
    // component
    Localization = TeamCreatePageLocalization;

    public menu: ISideMenuModel = {
        label: this.Localization.MENU.TITLE,
        open: true,
        switch: false,
        items: [
            {
                id: TeamCreatePageRoute.Profile,
                label: TeamCreatePageLocalization.MENU.ITEMS.PROFILE,
                icon: faCircleInfo,
                type: SideMenuItemType.Item,
                active: true,
                open: true,
                items: [
                    {
                        id: TeamProfileEditRoute.General,
                        label: TeamCreatePageLocalization.MENU.ITEMS.GENERAL,
                        icon: faBookOpen,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, TeamCreatePageRoute.Profile)
                    },
                    {
                        id: TeamProfileEditRoute.Availability,
                        label: TeamCreatePageLocalization.MENU.ITEMS.AVAILABILITY,
                        icon: faClock,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, TeamCreatePageRoute.Profile)
                    },
                    {
                        id: TeamProfileEditRoute.Financial,
                        label: TeamCreatePageLocalization.MENU.ITEMS.FINANCIAL,
                        icon: faDollarSign,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, TeamCreatePageRoute.Profile)
                    }
                ]
            },
            {
                id: TeamCreatePageRoute.Players,
                label: TeamCreatePageLocalization.MENU.ITEMS.PLAYERS,
                icon: faCircleInfo,
                type: SideMenuItemType.Item,
                active: true,
                open: true,
                items: [
                    {
                        id: TeamCreatePlayersRoute.Invites,
                        label: TeamCreatePageLocalization.MENU.ITEMS.INVITES,
                        icon: faBookOpen,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, TeamCreatePageRoute.Players)
                    },
                ]
            }
        ]
    };

    public form: FormGroup;

    public get value(): TeamCreatePageFormModel { return this.form.value; }

    public get value$(): Observable<TeamCreatePageFormModel> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    public previewPlayers$: Observable<ITeamPlayersPreviewModel[]> = EMPTY;

    public create: (value: TeamCreatePageFormModel) => Observable<ICreateTeamResponse> = (value: TeamCreatePageFormModel) => {
        const createTeamRequest$: Observable<ICreateTeamRequest> = from(mapCreateTeamRequestAsync(value)),
            createTeam$ = createTeamRequest$.pipe(
                switchMap((request: ICreateTeamRequest) => this.teamService.create(request)));

        if (any(this.inviteTeamPlayerStoreService.invites)) {
            return createTeam$.pipe(
                filter((createTeamResponse: ICreateTeamResponse) => createTeamResponse.Success),
                switchMap((createTeamResponse: ICreateTeamResponse) => {
                    const createTeamPlayersRequest: ICreateTeamPlayerInvitesRequest = mapCreateTeamPlayerInvitesRequest(this.inviteTeamPlayerStoreService.invites);
                    return this.inviteTeamPlayerService.createRange(createTeamResponse.Team.Id, createTeamPlayersRequest).pipe(map(() => createTeamResponse));
                })
            );
        }

        return createTeam$;
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private teamService: TeamService,
        public teamCreatePageService: TeamCreatePageService,
        public inviteTeamPlayerStoreService: InviteTeamPlayerStoreService,
        private inviteTeamPlayerService: InviteTeamPlayerService,
        private notificationService: NotificationService,
        private modalService: ModalService) {
        this.form = this.buildForm();
        this.setMenuActiveItem();
    }

    ngOnInit(): void {
        this.previewPlayers$ = this.inviteTeamPlayerStoreService.players$.pipe(
            map((players: IPlayerModel[]) => players.map((player: IPlayerModel) =>
                ({ ...player, actions: this.buildActions(player) })))
        );

        if (this.teamCreatePageService.exist) {
            this.form.setValue(this.teamCreatePageService.value!, { emitEvent: false });
        }
    }

    public onCancelInvite(model: ITeamPlayerInviteModel): void {
        this.inviteTeamPlayerStoreService.remove(model.player.id);
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

    public onCreated(response: ICreateTeamResponse): void {
        if (response.Success) {
            this.teamCreatePageService.clear();
            this.inviteTeamPlayerStoreService.clear();
            this.router.navigate([`${TeamRoute.Teams}/${response.Team.Id}/${RouteKey.Edit}`]);
            this.notify();
        }
    }

    private navigate(item: ISideMenuItemModel, command?: string): void {
        const commandValue: string = command ? `${command}/${item.id}` : item.id!;
        this.router.navigate([commandValue], { relativeTo: this.route });
    }

    private notify(): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: TeamCreatePageLocalization.NOTIFICATION.CREATED.VALUE,
            title: TeamCreatePageLocalization.NOTIFICATION.CREATED.TITLE
        };

        this.notificationService.notify(notification);
    }

    private setMenuActiveItem(): void {
        const segment: string = getUrlSegment(this.router.url);
        setMenuActiveItem(this.menu, segment);
    }

    private buildActions(player: IPlayerModel): IDropdownMenuItemModel[] {
        const invite: ITeamPlayerInviteModel = { player: player } as ITeamPlayerInviteModel;
        return [
            buildCancelTeamPlayerInviteAction(invite, this.modalService, true),
            buildViewPlayerAction(player.id, this.router)
        ];
    }
}