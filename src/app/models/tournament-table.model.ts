export interface ITournament {
    //playerId: number;
    winnerName: string;
    numberOfWins: string;
    tournamentId: number;
    tournamentName: string;
}

export interface WinnedTournaments {
    tournamentId: number;
    tournamentName: string;
    wins: number;
}

export interface TournamentDto {
    id?: number;
    name: string;
    games: GameDto[];

}
export interface GameDto {
    id?: number;
    tournamentId?: number;
    playerGames: PlayerGameDto[];
}

export interface PlayerGameDto {
    id?: number;
    playerId: number;
    gameId?: number;
    isWinner: boolean;
}