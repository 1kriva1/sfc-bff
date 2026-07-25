import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { BaseErrorResponse } from "@core/models";
import { Observable, startWith } from "rxjs";
import { GameEditPageEditPart } from "./game-edit-page-edit-part.enum";
import { IGameEditPageFormModel } from "../../models/game-edit-page-form.model";

@Directive()
export abstract class GameEditPageEditComponent<TFormValue extends IGameEditPageFormModel, TResponse extends BaseErrorResponse> {

    // component
    GameEditPageEditPart = GameEditPageEditPart;

    public get form(): FormGroup { return this.parent.form; }

    protected get value(): TFormValue { return this.form.value; }

    public get value$(): Observable<TFormValue> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    protected get controls(): { [key: string]: AbstractControl<any> } { return this.form.controls; }

    constructor(protected parent: FormGroupDirective, protected formBuilder: FormBuilder) { }
}