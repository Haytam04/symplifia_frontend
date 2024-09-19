import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidentsService {

  private apiUrl = environment.apiUrls.residents;
  private apiUrlInvoice = environment.apiUrls.confirmPayment;


  constructor(private http: HttpClient) { }
  getResidentsWithInvoices(syndicId: string, year: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${syndicId}?year=${year}`);
  }

  confirmPayment(residentId: number, invoiceMonth: number, invoiceYear: number): Observable<any> {
    const params = new HttpParams()
      .set('residentId', residentId.toString())
      .set('invoiceMonth', (invoiceMonth).toString()) 
      .set('invoiceYear', invoiceYear.toString());

    return this.http.put<void>(this.apiUrlInvoice, {}, { params });
  }
}
