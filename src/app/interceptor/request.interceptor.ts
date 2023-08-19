import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    try {
      const token = localStorage.getItem('token')['token']
      const provider = localStorage.getItem('token')['provider']
      const content = token?.substring(1, token.length - 1);

      const modifiedRequest = request.clone({
        setHeaders: {
          'Provider':`${provider}`,
          'Authorization' : `Bearer ${content}`
        }
      });
      return next.handle(modifiedRequest);
    } catch (error) {
      return  next.handle(request)
    }
  }
}
