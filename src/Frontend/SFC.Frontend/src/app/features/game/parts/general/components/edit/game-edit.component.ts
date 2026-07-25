import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { BaseErrorResponse } from "@core/models";
import { Observable, startWith } from "rxjs";
import { GameEditPart } from "./enums/game-edit-part.enum";
import { IGameEditFormModel } from "./game-edit-form.model";
import { GameConstants } from "../../constants";
import { IGameResolveModel } from "../../models/game-resolve.model";
import { empty } from "ngx-sfc-common";
import { ActivatedRoute } from "@angular/router";
import { getDataFromRouteRecursively } from "@core/utils";

@Directive()
export abstract class GameEditComponent<TFormValue extends IGameEditFormModel, TResponse extends BaseErrorResponse> {

    // component
    GameEditPart = GameEditPart;

    public get form(): FormGroup { return this.parent.form; }

    protected get value(): TFormValue { return this.form.value; }

    public get value$(): Observable<TFormValue> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    protected get controls(): { [key: string]: AbstractControl<any> } { return this.form.controls; }

    public get model(): IGameResolveModel | empty { return getDataFromRouteRecursively<IGameResolveModel>(this.route, GameConstants.ResolveKey)!; };

    constructor(protected route: ActivatedRoute, protected parent: FormGroupDirective, protected formBuilder: FormBuilder) { }
}