import { Component, Input } from "@angular/core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { CommonConstants } from "ngx-sfc-common";

@Component({
    selector: 'sfc-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.scss']
})
export class PanelComponent {

    @Input()
    label: string = CommonConstants.EMPTY_STRING;

    @Input()
    description: string = CommonConstants.EMPTY_STRING;

    @Input()
    tooltip: string = CommonConstants.EMPTY_STRING

    @Input()
    icon: IconDefinition | null = null;
}