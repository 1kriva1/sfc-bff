import { Router } from "@angular/router";
import { RouteKey } from "@core/enums";
import { IBuildActionParameters } from "@core/models";
import { faBan, faInfoCircle, faPencil } from "@fortawesome/free-solid-svg-icons";
import { InviteGamePlayerModal } from "@share/components/features/invite/game/player/modal/invite-game-player-modal.enum";
import { Route } from "@share/enums";
import { IInviteGamePlayerModel } from "@share/models";
import { buildModalAction, buildRedirectAction } from "@share/utils/actions";
import { ModalService } from "ngx-sfc-common";

export function buildViewInviteGamePlayerAction(inviteId: number, gameId: number, playerId: number, parameters: IBuildActionParameters) {
    return buildRedirectAction(
        $localize`:@@share.utils.features.actions.invite.game.player.view-profile:View game player invite profile`,
        faInfoCircle,
        parameters.delimeter,
        parameters.router,
        [`${Route.Invites}/${inviteId}/${Route}/${gameId}/${Route.Players}/${playerId}`],
        parameters.state
    );
}

export function buildEditInviteGamePlayerAction(inviteId: number, gameId: number, playerId: number, parameters: IBuildActionParameters) {
    return buildRedirectAction(
        $localize`:@@share.utils.features.actions.invite.game.player.edit:Edit game player invite`,
        faPencil,
        parameters.delimeter,
        parameters.router,
        [`${Route.Invites}/${inviteId}/${Route.Games}/${gameId}/${Route.Players}/${playerId}/${RouteKey.Edit}`],
        parameters.state
    );
}

export function buildCancelInviteGamePlayerAction(invite: IInviteGamePlayerModel, modalService: ModalService, parameters: IBuildActionParameters) {
    return buildModalAction(
        $localize`:@@share.utils.features.actions.invite.game.player.cancel:Cancel game player invite`,
        faBan,
        parameters.delimeter,
        modalService,
        InviteGamePlayerModal.Cancel,
        invite
    );
}