import { ChangeDetectorRef, Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { HeaderService } from "@core/components";
import { IChangesCheck, IChangesCheckGuardModel } from "@core/guards/changes-check/changes-check.model";
import { isEqual } from "ngx-sfc-common";
import { BehaviorSubject, map, Observable } from "rxjs";
import { ProgressService } from "../../services/progress/progress.service";
import { PlayersService } from "../../services/players/players.service";
import { EditPageConstants } from "./edit.page.constants";
import { EditPageLocalization } from "./edit.page.localization";
import { faChessBoard, faCircleInfo, faFutbol, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { ITabModel } from "ngx-sfc-components";
import { EditPagePart } from "../../components/edit/edit-page-part.enum";
import { IEditPageViewModel } from "./models/edit-page-view.model";
import { IEditPageModel } from "./models/edit.page.model";
import { BaseEditPageComponent } from "../base/base-edit.page.component";

@Component({
  templateUrl: './edit.page.component.html',
  styleUrls: ['../base/base-edit.page.component.scss', './edit.page.component.scss']
})
export class EditPageComponent
  extends BaseEditPageComponent<IEditPageModel, IEditPageViewModel>
  implements IChangesCheck {

  Constants = EditPageConstants;
  Localization = EditPageLocalization;

  // Disable submit button when: 1) Form invalid, 2) Form has no changes
  public get submitDisabled(): boolean { return (this.isSubmitted && this.form.invalid) || !this.profileChanged; }

  public get isSubmitted(): boolean { return this.submitted };

  private get profileChanged(): boolean { return !isEqual(this.guardChangesSubject?.value, this.form.value); }

  private guardChangesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null!);

  public guardChanges$: Observable<IChangesCheckGuardModel> = this.guardChangesSubject.asObservable()
    .pipe(map(() => ({ dirty: false, discardChanges: false })));
    
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
    },
    {
      label: 'Schema',
      data: EditPagePart.Scheme,
      icon: faChessBoard
    },
    {
      label: 'Games',
      data: EditPagePart.Games,
      icon: faFutbol
    }
  ];

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