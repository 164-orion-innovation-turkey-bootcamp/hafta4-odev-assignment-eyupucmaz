import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  checkUser = new BehaviorSubject<boolean>(false);
  private PATH: string = "http://localhost:3000/users";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.PATH);
  }

  saveUser(data: User): Observable<User> {
    return this.http.post<User>(this.PATH, data);
  }

  isLoggedIn() {
    if (localStorage.length > 0) {
      this.checkUser.next(true);
    } else {
      this.checkUser.next(false);
    }
  }

}