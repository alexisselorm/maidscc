import {
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptorFn,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (
  req,
  next: HttpHandlerFn
) => {
  return next(req).pipe(
    catchError((error) => {
      console.error('Error: ' + error);
      return throwError(() => error);
    })
  );
};
