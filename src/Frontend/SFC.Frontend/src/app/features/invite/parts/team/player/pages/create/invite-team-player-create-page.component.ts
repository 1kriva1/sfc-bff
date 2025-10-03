import { Component } from "@angular/core";
import { faArrowLeft, faBookOpen, faCircleInfo, faDollarSign, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Navigation, Router } from "@angular/router";
import { CoreLocalization } from "@core/localization";
import { ISideMenuItemModel, ISideMenuModel, SideMenuItemType } from "ngx-sfc-components";
import { map, Observable, of, startWith } from "rxjs";
import { InviteTeamPlayerCreatePageLocalization } from "./invite-team-player-create-page.localization";
import { InviteTeamPlayerCreatePageFormModel } from "./models/invite-team-player-create-page-form.model";
import { InviteTeamPlayerProfileEditRoute } from "../../components/edit/parts/profile/enums/invite-team-player-profile-edit-route.enum";
import { CommonConstants, empty, LoaderService } from "ngx-sfc-common";
import { getBackNavigationModel, getRouteData, getUrlSegment, getValueFromNavigationExtras } from "@core/utils";
import { setMenuActiveItem } from "@share/utils/components";
import { INotification, NotificationService, StorageService } from "@core/services";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { mapCreateTeamPlayerInviteRequest } from "./invite-team-player-create-page.mapper";
import { Location } from "@angular/common";
import { InviteTeamPlayerCreatePageConstants } from "./invite-team-player-create-page.constants";
import { IInviteTeamPlayerMainEditFormModel } from "../../components/edit/parts/main/invite-team-player-main-edit-form.model";
import { IForm } from "@core/types";
import { InviteTeamPlayerEditPart } from "../../components/edit/invite-team-player-edit-part.enum";
import { IInviteTeamPlayerProfileGeneralEditFormModel } from "../../components/edit/parts/profile/parts/general/invite-team-player-profile-general-edit-form.model";
import { ValidationConstants } from "@share/constants";
import { InviteTeamPlayerProfileEditPart } from "../../components/edit/parts/profile/enums/invite-team-player-profile-edit-part.enum";
import { IInviteTeamPlayerProfileFootballEditFormModel } from "../../components/edit/parts/profile/parts/football/invite-team-player-profile-football-edit-form.model";
import { ITeamPlayerInviteModel } from "@share/models/invite/team-player-invite.model";
import { IBackNavigationModel } from "@core/models";
import { InviteTeamPlayerPreviewService } from "../../components/preview/invite-team-player-preview.service";
import { InviteTeamPlayerMainEditValidation } from "../../components/edit/parts/main/invite-team-player-main-edit.validation";
import { InviteTeamPlayerMainEditConstants } from "../../components/edit/parts/main/invite-team-player-main-edit.constants";
import { RouteConstants } from "@core/constants";
import { InviteTeamPlayerCreatePageRoute } from "./enums/invite-team-player-create-page-route.enum";
import { ICreateTeamPlayerInviteRequest, ICreateTeamPlayerInviteResponse, InviteTeamPlayerService, InviteTeamPlayerStoreService, PlayerViewService, TeamPlayerService } from "@share/services";
import { InviteTeamPlayerConstants } from "@share/constants/features/invite";
import { PageState } from "@core/enums";

@Component({
    templateUrl: './invite-team-player-create-page.component.html',
    styleUrls: ['./invite-team-player-create-page.component.scss']
})
export class InviteTeamPlayerCreatePageComponent {

    // icons
    faQuestionCircle = faQuestionCircle;
    faArrowLeft = faArrowLeft;

    // core
    CoreLocalization = CoreLocalization;

    // component
    Localization = InviteTeamPlayerCreatePageLocalization;

