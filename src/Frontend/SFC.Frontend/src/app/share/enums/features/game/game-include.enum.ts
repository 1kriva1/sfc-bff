import { Nest } from "@core/types";
import { PlayerInclude } from "../player/player-include.enum";
import { TeamInclude } from "../team/team-include.enum";
import { checkIncludes } from "@core/utils";

export type GamePlayerInclude = Nest<'GamePlayer', PlayerInclude | GameTeamInclude>;
export type GameTeamInclude = Nest<'GameTeam', TeamInclude | Nest<'GameTeamPlayers', PlayerInclude | TeamInclude>>;
export type GameTeamPlayerInclude = Nest<'GameTeamPlayer', PlayerInclude | TeamInclude>;
export type GameInclude = Nest<'Game', Nest<'GamePlayers', PlayerInclude | GameTeamInclude> | Nest<'GameTeams', GameTeamInclude>>;

export const GamePlayerIncludes = checkIncludes<GamePlayerInclude>()({
    GamePlayer: 'GamePlayer',
    WithPlayer: 'GamePlayer.Player',
    WithGameTeam: 'GamePlayer.GameTeam',
    WithGameTeamWithTeam: 'GamePlayer.GameTeam.Team',
    WithGameTeamWithTeamWithPlayers: 'GamePlayer.GameTeam.Team.Players',
    WithGameTeamWithTeamWithPlayersWithPlayer: 'GamePlayer.GameTeam.Team.Players.Player',
    WithGameTeamWithGameTeamPlayers: 'GamePlayer.GameTeam.GameTeamPlayers',
    WithGameTeamWithGameTeamPlayersWithPlayer: 'GamePlayer.GameTeam.GameTeamPlayers.Player',
    WithGameTeamWithGameTeamPlayersWithTeam: 'GamePlayer.GameTeam.GameTeamPlayers.Team',
    WithGameTeamWithGameTeamPlayersWithTeamWithPlayers: 'GamePlayer.GameTeam.GameTeamPlayers.Team.Players',
    WithGameTeamWithGameTeamPlayersWithTeamWithPlayersWithPlayer: 'GamePlayer.GameTeam.GameTeamPlayers.Team.Players.Player'
});

export const GameTeamIncludes = checkIncludes<GameTeamInclude>()({
    GameTeam: 'GameTeam',
    WithTeam: 'GameTeam.Team',
    WithTeamWithPlayers: 'GameTeam.Team.Players',
    WithTeamWithPlayersWithPlayer: 'GameTeam.Team.Players.Player',
    WithGameTeamPlayers: 'GameTeam.GameTeamPlayers',
    WithGameTeamPlayersWithPlayer: 'GameTeam.GameTeamPlayers.Player',
    WithGameTeamPlayersWithTeam: 'GameTeam.GameTeamPlayers.Team',
    WithGameTeamPlayersWithTeamWithPlayers: 'GameTeam.GameTeamPlayers.Team.Players',
    WithGameTeamPlayersWithTeamWithPlayersWithPlayer: 'GameTeam.GameTeamPlayers.Team.Players.Player'
});

export const GameTeamPlayerIncludes = checkIncludes<GameTeamPlayerInclude>()({
    GameTeamPlayer: 'GameTeamPlayer',
    WithPlayer: 'GameTeamPlayer.Player',
    WithTeam: 'GameTeamPlayer.Team',
    WithTeamWithPlayers: 'GameTeamPlayer.Team.Players',
    WithTeamWithPlayersWithPlayer: 'GameTeamPlayer.Team.Players.Player'
});

export const GameIncludes = checkIncludes<GameInclude>()({
    Game: 'Game',
    WithGamePlayers: 'Game.GamePlayers',
    WithGamePlayersWithPlayer: 'Game.GamePlayers.Player',
    WithGamePlayersWithGameTeam: 'Game.GamePlayers.GameTeam',
    WithGamePlayersWithGameTeamWithTeam: 'Game.GamePlayers.GameTeam.Team',
    WithGamePlayersWithGameTeamWithTeamWithPlayers: 'Game.GamePlayers.GameTeam.Team.Players',
    WithGamePlayersWithGameTeamWithTeamWithPlayersWithPlayer: 'Game.GamePlayers.GameTeam.Team.Players.Player',
    WithGamePlayersWithGameTeamWithGameTeamPlayers: 'Game.GamePlayers.GameTeam.GameTeamPlayers',
    WithGamePlayersWithGameTeamWithGameTeamPlayersWithPlayer: 'Game.GamePlayers.GameTeam.GameTeamPlayers.Player',
    WithGamePlayersWithGameTeamWithGameTeamPlayersWithTeam: 'Game.GamePlayers.GameTeam.GameTeamPlayers.Team',
    WithGamePlayersWithGameTeamWithGameTeamPlayersWithTeamWithPlayers: 'Game.GamePlayers.GameTeam.GameTeamPlayers.Team.Players',
    WithGamePlayersWithGameTeamWithGameTeamPlayersWithTeamWithPlayersWithPlayer: 'Game.GamePlayers.GameTeam.GameTeamPlayers.Team.Players.Player',
    WithGameTeams: 'Game.GameTeams',
    WithGameTeamsWithGameTeam: 'Game.GameTeams.GameTeam',
    WithGameTeamsWithGameTeamWithTeam: 'Game.GameTeams.GameTeam.Team',
    WithGameTeamsWithGameTeamWithTeamWithPlayers: 'Game.GameTeams.GameTeam.Team.Players',
    WithGameTeamsWithGameTeamWithTeamWithPlayersWithPlayer: 'Game.GameTeams.GameTeam.Team.Players.Player',
    WithGameTeamsWithGameTeamWithGameTeamPlayers: 'Game.GameTeams.GameTeam.GameTeamPlayers',
    WithGameTeamsWithGameTeamWithGameTeamPlayersWithPlayer: 'Game.GameTeams.GameTeam.GameTeamPlayers.Player',
    WithGameTeamsWithGameTeamWithGameTeamPlayersWithTeam: 'Game.GameTeams.GameTeam.GameTeamPlayers.Team',
    WithGameTeamsWithGameTeamWithGameTeamPlayersWithTeamWithPlayers: 'Game.GameTeams.GameTeam.GameTeamPlayers.Team.Players',
    WithGameTeamsWithGameTeamWithGameTeamPlayersWithTeamWithPlayersWithPlayer: 'Game.GameTeams.GameTeam.GameTeamPlayers.Team.Players.Player'
});