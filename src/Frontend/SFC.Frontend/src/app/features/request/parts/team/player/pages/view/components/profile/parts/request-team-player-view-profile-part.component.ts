import { Directive } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { getRouteData } from "@core/utils";
import { ITeamPlayerRequestModel } from "@share/models/request/team-player-request.model";
import { RequestTeamPlayerViewPageConstants } from "../../../request-team-player-view-page.constants";

@Directive()
export abstract class RequestTeamPlayerViewProfilePartComponent {

    public model: ITeamPlayerRequestModel;

    constructor(private route: ActivatedRoute) {
        this.model = this.getResolveModel();
    }

    private getResolveModel(): ITeamPlayerRequestModel {
        const routeData: ITeamPlayerRequestModel | null =
            getRouteData(this.route.parent!.parent!.snapshot, RequestTeamPlayerViewPageConstants.RESOLVE_KEY);

        if (!routeData) {
            console.error('Missing resolve model!');
        }

        return routeData!;
    }
}