import { Component, OnDestroy } from "@angular/core";
import { faBookOpen, faChessBoard, faCircleInfo, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Navigation, Router } from "@angular/router";
import { CoreLocalization } from "@core/localization";
import { ISideMenuItemModel, ISideMenuModel, SideMenuItemType } from "ngx-sfc-components";
import { Observable, startWith } from "rxjs";
import { SchemeTeamCreatePageLocalization } from "./scheme-team-create-page-page.localization";
import { SchemeTeamCreatePageRoute } from "./scheme-team-create-page-route.enum";
import { SchemeTeamCreatePageFormModel } from "./models/scheme-team-create-page-form.model";
import { CommonConstants, empty, firstOrDefault } from "ngx-sfc-common";
import { getBackNavigationModel, getRouteData, getUrlSegment } from "@core/utils";
import { setMenuActiveItem } from "@share/utils/components";
import { INotification, NotificationService, StorageService } from "@core/services";
import { MessageSeverity } from "@core/services/message/message-severity.enum";
import { Location } from "@angular/common";
import { SchemeTeamCreatePageConstants } from "./scheme-team-create-page.constants";
import { IForm } from "@core/types";
import { IBackNavigationModel } from "@core/models";
import { RouteConstants } from "@core/constants";
import { ISchemeTeamCreatePageResolveModel } from "./models/scheme-team-create-page-resolve.model";
import { ValidationConstants } from "@share/constants";
import { EnumService, ICreateTeamSchemeRequest, ICreateTeamSchemeResponse, SchemeTeamService } from "@share/services";
import { ISelectItemModel } from "ngx-sfc-inputs";
import { mapSelectItems } from "@share/utils/inputs";
import { IFormationEnumModel } from "@share/services/enum/models/enum/formation-enum.model";
import { buildSchemeTeamFormationPlayerEditFieldFormModels } from "../../utils/scheme-team-form.utils";
import { SchemeTeamProfileEditRoute } from "../../components";
import { mapCreateTeamSchemeRequest } from "./scheme-team-create-page.mapper";
import { ISchemeTeamProfileGeneralEditFormModel } from "../../components/edit/profile/parts/general/scheme-team-profile-general-edit-form.model";
import { SchemeTeamProfileEditPart } from "../../components/edit/profile/enums/scheme-team-profile-edit-part.enum";
import { SchemeTeamEditPart } from "../../components/edit/scheme-team-edit-part.enum";
import { ISchemeTeamFormationEditFormModel } from "../../components/edit/formation/scheme-team-formation-edit-form.model";
import { ISchemeTeamFormationPlayerEditFieldFormModel } from "../../components/edit/formation/parts/field/models/scheme-team-formation-edit-field-form.model";
import { SchemeTeamFormationEditPart } from "../../components/edit/formation/scheme-team-formation-edit-part.enum";
import { SchemeTeamFormationEditFieldService } from "../../components/edit/formation/parts/field/scheme-team-formation-edit-field.service";

@Component({
    templateUrl: './scheme-team-create-page.component.html',
    styleUrls: ['./scheme-team-create-page.component.scss']
})
export class SchemeTeamCreatePageComponent implements OnDestroy {

    // icons
    faQuestionCircle = faQuestionCircle;

    // core
    CoreLocalization = CoreLocalization;

    // component
    Localization = SchemeTeamCreatePageLocalization;

    public menu: ISideMenuModel = {
        label: this.Localization.MENU.TITLE,
        open: true,
        switch: false,
        items: [
            {
                id: SchemeTeamCreatePageRoute.Profile,
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
                        click: item => this.navigate(item, SchemeTeamCreatePageRoute.Profile)
                    }
                ]
            },
            {
                id: SchemeTeamCreatePageRoute.Formation,
                label: this.Localization.MENU.ITEMS.FORMATION,
                icon: faChessBoard,
                type: SideMenuItemType.Item,
                active: false,
                click: item => this.navigate(item)
            }
        ]
    };

    public get value(): SchemeTeamCreatePageFormModel { return this.form.getRawValue(); }

    public get value$(): Observable<SchemeTeamCreatePageFormModel> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    public form: FormGroup;

    public create: (value: SchemeTeamCreatePageFormModel) => Observable<ICreateTeamSchemeResponse> = (value: SchemeTeamCreatePageFormModel) => {
        const request: ICreateTeamSchemeRequest = mapCreateTeamSchemeRequest(value);
        return this.schemeTeamService.create(this.model.team.id, request);
    }

    public model: ISchemeTeamCreatePageResolveModel;

    public backNavigationModel: IBackNavigationModel | empty = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        private schemeTeamService: SchemeTeamService,
        private storageService: StorageService,
        private location: Location,
        private enumService: EnumService,
        private schemeTeamFormationEditFieldService: SchemeTeamFormationEditFieldService) {
        this.model = getRouteData(this.route.snapshot, SchemeTeamCreatePageConstants.RESOLVE_KEY)!;
        this.form = this.buildForm();
        this.backNavigationModel = this.getBackNavigationModel();
        this.setMenuActiveItem();
    }

    ngOnDestroy(): void {
        this.schemeTeamFormationEditFieldService.clear();
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

    public onCreated(response: ICreateTeamSchemeResponse): void {
        if (response.Success) {
            this.navigateBack();
            this.notify();
        }
    }

    private notify(): void {
        const notification: INotification = {
            severity: MessageSeverity.INFO,
            value: SchemeTeamCreatePageLocalization.NOTIFICATION.CREATED.VALUE,
            title: SchemeTeamCreatePageLocalization.NOTIFICATION.CREATED.TITLE
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

    private navigateBack(): void {
        if (this.backNavigationModel) {
            this.router.navigate([this.backNavigationModel.url]);
        } else {
            this.location.back();
        }
    }
}