import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../models/Invoice';
import { Observable } from 'rxjs';
import { PaymentDetails } from '../models/PaymentDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/residents';
  private apiPayment = 'http://localhost:8080/api/payment/details'

  constructor(private http: HttpClient) {}

  getInvoicesForResidentByYear(idResident: number, year: number): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/${idResident}/invoices?year=${year}`);
  }
  
  getPaymentDetails(residentId: number, month: any, year: number): Observable<PaymentDetails> {
    return this.http.get<PaymentDetails>(`${this.apiPayment}?residentId=${residentId}&month=${month}&year=${year}`);
  }
}
