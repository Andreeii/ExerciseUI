export interface ITournament {
    playerId: number;
    WinnerName: string;
    numberOfWins: string;
    tournamentId: number;
    tournamentName: string;
}

export interface TournamentDto {
    id?: number;
    name: string;
    game: GameDto[];

}
export interface GameDto {
    tournamentId?: number;
    id?: number;
    playerGame: PlayerGameDto[];
}

export interface PlayerGameDto {
    playerId: number;
    gameId?: number;
    isWinner: boolean;
}