import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { BaseErrorResponse } from "@core/models";
import { IGameEditFormModel } from "./game-edit-form.model";
import { GameEditPart } from "./game-edit-part.enum";
import { Observable, startWith } from "rxjs";

@Directive()
export abstract class GameEditComponent<TFormValue extends IGameEditFormModel, TResponse extends BaseErrorResponse> {

    // component
    GameEditPart = GameEditPart;

    protected get form(): FormGroup { return this.parent.form; }

    protected get value(): TFormValue { return this.form.value; }

    public get value$(): Observable<TFormValue> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    protected get controls(): { [key: string]: AbstractControl<any> } { return this.form.controls; }

    constructor(protected parent: FormGroupDirective, protected formBuilder: FormBuilder) { }
}