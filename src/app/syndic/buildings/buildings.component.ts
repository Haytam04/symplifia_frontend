import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BuildingService } from './building.service';
import { Building } from 'src/app/models/Building';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BuildingFormComponent } from './building-form/building-form.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css']
})
export class BuildingsComponent implements OnInit, AfterViewInit { 

  idSyndic!: string;
  displayedColumns: string[] = ['name', 'syndicPrice', 'location','update'];
  dataSource: MatTableDataSource<Building> = new MatTableDataSource<Building>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private buildingService: BuildingService,
              private dialog: MatDialog,
              private router: Router) {}
 
  ngOnInit(): void {
    let localStorageSyndic = localStorage.getItem('syndic');
    let localStorageResident = localStorage.getItem('resident');

    if( localStorageSyndic ) {
      let user = JSON.parse(localStorageSyndic);
      this.idSyndic = user.id;
      this.showBuildings();
      return ;
    } else if( localStorageResident ) {
      this.router.navigate(['/user']);  
      return ;
    }else {
      this.router.navigate(['/login']);
      return ;
    }

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  showBuildings(): void {
    this.buildingService.getBuildingsBySyndicId(this.idSyndic).subscribe(
      (data) => {
        this.dataSource.data = data; 
        console.log(this.dataSource);
      },
      (error) => {
        console.error('Error fetching buildings:', error);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openCreateBuildingDialog(): void {
    const dialogRef = this.dialog.open(BuildingFormComponent, {
      width: '500px', 
      data: { idSyndic: this.idSyndic } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showBuildings();
      }
    });
  }
  openUpdateDialog(building: Building): void {
    const dialogRef = this.dialog.open(BuildingFormComponent, {
      width: '500px',
      data: { building: { ...building }, isUpdate: true, idSyndic: this.idSyndic }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showBuildings(); 
      }
    });
  }
}


