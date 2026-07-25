import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export function buildRemovePlayerFromTeamAction(clickFunc: () => void): IDropdownMenuItemModel {
    return {
        label: 'Remove from team',
        icon: faMinus,
        delimeter: true,
        click: clickFunc
    };
}