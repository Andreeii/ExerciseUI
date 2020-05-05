import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITournament, TournamentDto } from '../models/tournament-table.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



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

    getTournamentById(id:number):Observable<TournamentDto>{
        return this.http.get<TournamentDto>(this.baseUrl + 'api/tournament/'+ id)
    }

}
