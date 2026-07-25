import { Component, Input, OnInit } from "@angular/core";
import { ButtonType, CommonConstants, Sequence, firstOrDefault, getNextItemByKey, getPreviousItemByKey, nameof, NotificationType, any } from 'ngx-sfc-common';
import { IFormProgressActionsModel } from "./models/form-progress-actions.model";
import { FormProgressService } from "../../form-progress.service";
import { EMPTY, filter, map, Observable } from "rxjs";
import { IFormProgressStepModel } from "../step/form-progress-step.model";
import { faArrowLeft, faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { IFormProgressActionsViewModel } from "./models/form-progress-actions-view.model";
import { FormGroup } from "@angular/forms";
import { IFormProgressModel } from "../../form-progress.model";
import { empty } from "ngx-sfc-common";
import { CoreLocalization } from "@core/localization";

@Component({
  selector: 'sfc-form-progress-actions',
  templateUrl: './form-progress-actions.component.html',
  styleUrls: ['./form-progress-actions.component.scss']
})
export class FormProgressActionsComponent implements OnInit {

  // ngx-sfc-common
  ButtonType = ButtonType;
  NotificationType = NotificationType;

  /* Inputs */

  @Input()
  key: string = CommonConstants.EMPTY_STRING;

  @Input()
  form!: FormGroup;

  /* End Inputs */

  /* Observables */

  public viewModel$: Observable<IFormProgressActionsViewModel> = EMPTY;

  public result$: Observable<any> = EMPTY;

  /* End Observables */

  constructor(private formProgressService: FormProgressService) { }

  ngOnInit(): void {
    this.viewModel$ = this.formProgressService.steps$.pipe(
      filter((steps: IFormProgressModel[]) => any(steps)),
      map((steps: IFormProgressModel[]) => steps.map((model: IFormProgressModel) => model.step)),
      map((steps: IFormProgressStepModel[]) => {
        const currentStep: IFormProgressStepModel | empty = firstOrDefault(steps, (step: IFormProgressStepModel) => step.key == this.key),
          previousStep: IFormProgressStepModel | empty = getPreviousItemByKey(steps, nameof<IFormProgressStepModel>('key'), this.key),
          nextStep: IFormProgressStepModel | empty = getNextItemByKey(steps, nameof<IFormProgressStepModel>('key'), this.key),
          previousAction: IFormProgressActionsModel | empty = currentStep?.actions?.previous,
          nextAction: IFormProgressActionsModel | empty = currentStep?.actions?.next;

        return {
          previous: previousStep
            ? {
              text: previousAction?.text ?? CoreLocalization.BACK,
              icon: previousAction?.icon ?? faArrowLeft,
              action: () => this.onAction(Sequence.Previous, previousStep, previousAction)
            }
            : null,
          next: nextStep
            ? {
              text: nextAction?.text ?? CoreLocalization.NEXT,
              icon: nextAction?.icon ?? faArrowRight,
              action: () => this.onAction(Sequence.Next, nextStep, nextAction)
            }
            : {
              text: nextAction?.text ?? CoreLocalization.CREATE,
              icon: nextAction?.icon ?? faCheck,
              action: () => this.onAction(Sequence.Next, nextStep, nextAction)
            }
        }
      })
    );
  }

  public onAction(sequence: Sequence, step: IFormProgressStepModel | empty, stepAction?: IFormProgressActionsModel): void {
    if (sequence == Sequence.Next && this.form.invalid) {
      return;
    }

    if (stepAction?.action) {
      this.result$ = stepAction.action();
      return;
    }

    if (step) {
      this.formProgressService.navigate(step);
    }
  }
}