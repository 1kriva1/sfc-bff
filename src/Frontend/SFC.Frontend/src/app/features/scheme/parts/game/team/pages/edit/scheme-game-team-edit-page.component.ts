import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable, startWith, Subscription, tap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ChangesCheckService } from "@core/guards/changes-check/changes-check.service";
import { EnumService, ISchemeGameTeamUpdateRequest, ISchemeGameTeamUpdateResponse, IUpdateTeamResponse, SchemeGameTeamService } from "@share/services";
import { SchemeGameTeamEditPageLocalization } from "./scheme-game-team-edit-page.localization";
import { INotification, NotificationService } from "@core/services";
import { buildPropertyPath, buildTitle, findUrlSegments } from "@core/utils";
import { Title } from "@angular/platform-browser";
import { ISideMenuItemModel, ISideMenuModel, SideMenuItemType } from "ngx-sfc-components";
import { faChessBoard, faHouse, faInfo, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { setMenuActiveItem, setMenuInvalidItem } from "@share/utils";
import { mapSchemeGameTeamUpdateRequest } from "./scheme-game-team-edit-page.mapper";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { SchemeGameTeamEditPageRoute } from "./scheme-game-team-edit-page-route.enum";
import { ISchemeGameTeamEditPageModel } from "./models/scheme-game-team-edit-page.model";
import { SchemeGameTeamProfileEditRoute } from "../../components/edit/parts/profile/enums/scheme-game-team-profile-edit-route.enum";
import { addSchemeGameTeamProfileEditControl } from "../../components/edit/parts/profile/scheme-game-team-profile-edit.utils";
import { addSchemeGameTeamGeneralProfileEditControl } from "../../components/edit/parts/profile/parts/general/scheme-game-team-general-profile-edit.utils";
import { addSchemeGameTeamFormationEditControl } from "../../components/edit/parts/formation/scheme-game-team-formation-edit.utils";
import { SchemeFormationEditFieldService } from "../../../../../components/edit/parts/formation/parts/field/scheme-formation-edit-field.service";
import { ISchemeGameTeamEditPageFormModel } from "./models/scheme-game-team-edit-page-form.model";
import { isMenuItemInvalid } from "./scheme-game-team-edit-page.utils";
import { RouteKey } from "@core/enums";
import { SchemeGameTeamConstants } from "../../constants/scheme-game-team.constants";

@Component({
    templateUrl: './scheme-game-team-edit-page.component.html',
    styleUrls: ['./scheme-game-team-edit-page.component.scss']
})
export class SchemeGameTeamEditPageComponent implements OnInit, OnDestroy {

    // icons
    faQuestionCircle = faQuestionCircle;

    // component
    Localization = SchemeGameTeamEditPageLocalization;

    public form!: FormGroup;

    public get value(): ISchemeGameTeamEditPageFormModel { return this.form.value; }

    public get value$(): Observable<ISchemeGameTeamEditPageFormModel> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    public get model(): ISchemeGameTeamEditPageModel { return this.route.snapshot.data[SchemeGameTeamConstants.ResolveKey].result; };

    public update: (value: ISchemeGameTeamEditPageFormModel) => Observable<ISchemeGameTeamUpdateResponse> = () => {
        const request: ISchemeGameTeamUpdateRequest = mapSchemeGameTeamUpdateRequest(this.value);
        return this.schemeGameTeamService.update(this.model.scheme.id, this.model.game.game.id, this.model.team.id, request).pipe(
            tap((response: ISchemeGameTeamUpdateResponse) => this.onUpdated(response))
        );
    }

    public menu: ISideMenuModel = {
        label: SchemeGameTeamEditPageLocalization.MENU.TITLE,
        open: true,
        switch: true,
        items: [
            {
                id: SchemeGameTeamEditPageRoute.Profile,
                label: SchemeGameTeamEditPageLocalization.MENU.ITEMS.PROFILE,
                icon: faHouse,
                type: SideMenuItemType.Item,
                active: true,
                open: true,
                items: [
                    {
                        id: SchemeGameTeamProfileEditRoute.General,
                        label: SchemeGameTeamEditPageLocalization.MENU.ITEMS.GENERAL,
                        icon: faInfo,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, SchemeGameTeamEditPageRoute.Profile)
                    }
                ]
            },
            {
                id: SchemeGameTeamEditPageRoute.Formation,
                label: SchemeGameTeamEditPageLocalization.MENU.ITEMS.FORMATION,
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
        private schemeGameTeamService: SchemeGameTeamService,
        private schemeFormationEditFieldService: SchemeFormationEditFieldService,
        private enumService: EnumService
    ) {
    }

    ngOnInit(): void {
        this.schemeFormationEditFieldService.init(this.model.scheme.formation.players);
        this.form = this.buildForm();
        this.changesCheckService.init(this.form);
        this.setPageTitle();
        this.setMenuActiveItem();
        this._menuSubscription = this.form.statusChanges.subscribe(() =>
            setMenuInvalidItem(this.menu, (key: string) => isMenuItemInvalid(this.form, key)));
    }

    ngOnDestroy(): void {
        this._menuSubscription.unsubscribe();
    }

    private buildForm(): FormGroup {
        const form: FormGroup = this.formBuilder.group({});

        // profile
        addSchemeGameTeamProfileEditControl(this.formBuilder, form);
        addSchemeGameTeamGeneralProfileEditControl(this.formBuilder, form, this.model.scheme.profile);

        // formations
        addSchemeGameTeamFormationEditControl(this.formBuilder, form, this.enumService, this.model.scheme);

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
            value: SchemeGameTeamEditPageLocalization.NOTIFICATION.UPDATED.VALUE,
            title: SchemeGameTeamEditPageLocalization.NOTIFICATION.UPDATED.TITLE
        };

        this.notificationService.notify(notification);
    }
}