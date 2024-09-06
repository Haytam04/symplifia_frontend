import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8080/api/auth/'

  constructor(private http: HttpClient) {}

  login(phoneNumber: string, password: string, role: string): Observable<any> {

    return this.http.post(this.url + role +'-login', { phoneNumber, password });

  }
}
