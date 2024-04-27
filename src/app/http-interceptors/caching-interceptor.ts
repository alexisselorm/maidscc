import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

export const cachingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  if (req.method !== 'GET') {
    return next(req);
  }

  console.log('here');
  const cachedResponse = JSON.parse(localStorage.getItem(req.url)!);
  if (cachedResponse) {
    console.log('cache hit');
    return of(cachedResponse as HttpEvent<any>);
  }

  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event.type === HttpEventType.Response) {
        console.log('cache miss');
        console.log(event);
        console.log(req.url);

        localStorage.setItem(req.url, JSON.stringify(event));
      }
    })
  );
};
