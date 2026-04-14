import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormProgressService } from './form-progress.service';

@Component({
  selector: 'sfc-form-progress',
  templateUrl: './form-progress.component.html',
  styleUrls: ['./form-progress.component.scss']
})
export class FormProgressComponent {

  /* Inputs */

  @Input()
  form!: FormGroup;

  /* End Inputs */

  constructor(public formProgressService: FormProgressService) { }

  public getStepControl(key: string): AbstractControl<any> | null { return this.form.get(key); }
}
