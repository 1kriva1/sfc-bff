import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { BaseErrorResponse } from "@core/models";
import { Observable, startWith } from "rxjs";
import { IGameTeamCreatePageFormModel } from "../../models/game-team-create-page-form.model";
import { GameTeamCreatePageEditPart } from "./game-team-create-page-edit-part.enum";

@Directive()
export abstract class GameTeamCreatePageEditComponent<TFormValue extends IGameTeamCreatePageFormModel, TResponse extends BaseErrorResponse> {

    // component
    GameTeamCreatePageEditPart = GameTeamCreatePageEditPart;

    public get form(): FormGroup { return this.parent.form; }

    protected get value(): TFormValue { return this.form.value; }

    public get value$(): Observable<TFormValue> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    protected get controls(): { [key: string]: AbstractControl<any> } { return this.form.controls; }

    constructor(protected parent: FormGroupDirective, protected formBuilder: FormBuilder) { }
}