import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalDataService } from './global-data.service';
import { environment } from '../../../environments/environment';
import { CurrentUser } from '../../model/current-user';
import { ProgressBarService } from './progress-bar.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private globalDataService: GlobalDataService, private progressbarService: ProgressBarService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const httpHeaders = new HttpHeaders();
    const apiUrl = environment.API.LOGIN + req.urlWithParams;
    const key = 'o8R3bEAT4bLfW3xcxxK0aWbBQ409jp9u';
    const user: CurrentUser = sessionStorage.getItem('currentUser') ? JSON.parse(sessionStorage.getItem('currentUser')) : null;
    const loggedUser = this.globalDataService.currentUser || user;
    let token = !!loggedUser && loggedUser.token ? loggedUser.token : null;
    token = this.globalDataService.currentUser.token;


    this.progressbarService.display(true);
    // if (!req.url.toLowerCase().includes('exist')) {
    //     this.progressbarService.display(true);
    // }

    if (!!token && req.url.includes('http')) {
      const authHeader = new HttpHeaders();
      const authReq = req.clone({ headers: authHeader, url: req.urlWithParams });
      return next.handle(authReq);
    }

    if (!!token && !req.url.includes('api/login')) {
      const mainUrl = environment.API.URL + req.urlWithParams;
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Content-Type', 'application/json').append('AuthToken', key.toString());
      authHeader = req.headers.has('Content-Type') ? authHeader.delete('Content-Type') : authHeader;
      const authReq = req.clone({ headers: authHeader, url: mainUrl });
      return next.handle(authReq);
    }
    const anonymousReq = req.clone({ url: apiUrl, headers: httpHeaders });
    return next.handle(anonymousReq);
  }
}
