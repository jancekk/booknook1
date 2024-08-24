import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';
import { User } from './register/user.model';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

interface UserData {
  name? : string;
  surname? : string;
  email: string;
  password: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isUserAuthenticated = false;
  private _user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) { }

  get isUserAuthenticated(): Observable<boolean>{

    return this._user.asObservable().pipe(
      map((user: User | null) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
      );
}

  get getUserId(){
    return this._user.asObservable().pipe(
      map((user: User | null) => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
      );
  }

  get user(){
    return this._user.asObservable().pipe(
      map((user: User | null) => {
        if (user) {
          return user;
        } else {
          return null;
        }
      })
      );
  }

  get token(){
    return this._user.asObservable().pipe(
      map((user: User | null) => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
      );
  }

  login(user: UserData){
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
    {email: user.email, password: user.password, returnSecureToken: true})
    .pipe(
      tap((userData : AuthResponseData) => {
        const expirationTime = new Date( new Date().getTime() + +userData.expiresIn * 1000);
        const user = new User(userData.localId, userData.email, userData.idToken, expirationTime);
        
        this._user.next(user);
      })
    );
  }

  logout(){
    
    this._user.next(null);
    console.log('logged out');
  }

  register(user: UserData){
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
    {email: user.email, password: user.password, returnSecureToken: true}).pipe(
      tap((userData : AuthResponseData) => {
        const expirationTime = new Date( new Date().getTime() + +userData.expiresIn * 1000);
        const user = new User(userData.localId, userData.email, userData.idToken, expirationTime);
        
        this._user.next(user);
      })
    );
  }

  getUser(id: string): Observable<UserData> {
    return this.http.get<UserData>(`https://booknook-dc570-default-rtdb.firebaseio.com/users/${id}.json`)
      .pipe(
        switchMap((userData) => {
          return [userData]; 
        }),
        take(1)
      );
  }
  

}
