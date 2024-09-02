import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef,
  OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  faArrowLeft, faAsterisk, faCamera, faIdCard, faPeopleGroup, faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';
import {
  CommonConstants, IDefaultModalFooterModel, IDefaultModalHeaderModel,
  isEqual, ButtonType, ModalTemplate, convertToBase64String, parseFileSize, nameof, isDefined, Position
} from 'ngx-sfc-common';
import {
  fromEvent, map, Observable, startWith, Subscription, tap, switchMap,
  filter, catchError, of, BehaviorSubject, from
} from 'rxjs';
import { HeaderService } from '@core/components';
import { IForm } from '@core/types';
import { EditPageConstants } from './edit.page.constants';
import { EditPagePart } from './enums/edit-page-part.enum';
import { EditPageLocalization } from './edit.page.localization';
import { BaseErrorResponse } from '@core/models';
import { StatsService } from './parts/stats/services/stats.service';
import { getProgressColorDynamicallyFunc, IDropdownMenuItemModel, TabsTemplate } from 'ngx-sfc-components';
import { buildTitle, markFormTouchedAndDirty } from '@core/utils';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { RoutKey } from '@core/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { IProfileModel } from './mapper/models/profile.model';
import { IChangesCheck, IChangesCheckGuardModel } from '@core/guards/changes-check/changes-check.model';
import { Title } from '@angular/platform-browser';
import { NotificationService } from '@core/services';
import { MessageSeverity } from '@core/services/message/message-severity.enum';
import { PlayerService as SharedPlayerService } from '@share/services';
import { PlayerService } from '../../services/player/player.service';
import { IPlayerByUserModel } from '@share/services/player/models/by-user/get-player-by-user.response';
import { INotification } from '@core/services/notification/notification.model';
import { fileMaxSize } from 'ngx-sfc-inputs';
import { mapPlayerRequest } from './mapper/edit.page.mapper';
import { IEditModel } from './models/edit.page.model';
import { EditPagePersonalViewModel, EditPageProgressViewModel, EditPageRaitingViewModel, IEditPageViewModel } from './models';
import { ICreatePlayerRequest, ICreatePlayerResponse, IUpdatePlayerRequest, IUpdatePlayerResponse } from '../../services/player/models';
import { CommonConstants as ApplicationCommonConstants } from '@core/constants';

