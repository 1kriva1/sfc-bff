import { IPlayersFilterModel } from "@share/components/features/player";
import { IInviteGamePlayerFilterModel } from "./parts/invite-game-player-filter.model";

export interface IInviteGamePlayerSearchFilterModel {
    player: IPlayersFilterModel;
    invite: IInviteGamePlayerFilterModel;
}