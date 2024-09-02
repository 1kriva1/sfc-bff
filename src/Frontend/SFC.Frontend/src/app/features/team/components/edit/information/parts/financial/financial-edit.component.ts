import { Component, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { CheckmarkType, hasItem } from 'ngx-sfc-common';
import { IForm } from '@core/types';
import { IFinancialEditModel } from './financial-edit.model';
import { EnumService } from '@share/services';
import { InformationEditPart } from '../../information-edit-part.enum';
import { BaseInformationEditComponent } from '../base-information-edit.component';

@Component({
    selector: 'sfc-financial-edit',
    templateUrl: './financial-edit.component.html',
    styleUrls: ['../base-information-edit.component.scss', './financial-edit.component.scss'],
    viewProviders: [{
        provide: ControlContainer,
        useFactory: (container: ControlContainer) => container,
        deps: [[new SkipSelf(), ControlContainer]],
    }]
})
export class FinancialEditComponent
    extends BaseInformationEditComponent
    implements OnInit {

    CheckmarkType = CheckmarkType;

    InformationEditPart = InformationEditPart;

    constructor(
        parent: FormGroupDirective,
        formBuilder: FormBuilder,
        public enumService: EnumService) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        const controls: IForm<IFinancialEditModel> = {
            shirts: [[]],
            freePlay: [null],
            hasManiches: [null]
        };

        this.group.addControl(InformationEditPart.Financial, this.formBuilder.group(controls));
    }

    public isShirtActive(key: number): boolean {
        return hasItem(this.group.value.financial.shirts, key);
    }
}