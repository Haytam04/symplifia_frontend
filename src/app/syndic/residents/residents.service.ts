import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidentsService {

  private apiUrl = 'http://localhost:8080/api/residents';
  private apiUrlInvoice = 'http://localhost:8080/api/invoices/confirm-payment';


  constructor(private http: HttpClient) { }
  getResidentsWithInvoices(syndicId: number, year: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${syndicId}?year=${year}`);
  }

  confirmPayment(residentId: number, invoiceMonth: number, invoiceYear: number): Observable<void> {
    const params = new HttpParams()
      .set('residentId', residentId.toString())
      .set('invoiceMonth', (invoiceMonth).toString()) 
      .set('invoiceYear', invoiceYear.toString());

    return this.http.put<void>(this.apiUrlInvoice, {}, { params });
  }
}
