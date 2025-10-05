import { Component } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { BaseErrorResponse } from '@core/models';
import { SchemeTeamEditComponent } from '../scheme-team-edit.component';
import { ISchemeTeamEditFormModel } from '../scheme-team-edit-form.model';
import { SchemeTeamFormationEditLocalization } from './scheme-team-formation-edit.localization';
import { ISelectItemModel } from 'ngx-sfc-inputs';
import { mapSelectItems } from '@share/utils/inputs';
import { EnumService } from '@share/services';
import { IFormationEnumModel } from '@share/services/enum/models/enum/formation-enum.model';
import { SchemeTeamFormationEditFieldService } from './parts/field/scheme-team-formation-edit-field.service';
import { ModalService, stopAndPreventPropagation } from 'ngx-sfc-common';
import { SchemeTeamFormationEditFormConstants } from './scheme-team-formation-edit-form.constants';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './scheme-team-formation-edit.component.html',
    styleUrls: ['./scheme-team-formation-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class SchemeTeamFormationEditComponent<TFormValue extends ISchemeTeamEditFormModel, TResponse extends BaseErrorResponse>
    extends SchemeTeamEditComponent<TFormValue, TResponse> {

    // component
    Constants = SchemeTeamFormationEditFormConstants;
    Localization = SchemeTeamFormationEditLocalization;

    public types: ISelectItemModel[] = mapSelectItems(this.enumService.enums.formationType);

    public formations: IFormationEnumModel[] = this.enumService.enums.formations;

    public formation$: Observable<IFormationEnumModel> = this.formationChanges$;

    constructor(
        private modalService: ModalService,        
        private SchemeTeamFormationEditFieldService: SchemeTeamFormationEditFieldService,
        parent: FormGroupDirective,
        formBuilder: FormBuilder,
        enumService: EnumService) {
        super(parent, formBuilder, enumService);
    }

    public onFormationChange(formation: number, event: Event): void {
        if (this.SchemeTeamFormationEditFieldService.any) {
            this.modalService.open(SchemeTeamFormationEditFormConstants.MODAL.FORMATION_CHANGE.ID, formation);
            stopAndPreventPropagation(event);
        }
    }

    public onApply(formation: number): void {
        this.SchemeTeamFormationEditFieldService.clear();
        this.form.patchValue({ formation: { formation } });
    }
}