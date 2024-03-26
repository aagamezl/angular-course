import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

import { environment } from '../../environments/environment';
import Signin from './signin';
import Signup from './signup';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  protected readonly endpoint = environment.backendUrl

  constructor(private http: HttpClient) { }

  logout() { }

  async isLoggedIn() {
    const response: any = await lastValueFrom(this.http.get<string>(`${this.endpoint}/check-signin`));

    return response.loggedIn
  }

  signin(data: Signin): Observable<string> {
    return this.http.post<string>(`${this.endpoint}/signin`, data);
  }

  signup(data: Signup): Observable<string> {
    return this.http.post<string>(`${this.endpoint}/signup`, data);
  }
}
