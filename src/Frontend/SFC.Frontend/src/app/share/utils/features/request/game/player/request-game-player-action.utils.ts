import { RouteKey } from "@core/enums";
import { IBuildActionParameters } from "@core/models";
import { faCheck, faInfoCircle, faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import { RequestGamePlayerModal } from "@share/components/features/request/game";
import { Route } from "@share/enums";
import { IRequestGamePlayerModel } from "@share/models";
import { buildModalAction, buildRedirectAction } from "@share/utils/actions";
import { ModalService } from "ngx-sfc-common";

export function buildViewRequestGamePlayerAction(requestId: number, gameId: number, playerId: number, parameters: IBuildActionParameters) {
    return buildRedirectAction(
        $localize`:@@share.utils.features.actions.request.game.player.view-profile:View game player request profile`,
        faInfoCircle,
        parameters.delimeter,
        parameters.router,
        [`${Route.Requests}/${requestId}/${Route.Games}/${gameId}/${Route.Players}/${playerId}`],
        parameters.state
    );
}

export function buildEditRequestGamePlayerAction(requestId: number, gameId: number, playerId: number, parameters: IBuildActionParameters) {
    return buildRedirectAction(
        $localize`:@@share.utils.features.actions.request.game.player.edit:Edit game player request`,
        faPencil,
        parameters.delimeter,
        parameters.router,
        [`${Route.Requests}/${requestId}/${Route.Games}/${gameId}/${Route.Players}/${playerId}/${RouteKey.Edit}`],
        parameters.state
    );
}

export function buildAcceptRequestGamePlayerAction(request: IRequestGamePlayerModel, modalService: ModalService, parameters: IBuildActionParameters) {
    return buildModalAction(
        $localize`:@@share.utils.features.actions.request.game.player.accept:Accept game player request`,
        faCheck,
        parameters.delimeter,
        modalService,
        RequestGamePlayerModal.Accept,
        request
    );
}

export function buildDeclineRequestGamePlayerAction(request: IRequestGamePlayerModel, modalService: ModalService, parameters: IBuildActionParameters) {
    return buildModalAction(
        $localize`:@@share.utils.features.actions.request.game.player.decline:Decline game player request`,
        faX,
        parameters.delimeter,
        modalService,
        RequestGamePlayerModal.Decline,
        request
    );
}