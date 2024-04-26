import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(params: HttpParams) {
    return this.http.get('https://reqres.in/api/users', { params });
  }

  getUserById(id: string) {
    return this.http.get(`https://reqres.in/api/users/${id}`);
  }
}
