import { ChangeDetectorRef, Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { HeaderService } from "@core/components";
import { BehaviorSubject, map, Observable } from "rxjs";
import { CreatePageConstants } from "./create.page.constants";
import { CreatePageLocalization } from "./create.page.localization";
import { ICreatePageModel } from "./models/create.page.model";
import { isEqual } from "ngx-sfc-common";
import { faCircleInfo, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { IChangesCheckGuardModel } from "@core/guards/changes-check/changes-check.model";
import { ITabModel } from "ngx-sfc-components";
import { ICreatePageViewModel } from "./models/create-page-view.model";
import { ProgressService } from "../../services/progress/progress.service";
import { PlayersService } from "../../services/players/players.service";
import { EditPagePart } from "../../components/edit/edit-page-part.enum";
import { BaseEditPageComponent } from "../base/base-edit.page.component";

@Component({
  templateUrl: './create.page.component.html',
  styleUrls: ['../base/base-edit.page.component.scss', './create.page.component.scss']
})
export class CreatePageComponent
  extends BaseEditPageComponent<ICreatePageModel, ICreatePageViewModel> {

  Constants = CreatePageConstants;
  Localization = CreatePageLocalization;

  public get created(): boolean {
    return false;
  }

  // Disable submit button when: 1) Form invalid, 2) Form has no changes
  public get submitDisabled(): boolean { return (this.isSubmitted && this.form.invalid) || !this.profileChanged; }

  public get isSubmitted(): boolean { return this.submitted || this.created };

  private get profileChanged(): boolean { return !isEqual(this.guardChangesSubject?.value, this.form.value); }

  private guardChangesSubject: BehaviorSubject<ICreatePageModel> = new BehaviorSubject<ICreatePageModel>(null!);

  public guardChanges$: Observable<IChangesCheckGuardModel> = this.guardChangesSubject.asObservable()
    .pipe(map(() => ({ dirty: this.profileChanged, discardChanges: this.discardChanges })));

  public TABS: ITabModel[] = [
    {
      label: 'Information',
      selected: true,
      data: EditPagePart.Information,
      icon: faCircleInfo
    },
    {
      label: 'Players',
      data: EditPagePart.Players,
      icon: faPeopleGroup
    }
  ];

  private discardChanges: boolean = false;

  constructor(
    headerService: HeaderService,
    formBuilder: FormBuilder,
    progressService: ProgressService,
    playersService: PlayersService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(headerService, formBuilder, progressService, playersService, changeDetectorRef);
  }
}