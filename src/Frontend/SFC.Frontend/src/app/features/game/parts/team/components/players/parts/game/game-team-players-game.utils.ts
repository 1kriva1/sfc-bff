import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IDropdownMenuItemModel } from "ngx-sfc-components";

export function buildAddPlayerToTeamAction(clickFunc: () => void): IDropdownMenuItemModel {
    return {
        label: 'Add to team',
        icon: faPlus,
        delimeter: true,
        click: clickFunc
    };
}