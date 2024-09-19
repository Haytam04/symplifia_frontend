import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../models/Invoice';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { PaymentDetails } from '../models/PaymentDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrls.residents;
  private apiPayment = environment.apiUrls.paymentDetails;

  constructor(private http: HttpClient) {}

  getInvoicesForResidentByYear(idResident: number, year: number): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/${idResident}/invoices?year=${year}`);
  }
  
  getPaymentDetails(residentId: number, month: any, year: number): Observable<PaymentDetails> {
    return this.http.get<PaymentDetails>(`${this.apiPayment}?residentId=${residentId}&month=${month}&year=${year}`);
  }
}
