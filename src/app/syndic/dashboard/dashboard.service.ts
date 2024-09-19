import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = environment.apiUrls.dashboard;

  constructor(private http: HttpClient) { }

  getTotalsBetweenDates(startDate: string, endDate: string, syndicId: string): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('syndicId', syndicId);

    return this.http.get<number>(`${this.apiUrl}/totals`, { params });
  }
}
