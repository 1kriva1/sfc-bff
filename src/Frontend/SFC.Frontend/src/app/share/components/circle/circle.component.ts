import { Component, Input } from "@angular/core";
import { getCssLikeValue, UIConstants } from "ngx-sfc-common";
import { CircleConstants } from "./circle.constants";

@Component({
    selector: 'sfc-circle',
    templateUrl: './circle.component.html',
    styleUrls: ['./circle.component.scss']
})
export class CircleComponent {

    // component
    Constants = CircleConstants;

    @Input()
    color: string | null = null;

    @Input()
    borderColor: string | null = null;

    @Input()
    size: number = CircleConstants.DEFAULT_SIZE;

    public get styles(): any {
        const size: string = getCssLikeValue(this.size, UIConstants.CSS_EM);
        return {
            color: this.color,
            borderColor: this.borderColor,
            width: size,
            height: size,
            lineHeight: size
        };
    }
}