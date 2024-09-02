import { Directive, EventEmitter, Input, Output } from "@angular/core";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { ComponentSize, Position } from "ngx-sfc-common";
import { IDropdownMenuItemModel } from "ngx-sfc-components";
import { IPlayerItemModel } from "./models/player-item.model";

@Directive()
export abstract class BasePlayerItemComponent {

    ComponentSize = ComponentSize;
    Position = Position;

    @Input()
    model!: IPlayerItemModel;

    @Output()
    remove: EventEmitter<number> = new EventEmitter<number>();

    public actions: IDropdownMenuItemModel[] = [
        {
            label: 'Cancel request to join team',
            icon: faUserMinus,
            click: () => this.remove.emit(this.model.id)
        }
    ]
}