import { Router } from "@angular/router";
import { RouteKey } from "@core/enums";
import { IBuildActionParameters } from "@core/models";
import { faInfoCircle, faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
import { SchemeGameTeamModal } from "@share/components";
import { Route } from "@share/enums";
import { ISchemeGameTeamModel } from "@share/models";
import { buildModalAction, buildRedirectAction } from "@share/utils/actions";
import { ModalService } from "ngx-sfc-common";

export function buildViewSchemeGameTeamAction(gameId: number, teamId: number, schemeId: number, parameters: IBuildActionParameters) {
    return buildRedirectAction(
        $localize`:@@share.utils.features.scheme.team.action.view-profile:View game team scheme profile`,
        faInfoCircle,
        false,
        parameters.router,
        [`${Route.Schemes}/${schemeId}/${Route.Games}/${gameId}/${Route.Teams}/${teamId}`],
        parameters.state
    );
}

export function buildEditSchemeGameTeamAction(gameId: number, teamId: number, schemeId: number, router: Router, state: any = null) {
    return buildRedirectAction(
        $localize`:@@feature.team.utils.actions.team.scheme.edit:Edit team scheme`,
        faPencil,
        false,
        router,
        [`${Route.Schemes}/${schemeId}/${Route.Games}/${gameId}/${Route.Teams}/${teamId}/${RouteKey.Edit}`],
        state
    );
}

export function buildRemoveSchemeGameTeamAction(modalService: ModalService, scheme: ISchemeGameTeamModel) {
    return buildModalAction(
        $localize`:@@feature.team.utils.actions.team.scheme.remove:Remove team scheme`,
        faXmark,
        true,
        modalService,
        SchemeGameTeamModal.Remove,
        scheme
    );
}
