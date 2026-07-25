import { RouteKey } from "@core/enums";
import { IBuildActionParameters } from "@core/models";
import { faCheck, faInfoCircle, faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import { RequestGameTeamModal } from "@share/components/features/request/game";
import { Route } from "@share/enums";
import { IRequestGameTeamModel } from "@share/models";
import { buildModalAction, buildRedirectAction } from "@share/utils/actions";
import { ModalService } from "ngx-sfc-common";

export function buildViewRequestGameTeamAction(requestId: number, gameId: number, teamId: number, parameters: IBuildActionParameters) {
    return buildRedirectAction(
        $localize`:@@share.utils.features.actions.request.game.team.view-profile:View game team request profile`,
        faInfoCircle,
        parameters.delimeter,
        parameters.router,
        [`${Route.Requests}/${requestId}/${Route.Games}/${gameId}/${Route.Teams}/${teamId}`],
        parameters.state
    );
}

export function buildEditRequestGameTeamAction(requestId: number, gameId: number, teamId: number, parameters: IBuildActionParameters) {
    return buildRedirectAction(
        $localize`:@@share.utils.features.actions.request.game.team.edit:Edit game team request`,
        faPencil,
        parameters.delimeter,
        parameters.router,
        [`${Route.Requests}/${requestId}/${Route.Games}/${gameId}/${Route.Teams}/${teamId}/${RouteKey.Edit}`],
        parameters.state
    );
}

export function buildAcceptRequestGameTeamAction(request: IRequestGameTeamModel, modalService: ModalService, parameters: IBuildActionParameters) {
    return buildModalAction(
        $localize`:@@share.utils.features.actions.request.game.team.accept:Accept game team request`,
        faCheck,
        parameters.delimeter,
        modalService,
        RequestGameTeamModal.Accept,
        request
    );
}

export function buildDeclineRequestGameTeamAction(request: IRequestGameTeamModel, modalService: ModalService, parameters: IBuildActionParameters) {
    return buildModalAction(
        $localize`:@@share.utils.features.actions.request.game.team.decline:Decline game team request`,
        faX,
        parameters.delimeter,
        modalService,
        RequestGameTeamModal.Decline,
        request
    );
}