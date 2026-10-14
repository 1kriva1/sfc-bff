import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { SchemeGameTeamFormationEditFieldService } from './parts/field/scheme-game-team-formation-edit-field.service';
import { getFormationControlChanges } from './scheme-game-team-formation-edit.utils';

@Component({
    selector: 'sfc-scheme-game-team-formation-edit',
    templateUrl: './scheme-game-team-formation-edit.component.html',
    styleUrls: ['./scheme-game-team-formation-edit.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class SchemeGameTeamFormationEditComponent
    extends SchemeGameTeamEditComponent<ISchemeGameTeamEditFormModel, BaseErrorResponse>
    implements OnInit, OnDestroy {

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
        private schemeGameTeamFormationEditFieldService: SchemeGameTeamFormationEditFieldService) {
        super(route, parent, formBuilder);
    }

    ngOnInit(): void {
        this.formation$ = getFormationControlChanges(this.controls, this.enumService.enums.formations);
    }

    ngOnDestroy(): void {
        this.schemeGameTeamFormationEditFieldService.clear();
    }

    public onFormationChange(formation: number, event: Event): void {
        if (this.schemeGameTeamFormationEditFieldService.any) {
            this.modalService.open(SchemeGameTeamFormationEditConstants.MODAL.FORMATION_CHANGE.ID, formation);
            stopAndPreventPropagation(event);
        }
    }

    public onApply(formation: number): void {
        this.schemeGameTeamFormationEditFieldService.clear();
        this.form.patchValue({ formation: { formation } });
    }
}