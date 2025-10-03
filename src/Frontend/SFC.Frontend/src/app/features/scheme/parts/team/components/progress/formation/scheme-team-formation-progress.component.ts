import { Component, OnInit } from '@angular/core';
import { CommonConstants, sum } from 'ngx-sfc-common';
import { SchemeTeamFormationProgressLocalization } from './scheme-team-formation-progress.localization';
import { combineLatest, EMPTY, map, Observable } from 'rxjs';
import { SchemeTeamFormationEditFieldService } from '../../edit/formation/parts/field/scheme-team-formation-edit-field.service';
import { FormGroupDirective } from '@angular/forms';
import { EnumService } from '@share/services';
import { getProgressColorDynamicallyFunc } from 'ngx-sfc-components';
import { getFormationControlChanges } from '../../../utils/scheme-team-form.utils';
import { IFormationEnumModel } from '@share/services/enum/models/enum/formation-enum.model';
import { ISchemeTeamFormationProgressModel } from './scheme-team-formation-progress.model';

@Component({
    selector: 'sfc-scheme-team-formation-progress',
    templateUrl: './scheme-team-formation-progress.component.html',
    styleUrls: ['./scheme-team-formation-progress.component.scss']
})
export class SchemeTeamFormationProgressComponent implements OnInit {

    // ngx-sfc-common
    CommonConstants = CommonConstants;

    // ngx-sfc-components
    getProgressColorDynamicallyFunc = getProgressColorDynamicallyFunc;

    // component
    Localization = SchemeTeamFormationProgressLocalization;

    /* Observables */

    public progress$: Observable<ISchemeTeamFormationProgressModel> = EMPTY;

    /* End Observables */

    constructor(
        private SchemeTeamFormationEditFieldService: SchemeTeamFormationEditFieldService,
        private parent: FormGroupDirective,
        private enumService: EnumService) { }

    ngOnInit(): void {
        const formation$: Observable<IFormationEnumModel> =
            getFormationControlChanges(this.parent.form.controls, this.enumService.enums.formations);

        this.progress$ = combineLatest([
            formation$,
            this.SchemeTeamFormationEditFieldService.selectedPlayers$
        ]).pipe(
            map(([formation, schemePlayers]) => {
                return {
                    label: formation.label,
                    description: formation.description,
                    total: sum(formation.value, (line: number[]) => line.length),
                    progress: schemePlayers.length
                }
            })
        );
    }
}