import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IPlayer, PlayerDto, PlayerRoles, ChangePassword } from '../models/player.model';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

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
        // .pipe(
        //     catchError(this.handleError)
        // );
    }

    changePassword(passwordDto: ChangePassword) {
        return this.http.post(this.baseUrl + 'api/account/changePassword', passwordDto);
    }

    private handleError(error: HttpErrorResponse) {
        return Observable.throw(error.message);
    }
} 