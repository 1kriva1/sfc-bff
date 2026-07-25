import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { BaseErrorResponse } from "@core/models";
import { Observable, startWith } from "rxjs";
import { IGameCreatePageFormModel } from "../../game-create-page-form.model";
import { GameCreatePageEditPart } from "./game-create-page-edit-part.enum";

@Directive()
export abstract class GameCreatePageEditComponent<TFormValue extends IGameCreatePageFormModel, TResponse extends BaseErrorResponse> {

    // component
    GameCreatePageEditPart = GameCreatePageEditPart;

    public get form(): FormGroup { return this.parent.form; }

    protected get value(): TFormValue { return this.form.value; }

    public get value$(): Observable<TFormValue> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    protected get controls(): { [key: string]: AbstractControl<any> } { return this.form.controls; }

    constructor(protected parent: FormGroupDirective, protected formBuilder: FormBuilder) { }
}