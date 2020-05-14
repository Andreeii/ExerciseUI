import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IPlayer, PlayerDto, PlayerRoles, ChangePassword, PlayerForDelete } from '../models/player.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedRequest } from '../infrastructure/models/PaginatedRequest';
import { PagedResult } from '../infrastructure/models/PagedResult';

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


    getPlayerById(id: number): Observable<IPlayer> {
        return this.http.get<IPlayer>(this.baseUrl + 'api/player/' + id);
    }


    updatePlayer(player: PlayerDto) {
        return this.http.post(this.baseUrl + 'api/account/edit', player);
    }

    changePassword(passwordDto: ChangePassword) {
        return this.http.post(this.baseUrl + 'api/account/changePassword', passwordDto);
    }

    private handleError(error: HttpErrorResponse) {
        return Observable.throw(error.message);
    }

    getPlayersPaged(paginatedRequest: PaginatedRequest): Observable<PagedResult<IPlayer>> {
        return this.http.post<PagedResult<IPlayer>>(this.baseUrl + 'api/player/paginatedSearch', paginatedRequest);
    }

    deletePlayer(playerId: number):Observable<PlayerForDelete> {
        return this.http.delete<PlayerForDelete>(this.baseUrl + 'api/player/' + playerId);
    }
} 