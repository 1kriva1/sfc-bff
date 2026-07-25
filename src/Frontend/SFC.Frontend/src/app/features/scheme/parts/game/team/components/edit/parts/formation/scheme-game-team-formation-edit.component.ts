import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { BaseErrorResponse } from '@core/models';
import { SchemeGameTeamEditComponent } from '../../scheme-game-team-edit.component';
import { SchemeGameTeamFormationEditConstants } from './scheme-game-team-formation-edit.constants';
import { SchemeGameTeamFormationEditLocalization } from './scheme-game-team-formation-edit.localization';
import { Observable } from 'rxjs';
import { EnumService, IFormationEnumModel } from '@share/services';
import { mapSelectItems } from '@share/utils';
import { ISelectItemModel } from 'ngx-sfc-inputs';
import { ModalService, stopAndPreventPropagation } from 'ngx-sfc-common';
import { ISchemeGameTeamEditFormModel } from '../../scheme-game-team-edit-form.model';
import { ActivatedRoute } from '@angular/router';
import { getFormationControlChanges } from '../../../../../../../components/edit/parts/formation/scheme-formation-edit.utils';
import { SchemeFormationEditFieldService } from '../../../../../../../components/edit/parts/formation/parts/field/scheme-formation-edit-field.service';

@Component({
    selector: 'sfc-scheme-game-team-formation-edit',
    templateUrl: './scheme-game-team-formation-edit.component.html',
    styleUrls: ['./scheme-game-team-formation-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class SchemeGameTeamFormationEditComponent
    extends SchemeGameTeamEditComponent<ISchemeGameTeamEditFormModel, BaseErrorResponse>
    implements OnInit {

    // icons
    faQuestionCircle = faQuestionCircle;

    // component
    Constants = SchemeGameTeamFormationEditConstants;
    Localization = SchemeGameTeamFormationEditLocalization;

    public formation$!: Observable<IFormationEnumModel>;

    public types: ISelectItemModel[] = mapSelectItems(this.enumService.enums.formationType);

    public formations: IFormationEnumModel[] = this.enumService.enums.formations;

    constructor(
        route: ActivatedRoute,
        parent: FormGroupDirective,
        formBuilder: FormBuilder,
        private enumService: EnumService,
        private modalService: ModalService,
        private schemeFormationEditFieldService: SchemeFormationEditFieldService) {
        super(route, parent, formBuilder);
    }

    ngOnInit(): void {
        this.formation$ = getFormationControlChanges(this.controls, this.enumService.enums.formations);
    }

    public onFormationChange(formation: number, event: Event): void {
        if (this.schemeFormationEditFieldService.any) {
            this.modalService.open(SchemeGameTeamFormationEditConstants.MODAL.FORMATION_CHANGE.ID, formation);
            stopAndPreventPropagation(event);
        }
    }

    public onApply(formation: number): void {
        this.schemeFormationEditFieldService.clear();
        this.form.patchValue({ formation: { formation } });
    }
}