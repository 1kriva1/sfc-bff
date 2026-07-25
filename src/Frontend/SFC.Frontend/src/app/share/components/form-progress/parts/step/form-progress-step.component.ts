import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { faCircleExclamation, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Color, CommonConstants, Direction, UIClass } from 'ngx-sfc-common';
import { IFormProgressStepModel } from './form-progress-step.model';
import { FormProgressStepConstants } from './form-progress-step.constants';
import { Router } from '@angular/router';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EMPTY, map, Observable, of, startWith } from 'rxjs';
import { IMapProgressModel, mapProgress } from '../../../../utils';
import { hasInvalidAndDirtyControl } from '@core/utils';
import { FormProgressService } from '../../form-progress.service';

@Component({
  selector: 'sfc-form-progress-step',
  templateUrl: './form-progress-step.component.html',
  styleUrls: ['./form-progress-step.component.scss']
})
export class FormProgressStepComponent implements OnInit {

  // icons
  faCircleExclamation = faCircleExclamation;

  // ngx-sfc-common
  Direction = Direction;

  // component
  Constants = FormProgressStepConstants;

  /* Inputs */

  @Input()
  model: IFormProgressStepModel = {
    key: CommonConstants.EMPTY_STRING,
    name: CommonConstants.EMPTY_STRING,
    icon: faStepForward,
    color: Color.Black_0
  };

  @Input()
  control: AbstractControl | null = null;

  @Input()
  delimeter: boolean = false;

  @Input()
  @HostBinding('class.' + UIClass.Pointer)
  selectable: boolean = true;

  @Input()
  @HostBinding('class.' + UIClass.Selected)
  selected: boolean = false;

  @Input()
  @HostBinding('class.' + UIClass.Disabled)
  pristine: boolean = true;

  /* End Inputs */

  /* Host */

  @HostListener('click')
  onClick(): void {
    if (this.selectable) this.formProgressService.navigate(this.model);
  }

  /* End Host */

  /* Properties */

  public get invalid(): boolean { return this.control ? hasInvalidAndDirtyControl(this.control as FormGroup) : false }

  /* End Properties */

  /* Observables */

  public progress$: Observable<IMapProgressModel> = EMPTY;

  /* End Observables */

  constructor(private router: Router, public formProgressService: FormProgressService) { }

  ngOnInit(): void {
    if (this.control) {
      const value$ = this.control.valueChanges.pipe(startWith(this.control.value));

      this.progress$ = this.model.mapProgress
        ? value$.pipe(map((value: any) => this.model.mapProgress!(value)))
        : mapProgress(value$);
    } else {
      this.progress$ = of({} as IMapProgressModel);
    }

    this.selected = this.model.command == this.router.url;
  }
}