    public menu: ISideMenuModel = {
        label: this.Localization.MENU.TITLE,
        open: true,
        switch: false,
        items: [
            {
                id: InviteTeamPlayerCreatePageRoute.Profile,
                label: this.Localization.MENU.ITEMS.PROFILE,
                icon: faCircleInfo,
                type: SideMenuItemType.Item,
                active: true,
                open: true,
                click: item => this.navigate(item),
                items: [
                    {
                        id: InviteTeamPlayerProfileEditRoute.General,
                        label: this.Localization.MENU.ITEMS.GENERAL,
                        icon: faBookOpen,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, InviteTeamPlayerCreatePageRoute.Profile)
                    },
                    {
                        id: InviteTeamPlayerProfileEditRoute.Football,
                        label: this.Localization.MENU.ITEMS.FOOTBALL,
                        icon: faDollarSign,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, InviteTeamPlayerCreatePageRoute.Profile)
                    }
                ]
            }
        ]
    };

    public get value(): InviteTeamPlayerCreatePageFormModel { return this.form.getRawValue(); }

    public get value$(): Observable<InviteTeamPlayerCreatePageFormModel> {
        return this.form.valueChanges.pipe(
            startWith(this.form.value),
            map(() => this.form.getRawValue())
        );
    }

    public form: FormGroup;

    public create: (value: InviteTeamPlayerCreatePageFormModel) => Observable<ICreateTeamPlayerInviteResponse> =
        (value: InviteTeamPlayerCreatePageFormModel) => {
            if (this.local) {
                return this.createLocal(value);
            }

            const request: ICreateTeamPlayerInviteRequest = mapCreateTeamPlayerInviteRequest(value);
            return this.inviteTeamPlayerService.create(this.value.main.teamId, this.value.main.playerId, request);
        }

    public model: ITeamPlayerInviteModel;

    public backNavigationModel: IBackNavigationModel | empty = null;

    private state: PageState = PageState.Common;

    private get local(): boolean { return this.state == PageState.Local; }

    constructor(
        public inviteTeamPlayerPreviewService: InviteTeamPlayerPreviewService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        private inviteTeamPlayerService: InviteTeamPlayerService,
        private teamPlayerService: TeamPlayerService,
        private loaderService: LoaderService,
        private storageService: StorageService,
        private inviteTeamPlayerStoreService: InviteTeamPlayerStoreService,
        private playerViewService: PlayerViewService,
        private location: Location) {
        this.state = this.getTeamInvitePlayerCreatePageState();
        this.backNavigationModel = this.getBackNavigationModel();
        this.model = getRouteData(this.route.snapshot, InviteTeamPlayerCreatePageConstants.RESOLVE_KEY)!;
        this.form = this.buildForm();
        this.setMenuActiveItem();
    }

    private buildForm(): FormGroup {
        const form: FormGroup = this.formBuilder.group({});

        const mainEditControls: IForm<IInviteTeamPlayerMainEditFormModel> = {
            playerId: [
                { value: this.model?.player?.id, disabled: this.model?.player?.id },
                this.getPlayerFormControlSyncValidations(),
                this.getPlayerFormControlAsyncValidations()
            ],
            teamId: [{ value: this.model?.team?.id, disabled: this.model?.team?.id }, [Validators.required]]
        }, mainEditFormGroup: FormGroup = this.formBuilder.group(mainEditControls);

        form.addControl(InviteTeamPlayerEditPart.Main, mainEditFormGroup);

        const profileEditFormGroup: FormGroup = this.formBuilder.group({});

        const generalProfileEditControls: IForm<IInviteTeamPlayerProfileGeneralEditFormModel> = {
            comment: [CommonConstants.EMPTY_STRING, [Validators.required, Validators.maxLength(ValidationConstants.MAX_DESCRIPTION_LENGTH)]]
        }, generalProfileEditFormGroup: FormGroup = this.formBuilder.group(generalProfileEditControls);

        profileEditFormGroup.addControl(InviteTeamPlayerProfileEditPart.General, generalProfileEditFormGroup);

        const footballProfileEditControls: IForm<IInviteTeamPlayerProfileFootballEditFormModel> = {
            footballPositions: [null],
            mainSquad: [null],
            number: [null]
        }, footballProfileEditFormGroup: FormGroup = this.formBuilder.group(footballProfileEditControls);

        profileEditFormGroup.addControl(InviteTeamPlayerProfileEditPart.Football, footballProfileEditFormGroup);

        form.addControl(InviteTeamPlayerEditPart.Profile, profileEditFormGroup);

        return form;
    }

    public onCreated(response: ICreateTeamPlayerInviteResponse): void {
        if (response.Success) {
            this.navigateBack();
            this.notify();
        }
    }

    private notify(): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: InviteTeamPlayerCreatePageLocalization.NOTIFICATION.CREATED.VALUE,
            title: InviteTeamPlayerCreatePageLocalization.NOTIFICATION.CREATED.TITLE
        };

        this.notificationService.notify(notification);
    }

    private navigate(item: ISideMenuItemModel, command?: string): void {
        const commandValue: string = command ? `${command}/${item.id}` : item.id!;
        this.router.navigate([commandValue], { relativeTo: this.route });
    }

    private setMenuActiveItem(): void {
        const segment: string = getUrlSegment(this.router.url);
        setMenuActiveItem(this.menu, segment);
    }

    private getBackNavigationModel(): IBackNavigationModel | empty {
        const navigation: Navigation | null = this.router.getCurrentNavigation();

        const model: IBackNavigationModel | null = getBackNavigationModel(navigation);

        if (model) {
            this.storageService.set(RouteConstants.BACK_NAVIGATION_ROUTE_PATH_STATE_VALUE_KEY, model);
        }

        return model ?? this.storageService.get(RouteConstants.BACK_NAVIGATION_ROUTE_PATH_STATE_VALUE_KEY);
    }

    private getTeamInvitePlayerCreatePageState(): PageState {
        const navigation: Navigation | null = this.router.getCurrentNavigation();
        return getValueFromNavigationExtras(InviteTeamPlayerConstants.CREATE_PAGE_STATE_NAVIGATION_STATE_KEY, navigation)
            ?? PageState.Common;
    }

    private createLocal(value: InviteTeamPlayerCreatePageFormModel): Observable<ICreateTeamPlayerInviteResponse> {
        const teamPlayerInvite: ITeamPlayerInviteModel = {
            player: this.inviteTeamPlayerPreviewService.preview.player!,
            teamComment: value.profile.general.comment
        } as ITeamPlayerInviteModel;

        this.inviteTeamPlayerStoreService.add(teamPlayerInvite);

        const response: ICreateTeamPlayerInviteResponse = { Success: true } as ICreateTeamPlayerInviteResponse;

        return of(response);
    }

    private navigateBack(): void {
        if (this.backNavigationModel) {
            this.router.navigate([this.backNavigationModel.url]);
        } else {
            this.location.back();
        }
    }

    private getPlayerFormControlSyncValidations(): any[] {
        if (this.local) {
            return [
                Validators.required,
                InviteTeamPlayerMainEditValidation.playerAlreadyHadActiveTeamInvite(this.inviteTeamPlayerStoreService),
                InviteTeamPlayerMainEditValidation.playerAlreadyInTeam(this.playerViewService)
            ];
        }

        return [Validators.required];
    }

    private getPlayerFormControlAsyncValidations(): any[] {
        if (this.local) {
            return [];
        }

        return [
            InviteTeamPlayerMainEditValidation.playerAlreadyInTeamAsync(this.model?.team?.id!, this.teamPlayerService, this.loaderService, InviteTeamPlayerMainEditConstants.INPUT.PLAYER.LOADER.ID),
            InviteTeamPlayerMainEditValidation.playerAlreadyHadActiveTeamInviteAsync(this.model?.team?.id!, this.inviteTeamPlayerService)
        ];
    }
}