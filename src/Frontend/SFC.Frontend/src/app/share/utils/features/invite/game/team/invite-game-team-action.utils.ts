import { RouteKey } from "@core/enums";
import { IBuildActionParameters } from "@core/models";
import { faBan, faInfoCircle, faPencil } from "@fortawesome/free-solid-svg-icons";
import { InviteGameTeamModal } from "@share/components";
import { Route } from "@share/enums";
import { IInviteGameTeamModel } from "@share/models/invite/invite-game-team.model";
import { buildModalAction, buildRedirectAction } from "@share/utils/actions";
import { ModalService } from "ngx-sfc-common";

export function buildViewInviteGameTeamAction(inviteId: number, gameId: number, teamId: number, parameters: IBuildActionParameters) {
    return buildRedirectAction(
        $localize`:@@share.utils.features.actions.invite.game.team.view-profile:View game team invite profile`,
        faInfoCircle,
        parameters.delimeter,
        parameters.router,
        [`${Route.Invites}/${inviteId}/${Route.Games}/${gameId}/${Route.Teams}/${teamId}`],
        parameters.state
    );
}

export function buildEditInviteGameTeamAction(inviteId: number, gameId: number, teamId: number, parameters: IBuildActionParameters) {
    return buildRedirectAction(
        $localize`:@@share.utils.features.actions.invite.game.team.edit:Edit game team invite`,
        faPencil,
        parameters.delimeter,
        parameters.router,
        [`${Route.Invites}/${inviteId}/${Route.Games}/${gameId}/${Route.Teams}/${teamId}/${RouteKey.Edit}`],
        parameters.state
    );
}

export function buildCancelInviteGameTeamAction(invite: IInviteGameTeamModel, modalService: ModalService, parameters: IBuildActionParameters) {
    return buildModalAction(
        $localize`:@@share.utils.features.actions.invite.game.team.cancel:Cancel game team invite`,
        faBan,
        parameters.delimeter,
        modalService,
        InviteGameTeamModal.Cancel,
        invite
    );
}