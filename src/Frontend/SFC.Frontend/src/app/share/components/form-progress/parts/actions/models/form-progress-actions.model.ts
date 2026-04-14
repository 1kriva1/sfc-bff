import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { empty } from "ngx-sfc-common";
import { Observable } from "rxjs";

export interface IFormProgressActionsModel {
    text: string;
    command?: string;
    icon?: IconDefinition | empty;
    action?: () => Observable<any>;
}