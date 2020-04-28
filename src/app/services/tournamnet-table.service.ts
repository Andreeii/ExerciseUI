import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITournament } from '../models/tournament-table.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const tournamentDto = {name: "tadsf1" };
const gameDto = {tournamentId :1};
const playergameDto = {playerId :1,gameId:2,isWinner:true};
const playergameDto1 = {playerId :2,gameId:2,isWinner:false};
const arrDto = [playergameDto,playergameDto1];

@Injectable({
    providedIn: 'root'
})

export class TournamentTableService {
    constructor(private http: HttpClient) { }

    baseUrl = environment.apiUrl;

    getTournamentList(): Observable<ITournament[]> {
        return this.http.get<ITournament[]>(this.baseUrl + 'api/tournament');
    }

    postTournament() {
        return this.http.post(this.baseUrl + 'api/tournament', tournamentDto);
    }

    postGame() {
        return this.http.post(this.baseUrl + 'api/game', gameDto);
    }
    postPlayerGame() {
        return this.http.post(this.baseUrl + 'api/playergame', arrDto);
    }

}
