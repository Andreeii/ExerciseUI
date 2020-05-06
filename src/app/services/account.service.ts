import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PlayerForLogin } from '../models/account/PlayerForLogin';
import { BearerToken } from '../models/account/BearerToken';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl + 'api/account/';

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean{
    const token = localStorage.getItem('accessToken');
    return token ? true : false;
  }

  login(playerForLoginDto: PlayerForLogin): Observable<BearerToken> {
    return this.http.post<BearerToken>(this.baseUrl + 'login/', playerForLoginDto);
  }
}
