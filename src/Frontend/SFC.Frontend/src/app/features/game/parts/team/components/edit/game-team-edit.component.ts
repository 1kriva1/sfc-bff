import { Directive } from "@angular/core";
import { FormGroupDirective, FormBuilder, FormGroup, AbstractControl } from "@angular/forms";
import { BaseErrorResponse } from "@core/models";
import { IGameTeamEditFormModel } from "./game-team-edit-form.model";
import { GameTeamEditPart } from "./enums/game-team-edit-part.enum";
import { Observable, startWith } from "rxjs";
import { GameTeamConstants } from "../../constants/game-team.constants";
import { IGameTeamResolveModel } from "../../models/game-team-resolve.model";
import { empty } from "ngx-sfc-common";
import { getDataFromRouteRecursively } from "@core/utils";
import { ActivatedRoute } from "@angular/router";

@Directive()
export abstract class GameTeamEditComponent<TFormValue extends IGameTeamEditFormModel, TResponse extends BaseErrorResponse> {

    // component
    GameTeamEditPart = GameTeamEditPart;

    public get form(): FormGroup { return this.parent.form; }

    protected get value(): TFormValue { return this.form.value; }

    public get value$(): Observable<TFormValue> { return this.form.valueChanges.pipe(startWith(this.form.value)); }

    protected get controls(): { [key: string]: AbstractControl<any> } { return this.form.controls; }

    public get model(): IGameTeamResolveModel | empty { return getDataFromRouteRecursively<IGameTeamResolveModel>(this.route, GameTeamConstants.ResolveKey)!; };

    constructor(protected route: ActivatedRoute, protected parent: FormGroupDirective, protected formBuilder: FormBuilder) { }
}