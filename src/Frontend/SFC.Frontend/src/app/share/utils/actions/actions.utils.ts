import { Router } from "@angular/router";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { ModalService } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export function buildAction(label: string, icon: IconDefinition, delimeter: boolean, action?: () => void): IDropdownMenuItemModel {
    return {
        label: label,
        icon: icon,
        delimeter: delimeter,
        click: () => action ? action() : null
    };
}

export function buildModalAction(label: string, icon: IconDefinition, delimeter: boolean, modalService: ModalService, id: string, args?: any): IDropdownMenuItemModel {
    return {
        label: label,
        icon: icon,
        delimeter: delimeter,
        click: () => modalService.open(id, args)
    };
}

export function buildRedirectAction(label: string, icon: IconDefinition, delimeter: boolean, router: Router, commands: string[], state: any = undefined): IDropdownMenuItemModel {
    return {
        label: label,
        icon: icon,
        delimeter: delimeter,
        click: () => router.navigate(commands, state)
    };
}