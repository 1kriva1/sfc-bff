import { Component, OnInit } from "@angular/core";
import { ControlContainer, FormBuilder, FormGroupDirective } from "@angular/forms";
import { IForm } from "@core/types";
import { TeamSearchFlterInventaryLocalization } from "./team-search-filter-inventary.localization";
import { TeamSearchFilterPart } from "../../team-search-filter-part.enum";
import { ITeamSearchFilterInventaryModel } from "./team-search-filter-inventary.model";
import { IBubbleModel } from "ngx-sfc-inputs";
import { mapBubbles } from "@share/utils/inputs";
import { EnumService } from "@share/services";
import { buildTeamSearchFilterInventaryFormGroup } from "./team-search-filter-inventary.utils";

@Component({
    selector: 'sfc-team-search-filter-inventary',
    templateUrl: './team-search-filter-inventary.component.html',
    styleUrls: ['./team-search-filter-inventary.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class TeamSearchFilterInventaryComponent implements OnInit {

    // component
    Localization = TeamSearchFlterInventaryLocalization;
    TeamSearchFilterPart = TeamSearchFilterPart;

    public shirts: IBubbleModel[];

    constructor(
        private parent: FormGroupDirective,
        private formBuilder: FormBuilder,
        private enumService: EnumService
    ) {
        this.shirts = mapBubbles(this.enumService.enums.shirts);
    }

    ngOnInit(): void {
        this.buildFormGroup();
    }

    private buildFormGroup(): void {
        const controls: IForm<ITeamSearchFilterInventaryModel> = buildTeamSearchFilterInventaryFormGroup();
        this.parent.form.addControl(TeamSearchFilterPart.Inventary, this.formBuilder.group(controls));
    }
}