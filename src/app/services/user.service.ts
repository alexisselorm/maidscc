import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponse } from '../data-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(pageIndex: number) {
    let params = new HttpParams().set('page', pageIndex);
    return this.http.get<DataResponse>('https://reqres.in/api/users', {
      params,
    });
  }

  getUserById(id: string) {
    return this.http.get(`https://reqres.in/api/users/${id}`);
  }
}
