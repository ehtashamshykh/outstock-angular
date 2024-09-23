import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const items = { ...localStorage };
    const accessTokenKey = Object.keys(items).find(key => key.includes('accessToken'));
    const accessToken = items[`${accessTokenKey}`];
    const authReq = request.clone({ setHeaders: { Authorization: 'Bearer ' + accessToken } });
    return next.handle(authReq);
  }
}
