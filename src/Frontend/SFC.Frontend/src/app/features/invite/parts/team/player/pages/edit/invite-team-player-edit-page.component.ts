import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Navigation, Router } from "@angular/router";
import { CoreLocalization } from "@core/localization";
import { INotification, NotificationService, StorageService } from "@core/services";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { buildTitle, getBackNavigationModel, getRouteData, getUrlSegment } from "@core/utils";
import { faBookOpen, faCircleInfo, faDollarSign, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { setMenuActiveItem } from "@share/utils/components";
import { ISideMenuItemModel, ISideMenuModel, SideMenuItemType } from "ngx-sfc-components";
import { map, Observable, startWith } from "rxjs";
import { IChangesCheck } from "@core/guards/changes-check/changes-check.model";
import { ChangesCheckService } from "@core/guards/changes-check/changes-check.service";
import { InviteTeamPlayerEditPageLocalization } from "./invite-team-player-edit-page.localization";
import { InviteTeamPlayerProfileEditRoute } from "../../components/edit/parts/profile/enums/invite-team-player-profile-edit-route.enum";
import { InviteTeamPlayerEditPageRoute } from "./invite-team-player-edit-page-route.enum";
import { InviteTeamPlayerEditPageConstants } from "./invite-team-player-edit-page.constants";
import { mapTeamInvitePlayerEditFormModel, mapUpdateTeamPlayerInviteRequest } from "./invite-team-player-edit-page.mapper";
import { IForm } from "@core/types";
import { IInviteTeamPlayerMainEditFormModel } from "../../components/edit/parts/main/invite-team-player-main-edit-form.model";
import { InviteTeamPlayerEditPart } from "../../components/edit/invite-team-player-edit-part.enum";
import { InviteTeamPlayerProfileEditPart } from "../../components/edit/parts/profile/enums/invite-team-player-profile-edit-part.enum";
import { IInviteTeamPlayerProfileFootballEditFormModel } from "../../components/edit/parts/profile/parts/football/invite-team-player-profile-football-edit-form.model";
import { IInviteTeamPlayerProfileGeneralEditFormModel } from "../../components/edit/parts/profile/parts/general/invite-team-player-profile-general-edit-form.model";
import { CommonConstants, empty, isDefined } from "ngx-sfc-common";
import { ValidationConstants } from "@share/constants";
import { getFullName } from "@share/utils/features/player";
import { ShareLocalization } from "@share/localization";
import { ITeamPlayerInviteModel } from "@share/models/invite/team-player-invite.model";
import { Location } from "@angular/common";
import { IBackNavigationModel } from "@core/models";
import { InviteTeamPlayerPreviewService } from "../../components/preview/invite-team-player-preview.service";
import { InviteTeamPlayerEditPageFormModel } from "./invite-team-player-edit-page-form.model";
import { RouteConstants } from "@core/constants";
import { InviteTeamPlayerService, IUpdateTeamPlayerInviteRequest, IUpdateTeamPlayerInviteResponse } from "@share/services";

@Component({
    templateUrl: './invite-team-player-edit-page.component.html',
    styleUrls: ['./invite-team-player-edit-page.component.scss']
})
export class InviteTeamPlayerEditPageComponent implements OnInit, IChangesCheck {

    // icons
    faQuestionCircle = faQuestionCircle;

    // core
    CoreLocalization = CoreLocalization;

    // component
    Localization = InviteTeamPlayerEditPageLocalization;

    public menu: ISideMenuModel = {
        label: this.Localization.MENU.TITLE,
        open: true,
        switch: false,
        items: [
            {
                id: InviteTeamPlayerEditPageRoute.Profile,
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
                        click: item => this.navigate(item, InviteTeamPlayerEditPageRoute.Profile)
                    },
                    {
                        id: InviteTeamPlayerProfileEditRoute.Football,
                        label: this.Localization.MENU.ITEMS.FOOTBALL,
                        icon: faDollarSign,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, InviteTeamPlayerEditPageRoute.Profile)
                    }
                ]
            }
        ]
    };

    public form: FormGroup;

    public get value(): InviteTeamPlayerEditPageFormModel { return this.form.value; }

    public get value$(): Observable<InviteTeamPlayerEditPageFormModel> {
        return this.form.valueChanges.pipe(
            startWith(this.form.value),
            map(() => this.form.getRawValue())
        );
    }

    public update: (value: InviteTeamPlayerEditPageFormModel) => Observable<IUpdateTeamPlayerInviteResponse> = (value: InviteTeamPlayerEditPageFormModel) => {
        const request: IUpdateTeamPlayerInviteRequest = mapUpdateTeamPlayerInviteRequest(value);
        return this.inviteTeamPlayerService.update(this.model.id, this.model.team.id, this.model.player.id, request)
    }

    public model: ITeamPlayerInviteModel;

    public backNavigationModel: IBackNavigationModel | empty = null;

    constructor(
        public inviteTeamPlayerPreviewService: InviteTeamPlayerPreviewService,
        public changesCheckService: ChangesCheckService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private titleService: Title,
        private inviteTeamPlayerService: InviteTeamPlayerService,
        private notificationService: NotificationService,
        private storageService: StorageService,
        private location: Location) {
        this.backNavigationModel = this.getBackNavigationModel();
        this.model = this.getResolveModel();
        this.form = this.buildForm();
        this.setMenuActiveItem();
    }

    ngOnInit(): void {
        this.setFormValue();
        this.setPageTitle();
        this.changesCheckService.init(this.form);
    }

    public onUpdated(response: IUpdateTeamPlayerInviteResponse): void {
        if (response.Success) {
            this.setPageTitle();
            this.notify();
            this.changesCheckService.set(this.form);
        }
    }

    public onCanceled(_: ITeamPlayerInviteModel): void {
        this.navigateBack();
    }

    private getResolveModel(): ITeamPlayerInviteModel {
        const routeData: ITeamPlayerInviteModel | null =
            getRouteData(this.route.snapshot, InviteTeamPlayerEditPageConstants.RESOLVE_KEY);

        if (!routeData) {
            console.error('Missing resolve model!');
        }

        return routeData!;
    }

    private buildForm(): FormGroup {
        const form: FormGroup = this.formBuilder.group({});

        const mainEditControls: IForm<IInviteTeamPlayerMainEditFormModel> = {
            playerId: [{ value: this.model.player.id, disabled: isDefined(this.model.player.id) }, [Validators.required]],
            teamId: [{ value: this.model.team.id, disabled: isDefined(this.model.team.id) }, [Validators.required]]
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

    private setMenuActiveItem(): void {
        const segment: string = getUrlSegment(this.router.url);
        setMenuActiveItem(this.menu, segment);
    }

    private setFormValue(): void {
        const value: InviteTeamPlayerEditPageFormModel = mapTeamInvitePlayerEditFormModel(this.model);
        this.form.setValue(value, { emitEvent: true });
    }

    private setPageTitle(): void {
        const pageTitle = buildTitle(`${ShareLocalization.INVITE} ${CoreLocalization.FROM} ${this.model.team.profile.general.name} 
            ${CoreLocalization.TO} ${getFullName(this.model.player)}`);
        this.titleService.setTitle(pageTitle);
    }

    private navigate(item: ISideMenuItemModel, command?: string): void {
        const commandValue: string = command ? `${command}/${item.id}` : item.id!;
        this.router.navigate([commandValue], { relativeTo: this.route });
    }

    private notify(): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: InviteTeamPlayerEditPageLocalization.NOTIFICATION.UPDATED.VALUE,
            title: InviteTeamPlayerEditPageLocalization.NOTIFICATION.UPDATED.TITLE
        };

        this.notificationService.notify(notification);
    }

    private getBackNavigationModel(): IBackNavigationModel | empty {
        const navigation: Navigation | null = this.router.getCurrentNavigation();

        const model: IBackNavigationModel | null = getBackNavigationModel(navigation);

        if (model) {
            this.storageService.set(RouteConstants.BACK_NAVIGATION_ROUTE_PATH_STATE_VALUE_KEY, model);
        }

        return model ?? this.storageService.get(RouteConstants.BACK_NAVIGATION_ROUTE_PATH_STATE_VALUE_KEY);
    }

    private navigateBack(): void {
        if (this.backNavigationModel) {
            this.router.navigate([this.backNavigationModel.url]);
        } else {
            this.location.back();
        }
    }
}