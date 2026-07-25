import { Component } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroupDirective } from '@angular/forms';
import { BaseErrorResponse } from '@core/models';
import { IGameEditFormModel } from '../../game-edit-form.model';
import { GameEditComponent } from '../../game-edit.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sfc-game-profile-edit',
    templateUrl: './game-profile-edit.component.html',
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class GameProfileEditComponent<TFormValue extends IGameEditFormModel, TResponse extends BaseErrorResponse>
    extends GameEditComponent<TFormValue, TResponse> {

    constructor(route: ActivatedRoute, parent: FormGroupDirective, formBuilder: FormBuilder) {
        super(route, parent, formBuilder);
    }
}