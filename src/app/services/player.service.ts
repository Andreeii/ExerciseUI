import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPlayer, PlayerDto, PlayerRoles, ChangePassword } from '../models/player.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class TournamentPlayer {
    constructor(private http: HttpClient) { }

    baseUrl = environment.apiUrl;

    getPlayerList(): Observable<IPlayer[]> {
        return this.http.get<IPlayer[]>(this.baseUrl + 'api/player');
    }

    postPlayer(player: PlayerDto) {
        return this.http.post(this.baseUrl + 'api/account/register', player);
    }

    getRoles(): Observable<PlayerRoles[]> {
        return this.http.get<PlayerRoles[]>(this.baseUrl + 'api/player/roles');
    }

    getPlayer(): Observable<PlayerDto> {
        return this.http.get<PlayerDto>(this.baseUrl + 'api/player/byId');
    }

    updatePlayer(player: PlayerDto) {
        return this.http.post(this.baseUrl + 'api/account/edit', player);
    }

    changePassword(passwordDto: ChangePassword) {
        return this.http.post(this.baseUrl + 'api/account/changePassword', passwordDto);
    }
} 