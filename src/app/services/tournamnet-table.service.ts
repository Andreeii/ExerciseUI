import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITournament } from '../models/tournament-table.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn:'root'
})

export class TournamentTableService{
    constructor(private http:HttpClient){}

    baseUrl = environment.apiUrl;

    getTournamentList():Observable<ITournament[]>{
        return this.http.get<ITournament[]>(this.baseUrl+'api/tournament');
    }
}