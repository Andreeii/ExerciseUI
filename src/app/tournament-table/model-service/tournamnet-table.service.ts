import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITournament } from './tournament-table.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})

export class TournamentTableService{
    constructor(private http:HttpClient){}

    getTournamentList():Observable<ITournament[]>{
        return this.http.get<ITournament[]>("http://localhost:53084/tournaments");
    }
}