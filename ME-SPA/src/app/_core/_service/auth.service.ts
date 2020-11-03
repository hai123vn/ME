import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_model/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth';
  jwtHelper = new JwtHelperService();
  currentUser: User;
  decodedToken: any;


  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + '/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user, user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
        }
      }),
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    const curentUser = JSON.parse(localStorage.getItem("user"));
    if(curentUser == null || curentUser.role == undefined)
    {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
}
