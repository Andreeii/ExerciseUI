import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPlayer, PlayerDto } from '../models/player.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn:'root'
})

export class TournamentPlayer{
    constructor(private http:HttpClient){}

    baseUrl = environment.apiUrl;

    getPlayerList():Observable<IPlayer[]>{
        return this.http.get<IPlayer[]>(this.baseUrl+'api/player');
    }

    postPlayer(player:PlayerDto) {
        return this.http.post(this.baseUrl + 'api/account/register', player);
    }
} 