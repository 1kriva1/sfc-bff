import { Router } from "@angular/router";
import { RouteKey } from "@core/enums";
import { faBan, faCheck, faInfoCircle, faPencil, faPersonCircleXmark, faXmark } from "@fortawesome/free-solid-svg-icons";
import { InviteTeamPlayerModal, RequestTeamPlayerModal, SchemeTeamModal } from "@share/components";
import { IPlayersTableModel } from "@share/components/features/player";
import { InviteRoute, PlayerRoute, RequestRoute, SchemeRoute, TeamRoute } from "@share/enums";
import { ITeamPlayerInviteModel } from "@share/models/invite/team-player-invite.model";
import { ITeamPlayerRequestModel } from "@share/models/request/team-player-request.model";
import { ISchemeTeamModel } from "@share/models/scheme/team/scheme-team.model";
import { buildModalAction, buildRedirectAction } from "@share/utils/actions/actions.utils";
import { ModalService } from "ngx-sfc-common";
import { TeamModal } from "../components/modals/team-modal.enum";

export function buildRemoveTeamPlayerAction(player: IPlayersTableModel, modalService: ModalService) {
    return buildModalAction(
        $localize`:@@feature.team.utils.actions.team.player.remove:Remove from team`,
        faPersonCircleXmark,
        false,
        modalService,
        TeamModal.TeamPlayerRemove,
        player
    );
}

export function buildViewTeamPlayerInviteAction(playerId: number, teamId: number, inviteId: number, router: Router, state: any = null) {
    return buildRedirectAction(
        $localize`:@@feature.team.utils.actions.team.player.invite.view-profile:View team player invite profile`,
        faInfoCircle,
        true,
        router,
        [`${InviteRoute.Invites}/${inviteId}/${TeamRoute.Teams}/${teamId}/${PlayerRoute.Players}/${playerId}`],
        state
    );
}

export function buildEditTeamPlayerInviteAction(playerId: number, teamId: number, inviteId: number, router: Router, state: any = null) {
    return buildRedirectAction(
        $localize`:@@feature.team.utils.actions.team.player.invite.edit:Edit team player invite`,
        faPencil,
        false,
        router,
        [`${InviteRoute.Invites}/${inviteId}/${TeamRoute.Teams}/${teamId}/${PlayerRoute.Players}/${playerId}/${RouteKey.Edit}`],
        state
    );
}

export function buildCancelTeamPlayerInviteAction(invite: ITeamPlayerInviteModel, modalService: ModalService, delimeter: boolean = false) {
    return buildModalAction(
        $localize`:@@feature.team.utils.actions.team.player.invite.cancel:Cancel invite`,
        faBan,
        delimeter,
        modalService,
        InviteTeamPlayerModal.Cancel,
        invite
    );
}

export function buildViewTeamPlayerRequestAction(playerId: number, teamId: number, requestId: number, router: Router, state: any = null) {
    return buildRedirectAction(
        $localize`:@@feature.team.utils.actions.team.player.request.view-profile:View team player request profile`,
        faInfoCircle,
        true,
        router,
        [`${RequestRoute.Requests}/${requestId}/${TeamRoute.Teams}/${teamId}/${PlayerRoute.Players}/${playerId}`],
        state
    );
}

export function buildAcceptTeamPlayerRequestAction(request: ITeamPlayerRequestModel, modalService: ModalService) {
    return buildModalAction(
        $localize`:@@feature.team.utils.actions.team.player.request.accept:Accept request`,
        faCheck,
        false,
        modalService,
        RequestTeamPlayerModal.Accept,
        request
    );
}

export function buildDeclineTeamPlayerRequestAction(request: ITeamPlayerRequestModel, modalService: ModalService) {
    return buildModalAction(
        $localize`:@@feature.team.utils.actions.team.player.request.decline:Decline request`,
        faXmark,
        false,
        modalService,
        RequestTeamPlayerModal.Decline,
        request
    );
}

export function buildEditTeamSchemeAction(teamId: number, schemeId: number, router: Router, state: any = null) {
    return buildRedirectAction(
        $localize`:@@feature.team.utils.actions.team.scheme.edit:Edit team scheme`,
        faPencil,
        false,
        router,
        [`${SchemeRoute.Schemes}/${schemeId}/${TeamRoute.Teams}/${teamId}/${RouteKey.Edit}`],
        state
    );
}

export function buildRemoveTeamSchemeAction(modalService: ModalService, scheme: ISchemeTeamModel) {
    return buildModalAction(
        $localize`:@@feature.team.utils.actions.team.scheme.remove:Remove team scheme`,
        faXmark,
        true,
        modalService,
        SchemeTeamModal.Remove,
        scheme
    );
}