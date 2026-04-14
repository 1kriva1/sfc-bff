import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { empty } from "ngx-sfc-common";

export interface IFormProgressActionViewModel {
    text: string;
    icon?: IconDefinition | empty;
    action: () => void;
}

export interface IFormProgressActionsViewModel {
    previous: IFormProgressActionViewModel | null;
    next: IFormProgressActionViewModel | null;
}