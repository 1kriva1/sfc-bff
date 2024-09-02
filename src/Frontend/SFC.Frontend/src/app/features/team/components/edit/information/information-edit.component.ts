import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { BaseEditComponent } from '../base-edit.component';
import { EditPagePart } from '../edit-page-part.enum';

@Component({
    selector: 'sfc-information-edit',
    templateUrl: './information-edit.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class InformationEditComponent
    extends BaseEditComponent
    implements OnInit {

    EditPagePart = EditPagePart;

    constructor(
        parent: FormGroupDirective,
        formBuilder: FormBuilder) {
        super(parent, formBuilder);
    }

    ngOnInit(): void {
        this.form.addControl(EditPagePart.Information, this.formBuilder.group({}));
    }
}