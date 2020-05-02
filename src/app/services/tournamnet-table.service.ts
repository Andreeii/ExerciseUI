import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITournament, TournamentDto } from '../models/tournament-table.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


// const tournamentDto = {name: "tadsf1" };
// const gameDto = {tournamentId :2};
// const gameDto2 = {tournamentId :2};
// const arrDto1 = [gameDto,gameDto2];

// const playergameDto = {playerId :1,gameId:2,isWinner:true};
// const playergameDto1 = {playerId :2,gameId:2,isWinner:false};
// const arrDto = [playergameDto,playergameDto1];


const tournamentDto = {
    Name: "ExampleName",
    Game: [
        {
            PlayerGame: [
                {
                    playerId: 1,
                    IsWinner: true
                },
                {
                    playerId: 2,
                    IsWinner: false
                }
            ]
        }
    ]
}


@Injectable({
    providedIn: 'root'
})

export class TournamentTableService {
    constructor(private http: HttpClient) { }

    baseUrl = environment.apiUrl;

    getTournamentList(): Observable<ITournament[]> {
        return this.http.get<ITournament[]>(this.baseUrl + 'api/tournament');
    }

    postTournament(tournament:TournamentDto) {
        return this.http.post(this.baseUrl + 'api/tournament', tournament);
    }

    deleteTournament(id: number): Observable<number> {
        return this.http.delete<number>(this.baseUrl + 'api/tournament/' + id);
    }

    // postGame() {
    //     return this.http.post(this.baseUrl + 'api/game', arrDto1);
    // }
    // postPlayerGame() {
    //     return this.http.post(this.baseUrl + 'api/playergame', arrDto);
    // }

}
