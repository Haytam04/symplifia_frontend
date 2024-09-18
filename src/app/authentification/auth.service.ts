import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Url = 'http://localhost:8080/api/auth/'
  

  constructor(private http: HttpClient) {}

  login(phoneNumber: string, password: string): Observable<any> {

    return this.http.post(this.Url + 'login', { phoneNumber, password });

  }

  Signup(user: any, role: string): Observable<any> {
    return this.http.post(this.Url +'signup/'+role, user);
  }

  checkPhoneNumberExists(phoneNumber: string): Observable<any> {
    return this.http.get<boolean>(this.Url +'check-phone/'+phoneNumber);
  }


}
