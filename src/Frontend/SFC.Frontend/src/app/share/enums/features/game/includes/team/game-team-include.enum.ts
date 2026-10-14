export enum GameTeamInclude {
    Team = 'Team',
    TeamProfile = "TeamProfile",
    TeamWithTeamPlayers = "Team.TeamPlayers",
    TeamWithTeamPlayersWithPlayer = "Team.TeamPlayers.Player",
    TeamWithTeamPlayersWithPlayerProfile = "Team.TeamPlayers.PlayerProfile",
    GameTeamPlayers = "GameTeamPlayers",
    GameTeamPlayersWithGamePlayer = "GameTeamPlayers.GamePlayer",
    GameTeamPlayersWithGamePlayerWithPlayer = "GameTeamPlayers.GamePlayer.Player",
    GameTeamPlayersWithGamePlayerWithPlayerProfile = "GameTeamPlayers.GamePlayer.PlayerProfile",
    GameTeamPlayersWithTeamPlayer = "GameTeamPlayers.TeamPlayer",
    GameTeamPlayersWithTeamPlayerWithPlayer = "GameTeamPlayers.TeamPlayer.Player",
    GameTeamPlayersWithTeamPlayerWithPlayerProfile = "GameTeamPlayers.TeamPlayer.PlayerProfile",
};