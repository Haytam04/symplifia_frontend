import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../models/Invoice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/residents';

  constructor(private http: HttpClient) {}

  getInvoicesForResidentByYear(idResident: number, year: number): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/${idResident}/invoices?year=${year}`);
  }
}
