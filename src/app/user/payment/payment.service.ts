import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import { Invoice } from 'src/app/models/Invoice';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = environment.apiUrls.payment;

  constructor(private http: HttpClient) { }

  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.apiUrl, invoice);
  }
}