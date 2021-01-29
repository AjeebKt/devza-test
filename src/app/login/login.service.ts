import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenResponse } from '../model/token-response';
import { HttpClient } from '@angular/common/http';
import { GlobalDataService } from '../core/services/global-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private gd: GlobalDataService) { }

  // login(user: { username: string, password: string }): Observable<TokenResponse> {
  //   const requestBody = 'username=' + user.username + '&password=' + user.password + '&grant_type=password';
  //   return this.http.post<TokenResponse>('/auth-service/oauth/token', requestBody);
  //   // return this.http.post<TokenResponse>('/oauth/token', requestBody);
  // }

  // Only For Demo
  login(data) {
    return this.http.post<any>('/api/login', data);
  }
}
