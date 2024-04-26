import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponse, UserData } from '../data-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(pageIndex: number, pageSize: number): Observable<DataResponse> {
    let params = new HttpParams()
      .set('page', pageIndex)
      .set('per_page', pageSize);
    return this.http.get<DataResponse>('https://reqres.in/api/users', {
      params,
    });
  }

  getUserById(id: string): Observable<UserData> {
    return this.http.get<UserData>(`https://reqres.in/api/users/${id}`);
  }
}
