import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, OnInit, ViewChild } from "@angular/core";
import { faCamera, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { ButtonType, CommonConstants, isDefined, isNullOrEmptyString, nameof, parseFileSize, Position, removeItem } from "ngx-sfc-common";
import { ITabModel, TabsTemplate } from "ngx-sfc-components";
import { CommonConstants as ApplicationCommonConstants } from '@core/constants';
import { FormBuilder, FormGroup } from "@angular/forms";
import { BaseErrorResponse } from "@core/models";
import { IBaseEditPageModel } from "./models/base-edit.page.model";
import { IBaseEditPageViewModel } from "./models/base-edit-page-view.model";
import { BaseEditPageConstants } from "./base-edit.page.constants";
import { BaseEditPageLocalization } from "./base-edit.page.localization";
import { EditPagePart } from "../../components/edit/edit-page-part.enum";
import { Observable, startWith, map } from "rxjs";
import { IForm } from "@core/types";
import { fileMaxSize } from "ngx-sfc-inputs";
import { HeaderService } from "@core/components";
import { ProgressService } from "../../services/progress/progress.service";
import { PlayersService } from "../../services/players/players.service";
import { buildPlaceholder } from "@core/utils";

@Directive()
export abstract class BaseEditPageComponent<EM extends IBaseEditPageModel, VM extends IBaseEditPageViewModel>
    implements OnInit, AfterViewInit {

    faCamera = faCamera;
    faQuestionCircle = faQuestionCircle;

    ButtonType = ButtonType;
    Position = Position;
    TabsTemplate = TabsTemplate;
    CommonConstants = CommonConstants;

    ApplicationCommonConstants = ApplicationCommonConstants;

    EditPagePart = EditPagePart;

    BaseConstants = BaseEditPageConstants;
    BaseLocalization = BaseEditPageLocalization;

    public get LOGO_MAX_SIZE_VALIDATION(): string {
        const logoControl = this.form?.controls[nameof<IBaseEditPageModel>('logo')];

        return isDefined(logoControl.errors)
            ? `${BaseEditPageLocalization.INPUT.LOGO.VALIDATIONS.MAX_SIZE_PART_1} 
            ${parseFileSize(BaseEditPageConstants.MAX_PHOTO_SIZE)}, 
            ${BaseEditPageLocalization.INPUT.LOGO.VALIDATIONS.MAX_SIZE_PART_2} 
            ${parseFileSize(logoControl.errors!['sfc-file-max-size']['actualSize'])}.`
            : CommonConstants.EMPTY_STRING;
    };

    public form!: FormGroup;

    public vm$!: Observable<IBaseEditPageViewModel>;

    public error: BaseErrorResponse | null = null;

    public abstract TABS: ITabModel[];

    @ViewChild('submitBtn', { static: false, read: ElementRef })
    protected submitBtn!: ElementRef;

    protected submitted: boolean = false;

    constructor(
        public headerService: HeaderService,
        private formBuilder: FormBuilder,
        private progressService: ProgressService,
        public playersService: PlayersService,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        const controls: IForm<EM> = {
            logo: [null, fileMaxSize(BaseEditPageConstants.MAX_PHOTO_SIZE)]
        };

        this.form = this.formBuilder.group(controls);

        const changes$ = this.form.valueChanges.pipe(
            startWith(BaseEditPageConstants.DEFAULT_FORM_VALUE),
            map((model: EM) => {
                const { players: _, ...value } = model;
                return value;
            })
        );

        this.progressService.init(changes$);
    }

    ngAfterViewInit(): void {
        const changes$ = this.form.valueChanges.pipe(
            startWith(this.form.value)
        );

        this.vm$ = changes$.pipe(
            map((model: EM) => ({
                name: isNullOrEmptyString(model.information.general.name)
                    ? buildPlaceholder(BaseEditPageLocalization.VIEW_MODEL.NAME)
                    : model.information.general.name,
                city: isNullOrEmptyString(model.information.general.city)
                    ? buildPlaceholder(BaseEditPageLocalization.VIEW_MODEL.CITY)
                    : model.information.general.city,
                stars: this.playersService.stars
            })));

        this.changeDetectorRef.detectChanges();
    }

    public removePlayer(id: number): void {
        removeItem(this.form.value.players, id);
        this.playersService.removeById(id);
    }
}