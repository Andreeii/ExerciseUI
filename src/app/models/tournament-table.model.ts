export interface ITournament {
    playerId: number;
    winnerName: string;
    numberOfWins: string;
    tournamentId: number;
    tournamentName: string;
}

export interface WinnedTournaments {
    tournamentId: number;
    tournamentName: string;
    playerName: string;
    numberOfWins: number;
}

export interface TournamentDto {
    id?: number;
    name: string;
    game: GameDto[];

}
export interface GameDto {
    id?: number;
    tournamentId?: number;
    playerGame: PlayerGameDto[];
}

export interface PlayerGameDto {
    id?:number;
    playerId: number;
    gameId?: number;
    isWinner: boolean;
}