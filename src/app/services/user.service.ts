import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = "http://ec2-18-119-157-216.us-east-2.compute.amazonaws.com:8463/user/"
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(
    private http: HttpClient
  ) { 
       this.currentUserSubject = new BehaviorSubject<User> (JSON.parse(localStorage.getItem('currentUser') || '{}'));
       this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    console.log("Inside Login method");
    const userObj = { "username": username, "password": password };
    return this.http.post(this.baseUrl+ "login",userObj);
        
  }


  signup(user: User): Observable<any> {
    return this.http.post(this.baseUrl+ "signup",user);
  }
}
