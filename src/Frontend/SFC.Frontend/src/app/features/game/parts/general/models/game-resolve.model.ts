import { IGameModel } from "@share/models";
import { empty } from "ngx-sfc-common";

export interface IGameResolveModel {
    game?: IGameModel | empty;
}