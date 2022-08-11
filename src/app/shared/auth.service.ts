import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  setToken(token: string){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(){
    return this.getToken() !== null;
  }

  logout(){
    // localStorage.removeItem('currentUser');
    // this.currentUserSubject.next(new User());
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // login(username: string, password: string) {
  //   return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
  //       .pipe(map(user => {
  //           // store user details and jwt token in local storage to keep user logged in between page refreshes
  //           localStorage.setItem('currentUser', JSON.stringify(user));
  //           this.currentUserSubject.next(user);
  //           return user;
  //       }));
  // }

  // login(loginPayload: LoginPayload){
  //   this.http.post("http://ltin343723.cts.com:8452/user/login",loginPayload);
  // }

//   login(username: string, password: string) {
//     console.log(username);
//     console.log(password);
//     return this.http.post<any>("http://ltin343723.cts.com:8452/user/login", { username, password })
//         .pipe(map(user => {
//           console.log("Inside Service Login: "+user.token);
//             // store user details and jwt token in local storage to keep user logged in between page refreshes
//             localStorage.setItem('currentUser', JSON.stringify(user));
//             console.log("LocalStorage value is "+localStorage.getItem('currentUser'));
//             this.currentUserSubject.next(user);
//             return user;
//         }));
// }
}
