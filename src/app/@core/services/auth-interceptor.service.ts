import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    request = req.clone({
      setHeaders: {
        authorization: `Basic ${btoa('Modyo:M0DY0T3sT2022!')}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request);
  }
}
