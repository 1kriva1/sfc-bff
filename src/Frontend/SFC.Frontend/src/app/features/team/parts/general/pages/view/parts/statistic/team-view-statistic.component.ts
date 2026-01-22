import 'chartjs-adapter-date-fns';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { getDataFromParentRoute, getUrlSegment } from "@core/utils";
import { ITeamModel } from "@share/models";
import { firstOrDefault } from "ngx-sfc-common";
import { ISelectItemModel, ISelectValue, ISelectValueType } from "ngx-sfc-inputs";
import { TeamViewPageConstants } from "../../team-view-page.constants";
import { TeamViewStatisticLocalization } from "./team-view-statistic.localization";
import { TeamViewStatisticRoute } from "./team-view-statistic-route.enum";

@Component({
    templateUrl: './team-view-statistic.component.html',
    styleUrls: ['./team-view-statistic.component.scss']
})
export class TeamViewStatisticComponent implements OnInit {

    // component
    Localization = TeamViewStatisticLocalization;

    /* Properties */

    public get model(): ITeamModel {
        return getDataFromParentRoute<ITeamModel>(this.route, TeamViewPageConstants.RESOLVE_KEY)!;
    };

    /* End Properties */

    /* Fields */

    public form!: FormGroup;

    public parts: ISelectItemModel[] = [
        { key: TeamViewStatisticRoute.Overall, value: TeamViewStatisticLocalization.PART.OVERALL },
        { key: TeamViewStatisticRoute.Players, value: TeamViewStatisticLocalization.PART.PLAYERS },
        { key: TeamViewStatisticRoute.Games, value: TeamViewStatisticLocalization.PART.GAMES },
        { key: TeamViewStatisticRoute.Schemes, value: TeamViewStatisticLocalization.PART.SCHEMES }
    ];

    /* End Fields */

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit(): void {
        const selectedPart: ISelectItemModel = this.getSelectedPart();
        this.form = this.formBuilder.group({ part: [selectedPart] });
    }

    public onPartChange(part: ISelectValueType): void {
        const route: TeamViewStatisticRoute = (part as ISelectValue).key!;
        this.navigate(route);
    }

    private getSelectedPart(): ISelectItemModel {
        const segment: string = getUrlSegment(this.router.url),
            selectedPart: ISelectItemModel = firstOrDefault(this.parts, (item: ISelectItemModel) => item.key === segment)!;
        return selectedPart;
    }

    private navigate(command: string): void {
        this.router.navigate([command], { relativeTo: this.route });
    }
}