import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {
  private syndicUrl = 'http://localhost:8080/syndics'; // Adjust URL if needed
  private buildingUrl = 'http://localhost:8080/api/syndics';

  constructor(private http: HttpClient) { }

  getSyndics(): Observable<any> {
    return this.http.get(this.syndicUrl);
  }

  getBuildings(syndicId: any): Observable<any> {
    return this.http.get(`${this.buildingUrl}/${syndicId}/buildings`);
  }

}
