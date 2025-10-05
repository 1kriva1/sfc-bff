import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Navigation, Router } from "@angular/router";
import { CoreLocalization } from "@core/localization";
import { INotification, NotificationService, StorageService } from "@core/services";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { buildTitle, getBackNavigationModel, getRouteData, getUrlSegment } from "@core/utils";
import { faBookOpen, faChessBoard, faCircleInfo, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { setMenuActiveItem } from "@share/utils/components";
import { ISideMenuItemModel, ISideMenuModel, SideMenuItemType } from "ngx-sfc-components";
import { Observable, startWith } from "rxjs";
import { IChangesCheck } from "@core/guards/changes-check/changes-check.model";
import { ChangesCheckService } from "@core/guards/changes-check/changes-check.service";
import { SchemeTeamEditPageLocalization } from "./scheme-team-edit-page.localization";
import { SchemeTeamEditPageRoute } from "./scheme-team-edit-page-route.enum";
import { SchemeTeamEditPageConstants } from "./scheme-team-edit-page.constants";
import { mapSchemeTeamEditPageFormModel, mapUpdateTeamSchemeRequest } from "./scheme-team-edit-page.mapper";
import { IForm } from "@core/types";
import { CommonConstants, empty, firstOrDefault } from "ngx-sfc-common";
import { ValidationConstants } from "@share/constants";
import { ShareLocalization } from "@share/localization";
import { Location } from "@angular/common";
import { IBackNavigationModel } from "@core/models";
import { ISchemeTeamEditPageFormModel } from "./scheme-team-edit-page-form.model";
import { ISchemeTeamModel } from "@share/models/scheme/scheme-team.model";
import { ISelectItemModel } from "ngx-sfc-inputs";
import { EnumService, IUpdateTeamSchemeRequest, IUpdateTeamSchemeResponse, SchemeTeamService } from "@share/services";
import { IFormationEnumModel } from "@share/services/enum/models/enum/formation-enum.model";
import { buildSchemeTeamFormationPlayerEditFieldFormModels } from "../../utils/scheme-team-form.utils";
import { mapSelectItems } from "@share/utils/inputs";
import { RouteConstants } from "@core/constants";
import { SchemeTeamProfileEditRoute } from "../../components";
import { SchemeTeamFormationEditFieldService } from "../../components/edit/formation/parts/field/scheme-team-formation-edit-field.service";
import { ISchemeTeamProfileGeneralEditFormModel } from "../../components/edit/profile/parts/general/scheme-team-profile-general-edit-form.model";
import { SchemeTeamProfileEditPart } from "../../components/edit/profile/enums/scheme-team-profile-edit-part.enum";
import { SchemeTeamEditPart } from "../../components/edit/scheme-team-edit-part.enum";
import { ISchemeTeamFormationEditFormModel } from "../../components/edit/formation/scheme-team-formation-edit-form.model";
import { ISchemeTeamFormationPlayerEditFieldFormModel } from "../../components/edit/formation/parts/field/models/scheme-team-formation-edit-field-form.model";
import { SchemeTeamFormationEditPart } from "../../components/edit/formation/scheme-team-formation-edit-part.enum";
import { ISchemeTeamEditFormModel } from "../../components/edit/scheme-team-edit-form.model";

@Component({
    templateUrl: './scheme-team-edit-page.component.html',
    styleUrls: ['./scheme-team-edit-page.component.scss']
})
export class SchemeTeamEditPageComponent implements OnInit, OnDestroy, IChangesCheck {

    // icons
    faQuestionCircle = faQuestionCircle;

    // core
    CoreLocalization = CoreLocalization;

    // component
    Localization = SchemeTeamEditPageLocalization;

    public menu: ISideMenuModel = {
        label: this.Localization.MENU.TITLE,
        open: true,
        switch: false,
        items: [
            {
                id: SchemeTeamEditPageRoute.Profile,
                label: this.Localization.MENU.ITEMS.PROFILE,
                icon: faCircleInfo,
                type: SideMenuItemType.Item,
                active: true,
                open: true,
                items: [
                    {
                        id: SchemeTeamProfileEditRoute.General,
                        label: this.Localization.MENU.ITEMS.GENERAL,
                        icon: faBookOpen,
                        type: SideMenuItemType.Item,
                        click: item => this.navigate(item, SchemeTeamEditPageRoute.Profile)
                    }
                ]
            },
            {
                id: SchemeTeamEditPageRoute.Formation,
                label: this.Localization.MENU.ITEMS.FORMATION,
                icon: faChessBoard,
                type: SideMenuItemType.Item,
                active: false,
                click: item => this.navigate(item)
            }
        ]
    };

    public form: FormGroup;

    public get value(): ISchemeTeamEditPageFormModel { return this.form.value; }

    public get value$(): Observable<ISchemeTeamEditPageFormModel> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    public update: (value: ISchemeTeamEditPageFormModel) => Observable<IUpdateTeamSchemeResponse> = (value: ISchemeTeamEditPageFormModel) => {
        const request: IUpdateTeamSchemeRequest = mapUpdateTeamSchemeRequest(value);
        return this.schemeTeamService.update(this.model.id, this.model.team.id, request)
    }

    public model: ISchemeTeamModel;

    public backNavigationModel: IBackNavigationModel | empty = null;

    constructor(
        public changesCheckService: ChangesCheckService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private titleService: Title,
        private schemeTeamService: SchemeTeamService,
        private notificationService: NotificationService,
        private location: Location,
        private enumService: EnumService,
        private storageService: StorageService,
        private schemeTeamFormationEditFieldService: SchemeTeamFormationEditFieldService) {
        this.backNavigationModel = this.getBackNavigationModel();
        this.model = this.getResolveModel();
        this.form = this.buildForm();
        this.setMenuActiveItem();
    }

    ngOnInit(): void {
        this.setFormValue();
        this.setPageTitle();
        this.schemeTeamFormationEditFieldService.init(this.model.formation.players);
        this.changesCheckService.init(this.form);
    }

    ngOnDestroy(): void {
        this.schemeTeamFormationEditFieldService.clear();
    }

    public onUpdated(response: IUpdateTeamSchemeResponse): void {
        if (response.Success) {
            this.setPageTitle();
            this.notify();
            this.changesCheckService.set(this.form);
        }
    }

    public onRemoved(_: ISchemeTeamModel): void {
        this.navigateBack();
    }

    private getResolveModel(): ISchemeTeamModel {
        const routeData: ISchemeTeamModel | null =
            getRouteData(this.route.snapshot, SchemeTeamEditPageConstants.RESOLVE_KEY);

        if (!routeData) {
            console.error('Missing resolve model!');
        }

        return routeData!;
    }

    private buildForm(): FormGroup {
        const form: FormGroup = this.formBuilder.group({});

        const profileEditFormGroup: FormGroup = this.formBuilder.group({});

        const generalProfileEditControls: IForm<ISchemeTeamProfileGeneralEditFormModel> = {
            name: [CommonConstants.EMPTY_STRING, [Validators.required, Validators.maxLength(ValidationConstants.MAX_NAME_LENGTH)]],
            comment: [CommonConstants.EMPTY_STRING, [Validators.maxLength(ValidationConstants.MAX_DESCRIPTION_LENGTH)]]
        }, generalProfileEditFormGroup: FormGroup = this.formBuilder.group(generalProfileEditControls);

        profileEditFormGroup.addControl(SchemeTeamProfileEditPart.General, generalProfileEditFormGroup);

        form.addControl(SchemeTeamEditPart.Profile, profileEditFormGroup);

        const typeData: ISelectItemModel[] = mapSelectItems(this.enumService.enums.formationType),
            formationId: number = this.enumService.enums.formations[0].key,
            formation: IFormationEnumModel =
                firstOrDefault(this.enumService.enums.formations, (formation: IFormationEnumModel) => formation.key === formationId)!,
            formationEditControls: IForm<ISchemeTeamFormationEditFormModel> = {
                formation: [formationId, [Validators.required]],
                type: [typeData[0]]
            }, formationEditFormGroup: FormGroup = this.formBuilder.group(formationEditControls);

        const players: ISchemeTeamFormationPlayerEditFieldFormModel[] =
            buildSchemeTeamFormationPlayerEditFieldFormModels(formation, this.schemeTeamFormationEditFieldService.players),
            fieldEditFormGroup: FormGroup = this.formBuilder.group({
                players: this.formBuilder.array(players)
            });

        formationEditFormGroup.addControl(SchemeTeamFormationEditPart.Field, fieldEditFormGroup);

        form.addControl(SchemeTeamEditPart.Formation, formationEditFormGroup);

        return form;
    }

    private setMenuActiveItem(): void {
        const segment: string = getUrlSegment(this.router.url);
        setMenuActiveItem(this.menu, segment);
    }

    private setFormValue(): void {
        const value: ISchemeTeamEditFormModel = mapSchemeTeamEditPageFormModel(this.model, this.enumService);
        this.form.setValue(value, { emitEvent: true });
    }

    private setPageTitle(): void {
        const pageTitle = buildTitle(`${ShareLocalization.TEAM_SCHEME} - ${this.model.profile.general.name}`);
        this.titleService.setTitle(pageTitle);
    }

    private navigate(item: ISideMenuItemModel, command?: string): void {
        const commandValue: string = command ? `${command}/${item.id}` : item.id!;
        this.router.navigate([commandValue], { relativeTo: this.route });
    }

    private notify(): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: SchemeTeamEditPageLocalization.NOTIFICATION.UPDATED.VALUE,
            title: SchemeTeamEditPageLocalization.NOTIFICATION.UPDATED.TITLE
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