import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {
  private syndicUrl = environment.apiUrls.syndics;
  private buildingUrl = environment.apiUrls.buildings;

  constructor(private http: HttpClient) { }

  getSyndics(): Observable<any> {
    return this.http.get(this.syndicUrl);
  }

  getBuildings(syndicId: any): Observable<any> {
    return this.http.get(`${this.buildingUrl}/${syndicId}/buildings`);
  }

}
