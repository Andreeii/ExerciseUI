import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPlayer } from './add-torunament.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})

export class TournamentPlayer{
    constructor(private http:HttpClient){}

    getPlayerList():Observable<IPlayer[]>{
        return this.http.get<IPlayer[]>("http://localhost:53084/players");
    }
}