@Component({
  templateUrl: './edit.page.component.html',
  styleUrls: ['./edit.page.component.scss']
})
export class EditPageComponent
  implements OnInit, AfterViewInit, IChangesCheck, OnDestroy {

  faArrowLeft = faArrowLeft;
  faCamera = faCamera;
  faAsterisk = faAsterisk;
  faQuestionCircle = faQuestionCircle;
  faTriangleExclamation = faTriangleExclamation;

  Position = Position;
  ButtonType = ButtonType;
  TabsTemplate = TabsTemplate;
  ModalTemplate = ModalTemplate;
  EditPagePart = EditPagePart;
  Constants = EditPageConstants;
  CommonConstants = CommonConstants;
  ApplicationCommonConstants = ApplicationCommonConstants;
  Localization = EditPageLocalization;
  getProgressColorDynamicallyFunc = getProgressColorDynamicallyFunc;

  public get PHOTO_MAX_SIZE_VALIDATION(): string {
    const photoControl = this.profileForm?.controls[nameof<IEditModel>('photo')];

    return isDefined(photoControl.errors)
      ? `${this.Localization.INPUT.PHOTO.VALIDATIONS.MAX_SIZE_PART_1} 
        ${parseFileSize(this.Constants.MAX_PHOTO_SIZE)}, 
        ${this.Localization.INPUT.PHOTO.VALIDATIONS.MAX_SIZE_PART_2} 
        ${parseFileSize(photoControl.errors!['sfc-file-max-size']['actualSize'])}.`
      : CommonConstants.EMPTY_STRING;
  }

  public ACTION_ITEMS: IDropdownMenuItemModel[] = [
    {
      label: EditPageLocalization.ACTION.CREATE_TEAM,
      icon: faPeopleGroup,
      click: () => this.router.navigate([`${RoutKey.Teams}/${RoutKey.Create}`]),
      delimeter: this.sharedPlayerService.playerCreated
    }
  ];

  public get changesModalFooterModel(): IDefaultModalFooterModel {
    return {
      applyButton: true,
      cancelButton: true,
      applyButtonText: this.Localization.CHANGES_MODAL.BUTTONS.YES_DISCARD_CHANGES,
      cancelButtonText: this.Localization.CHANGES_MODAL.BUTTONS.NO,
      onApply: (url: string) => {
        this.discardChanges = true;
        this.router.navigate([url]);
      }
    }
  }

  public get changesModalHeaderModel(): IDefaultModalHeaderModel {
    return {
      showCloseIcon: true,
      text: this.Localization.CHANGES_MODAL.TITLE
    };
  }

  public profileForm!: FormGroup;

  public vm$!: Observable<IEditPageViewModel>;

  public error: BaseErrorResponse | null = null;

  // Disable submit button when: 1) Form invalid, 2) Form has no changes
  public get submitDisabled(): boolean { return (this.isSubmitted && this.profileForm.invalid) || !this.profileChanged; }

  public get isSubmitted(): boolean { return this.submitted || this.sharedPlayerService.playerCreated };

  private get profileChanged(): boolean { return !isEqual(this.guardChangesSubject?.value, this.profileForm.value); }

  private guardChangesSubject: BehaviorSubject<IEditModel> = new BehaviorSubject<IEditModel>(null!);

  public guardChanges$: Observable<IChangesCheckGuardModel> = this.guardChangesSubject.asObservable()
    .pipe(map(() => ({ dirty: this.profileChanged, discardChanges: this.discardChanges })));

  private discardChanges: boolean = false;

  private submitted: boolean = false;

  @ViewChild('submitBtn', { static: false, read: ElementRef })
  private submitBtn!: ElementRef;

  private _subscription!: Subscription;

  constructor(
    public headerService: HeaderService,
    public statsService: StatsService,
    public sharedPlayerService: SharedPlayerService,
    private formBuilder: FormBuilder,
    private playerService: PlayerService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private titleService: Title,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    const controls: IForm<IEditModel> = {
      photo: [null, fileMaxSize(this.Constants.MAX_PHOTO_SIZE)]
    };

    this.profileForm = this.formBuilder.group(controls);
  }

  ngAfterViewInit(): void {
    this.initValues();
    this.initListeners();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private initValues(): void {
    const profile: IProfileModel = this.route.snapshot.data[EditPageConstants.RESOLVE_KEY]?.result;

    if (this.sharedPlayerService.playerCreated) {
      const { photo: _, ...general } = profile?.general!,
        generalProfile = { ...general, tags: JSON.parse(JSON.stringify(general.tags)) },
        profileValue: IEditModel = {
          photo: profile?.general.photo!,
          general: generalProfile,
          football: profile?.football!,
          stats: profile?.stats.value!
        };

      this.profileForm.setValue(profileValue, { emitEvent: true });

      this.setPageTitle();

      this.setGuardChangesModel();

      this.setActions();
    }

    this.statsService.init({
      available: this.sharedPlayerService.playerCreated
        ? profile.stats.points.available
        : EditPageConstants.NEW_PROFILE_AVAILABLE_POINTS,
      used: profile?.stats.points.used || 0
    });
  }

  private initListeners(): void {
    const changes$ = this.profileForm.valueChanges.pipe(
      startWith(this.profileForm.value)
    );

    this.vm$ = changes$.pipe(
      map((model: IEditModel) => {
        return {
          // only main page
          personal: new EditPagePersonalViewModel(model),
          // only main page
          progress: new EditPageProgressViewModel(model),
          // main page (total, value, percentage and stars)
          raiting: new EditPageRaitingViewModel(model.stats)
        };
      }));

    this._subscription = changes$.pipe(
      tap(() => this.error = null),
      switchMap((value: IEditModel) => {
        return fromEvent<InputEvent>(this.submitBtn.nativeElement, 'click')
          .pipe(
            tap(() => this.tapSubmit()),
            filter(() => this.profileForm.valid),
            switchMap(() => from(mapPlayerRequest(
              value,
              { available: this.statsService.stats.available, used: this.statsService.stats.used })
            )),
            switchMap((request: ICreatePlayerRequest | IUpdatePlayerRequest) => (this.sharedPlayerService.playerCreated
              ? this.playerService.update(this.sharedPlayerService.playerId.value!, request)
              : this.playerService.create(request))
              .pipe(catchError((error) => of(error))))
          );
      })
    ).subscribe((response: ICreatePlayerResponse | IUpdatePlayerResponse) => {
      this.error = response.Success ? null : response as BaseErrorResponse;

      if (response.Success)
        this.afterModification(response);
    });
  }

  private async afterModification(response: ICreatePlayerResponse | IUpdatePlayerResponse): Promise<void> {
    const playerId = this.sharedPlayerService.playerCreated
      ? this.sharedPlayerService.playerId.value!
      : (response as ICreatePlayerResponse).Player.Id;

    this.setGuardChangesModel();

    this.setPageTitle();

    this.notify();

    this.statsService.init({ available: this.statsService.stats.available, used: this.statsService.stats.used });

    this.updatePlayer(playerId);

    this.router.navigate([`${RoutKey.Profiles}/${playerId}/${RoutKey.Edit}`]);
  }

  private tapSubmit(): void {
    if (!this.submitted) {
      this.submitted = true;
      markFormTouchedAndDirty(this.profileForm);
    }
  }

  private setGuardChangesModel(): void {
    const model: IEditModel = {
      ...this.profileForm.value,
      general: {
        ...this.profileForm.value.general,
        tags: JSON.parse(JSON.stringify(this.profileForm.value.general.tags))
      }
    };

    this.guardChangesSubject.next(model);
  }

  private setActions(): void {
    const profileActionItem: IDropdownMenuItemModel = {
      label: EditPageLocalization.ACTION.OPEN_VIEW,
      click: () => this.router.navigate([`${RoutKey.Players}/${this.sharedPlayerService.playerId.value}`]),
      icon: faIdCard
    };
    this.ACTION_ITEMS.push(profileActionItem);
  }

  private setPageTitle(): void {
    const pageTitle = buildTitle(`${this.profileForm.value.general.firstName} ${this.profileForm.value.general.lastName}`);
    this.titleService.setTitle(pageTitle);
  }

  private notify(): void {
    const notification: INotification = {
      severity: MessageSeverity.INFO,
      value: this.sharedPlayerService.playerCreated
        ? this.Localization.NOTIFICATIONS.UPDATE.VALUE
        : this.Localization.NOTIFICATIONS.CREATE.VALUE,
      title: this.sharedPlayerService.playerCreated
        ? this.Localization.NOTIFICATIONS.UPDATE.TITLE
        : this.Localization.NOTIFICATIONS.CREATE.TITLE
    };

    this.notificationService.notify(notification);
  }

  private async updatePlayer(playerId: number): Promise<void> {
    const playerByUserModel: IPlayerByUserModel = {
      Id: playerId,
      Profile: {
        General: {
          FirstName: this.profileForm.value.general.firstName,
          LastName: this.profileForm.value.general.lastName,
          Photo: this.profileForm.value.photo
            ? await convertToBase64String(this.profileForm.value.photo)
            : null
        },
        Football: {
          Position: this.profileForm.value.football.position?.key
        }
      }
    };

    this.sharedPlayerService.update(playerByUserModel);
  }
}