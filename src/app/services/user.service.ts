import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponse, UserData, UserDetails } from '../data-response';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(pageIndex: number, pageSize: number): Observable<DataResponse> {
    let params = new HttpParams()
      .set('page', pageIndex)
      .set('per_page', pageSize);
    let url = `https://reqres.in/api/users?${params}`;
    let cachedResponse = localStorage.getItem(url);
    if (cachedResponse) {
      console.log('cache hit');
      return of(JSON.parse(cachedResponse));
    }
    return this.http.get<DataResponse>(url).pipe(
      tap((response) => {
        console.log('cache miss');
        localStorage.setItem(url, JSON.stringify(response));
      })
    );
  }

  getUserById(id: number): Observable<UserData> {
    let url = `https://reqres.in/api/users/${id}`;
    let cachedResponse = localStorage.getItem(url);
    if (cachedResponse) {
      console.log('cache hit');
      return of(JSON.parse(cachedResponse));
    }
    return this.http.get<UserData>(url).pipe(
      tap((response) => {
        console.log('cache miss');
        localStorage.setItem(url, JSON.stringify(response));
      })
    );
  }
}
