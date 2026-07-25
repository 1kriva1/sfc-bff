import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { BaseErrorResponse } from "@core/models";
import { Observable, startWith } from "rxjs";
import { GameTeamEditPageEditPart } from "./game-team-edit-page-edit-part.enum";
import { IGameTeamEditPageFormModel } from "../../models/game-team-edit-page-form.model";

@Directive()
export abstract class GameTeamEditPageEditComponent<TFormValue extends IGameTeamEditPageFormModel, TResponse extends BaseErrorResponse> {

    // component
    GameTeamEditPageEditPart = GameTeamEditPageEditPart;

    public get form(): FormGroup { return this.parent.form; }

    protected get value(): TFormValue { return this.form.value; }

    public get value$(): Observable<TFormValue> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    protected get controls(): { [key: string]: AbstractControl<any> } { return this.form.controls; }

    constructor(protected parent: FormGroupDirective, protected formBuilder: FormBuilder) { }
}