import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  getUsers(page: number) {
    return this.http.get<any>(`${this.baseUrl}?page=${page}`);
  }

  getUserById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
