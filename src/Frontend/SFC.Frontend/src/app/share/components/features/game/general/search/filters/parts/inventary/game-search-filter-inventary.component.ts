import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { GameSearchFlterInventaryLocalization } from "./game-search-filter-inventary.localization";
import { IGameSearchFilterInventaryModel } from "./game-search-filter-inventary.model";
import { generateMultipleLabel } from "@share/utils/inputs";
import { EnumService } from "@share/services";
import { buildGameSearchFilterInventaryFormControls } from "./game-search-filter-inventary.utils";
import { CoreConstants } from "@core/constants";
import { GameSearchFilterPart } from "../../game-search-filter-part.enum";
import { GameSearchFilterInventaryPart } from "./game-search-filter-inventary-part.enum";
import { Direction } from "ngx-sfc-common";
import { GameSearchFlterInventaryConstants } from "./game-search-filter-inventary.constants";

@Component({
    selector: 'sfc-game-search-filter-inventary',
    templateUrl: './game-search-filter-inventary.component.html',
    styleUrls: ['./game-search-filter-inventary.component.scss'],
    viewProviders: [CoreConstants.CONTROL_CONTAINER_PROVIDER]
})
export class GameSearchFilterInventaryComponent implements OnInit {

    @Input()
    build: boolean = true;

    @Input()
    parts: GameSearchFilterInventaryPart[] = [];

    // ngx-sfc-common
    Direction = Direction;

    // component
    Constants = GameSearchFlterInventaryConstants;
    Localization = GameSearchFlterInventaryLocalization;
    GameSearchFilterPart = GameSearchFilterPart;
    GameSearchFilterInventaryPart = GameSearchFilterInventaryPart;

    public generateShirtsCountRangeLabel: (from: number, to: number) => string = generateMultipleLabel;

    constructor(
        private parent: FormGroupDirective,
        private formBuilder: FormBuilder,
        private enumService: EnumService
    ) { }

    ngOnInit(): void {
        if (this.build) {
            this.buildFormGroup();
        }
    }

    public isPartVisible(part: GameSearchFilterInventaryPart): boolean {
        return this.parts.length === 0 || this.parts.includes(part);
    }

    private buildFormGroup(): void {
        const controls: IForm<IGameSearchFilterInventaryModel> = buildGameSearchFilterInventaryFormControls();
        this.parent.form.addControl(GameSearchFilterPart.Inventary, this.formBuilder.group(controls));
    }
}