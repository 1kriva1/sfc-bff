import { Component, Input } from "@angular/core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'sfc-view-info-panel',
    templateUrl: './view-info-panel.component.html',
    styleUrls: ['./view-info-panel.component.scss']
})
export class ViewInfoPanelComponent {

    @Input()
    label!: string;

    @Input()
    description!: string;

    @Input()
    icon: IconDefinition | null = null;
}