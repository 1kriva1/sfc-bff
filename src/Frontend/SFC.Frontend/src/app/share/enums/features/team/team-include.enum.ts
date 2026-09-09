import { Nest } from "@core/types";
import { PlayerInclude } from "../player/player-include.enum";

export type TeamInclude = Nest<'Team', Nest<'Players', PlayerInclude>>;

export const TeamIncludes = {
    Team: 'Team',
    WithPlayers: 'Team.Players',
    WithPlayersWithPlayer: 'Team.Players.Player'
} as const;