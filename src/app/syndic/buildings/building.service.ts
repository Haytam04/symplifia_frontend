import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Building } from 'src/app/models/Building';
  import { environment } from 'src/app/environments/environments';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class BuildingService {

    private apiUrl = environment.apiUrls.syndic;
    
    constructor(private http: HttpClient) {}

      getBuildingsBySyndicId(idSyndic: any): Observable<Building[]> {
        return this.http.get<Building[]>(this.apiUrl + idSyndic + '/buildings');
      }

      addBuildings(idSyndic: any, building: Building): Observable<Building> {
        return this.http.post<Building>(this.apiUrl + idSyndic + '/buildings', building);
      }

      updateBuilding(idSyndic: any,
                    buildingId: any,
                    updatedBuilding: Building): Observable<Building> {
        return this.http.put<Building>(this.apiUrl + idSyndic + '/buildings/' + buildingId, updatedBuilding);                
                    }

  }
