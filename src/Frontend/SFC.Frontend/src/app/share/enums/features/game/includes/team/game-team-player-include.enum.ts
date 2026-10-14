export enum GameTeamPlayerInclude {
    GamePlayer = 'GamePlayer',
    GamePlayerWithPlayer = "GamePlayer.Player",
    GamePlayerWithPlayerProfile = "GamePlayer.PlayerProfile",
    TeamPlayer = 'TeamPlayer',
    TeamPlayerWithPlayer = "TeamPlayer.Player",
    TeamPlayerWithPlayerProfile = "TeamPlayer.PlayerProfile",
    GameTeam = "GameTeam",
    GameTeamWithTeam = "GameTeam.Team",
    GameTeamWithTeamProfile = "GameTeam.TeamProfile",
    GameTeamWithTeamWithTeamPlayers = "GameTeam.Team.TeamPlayers",
    GameTeamWithTeamWithTeamPlayersWithPlayer = "GameTeam.Team.TeamPlayers.Player",
    GameTeamWithTeamWithTeamPlayersWithPlayerProfile = "GameTeam.Team.TeamPlayers.PlayerProfile",
    GameTeamWithGameTeamPlayers = "GameTeam.GameTeamPlayers",
    GameTeamWithGameTeamPlayersWithGamePlayer = "GameTeam.GameTeamPlayers.GamePlayer",
    GameTeamWithGameTeamPlayersWithGamePlayerWithPlayer = "GameTeam.GameTeamPlayers.GamePlayer.Player",
    GameTeamWithGameTeamPlayersWithGamePlayerWithPlayerProfile = "GameTeam.GameTeamPlayers.GamePlayer.PlayerProfile"
};