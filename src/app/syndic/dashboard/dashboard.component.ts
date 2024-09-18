import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

  idSyndic!: string;
  totalInvoicePrice: number = 0;
  totalExpenseCost: number = 0;
  remaining: number = 0;

  minDate: Date = new Date(2024, 0, 1);;
  maxDate: Date = new Date();

  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  startDateControl = new FormControl(new Date(this.currentYear, this.currentMonth, 1)); 
  endDateControl = new FormControl(new Date()); 

  constructor(private dashboardService: DashboardService,
              private datePipe: DatePipe,
              private router: Router) 
              {}

  ngOnInit(): void {
    let localStorageUser = localStorage.getItem('syndic');
    if( !localStorageUser ) {
      this.router.navigate(['/not-found']);  // ymchi l 404 page yla makan user m authentifier.  
      return ;
    }
    let user = JSON.parse(localStorageUser);
    this.idSyndic = user.id;
    this.onDateChange();
  }

  onDateChange(): void {
    const startDate = this.datePipe.transform(this.startDateControl.value, 'yyyy-MM-dd');
    const endDate = this.datePipe.transform(this.endDateControl.value, 'yyyy-MM-dd');

    if (startDate && endDate) {
      this.dashboardService.getTotalsBetweenDates(startDate, endDate, this.idSyndic).subscribe(
        (data) => {
          this.totalInvoicePrice = data.totalInvoicePrice || 0;
          this.totalExpenseCost = data.totalExpenseCost || 0;
          this.remaining = data.remaining || 0;
        },
        (error) => {
          console.error('Error fetching dashboard data:', error);
        }
      );
    }
  }
}
