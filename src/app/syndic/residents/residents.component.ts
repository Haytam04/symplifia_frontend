import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ResidentsService } from './residents.service';
import { ActivatedRoute } from '@angular/router';
import { Resident } from 'src/app/models/Resident';
import { Invoice } from 'src/app/models/Invoice';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ListMonthsComponent } from './list-months/list-months.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.css']
})
export class ResidentsComponent implements OnInit , AfterViewInit {
  residents: Resident[] = [];
  dataSource: MatTableDataSource<Resident> = new MatTableDataSource<Resident>();
  displayedColumns: string[] = ['fullName', 'phoneNumber', 'buildingName', 'paymentStatus','details'];
  selectedYear: number;
  currentMonth: number = new Date().getMonth() + 1;
  
  // availableYears: number[] = [2023 , new Date().getFullYear()];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
      private residentService: ResidentsService,
      private activatedRoute: ActivatedRoute,
      private dialog: MatDialog
  )
  {
     this.selectedYear = new Date().getFullYear();
  }

  ngOnInit():void {
      const idSyndic = this.activatedRoute.parent?.snapshot.params['idSyndic']; 
      this.fetchResidents(idSyndic, this.selectedYear);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchResidents(idSyndic: number, year: number): void {
    this.residentService.getResidentsWithInvoices(idSyndic, year).subscribe(data => {
      this.residents = data.map((resident: Resident) => {
        return {
          ...resident,
          paymentStatus: this.getPaymentStatus(resident.invoices)
        };
      });
      this.dataSource.data = this.residents;
    });
  }
  
  // onYearChange(year: number): void {
  //   const idSyndic = this.activatedRoute.parent?.snapshot.params['idSyndic']; 
  //   this.selectedYear = year;
  //   this.fetchResidents(idSyndic, this.selectedYear);
  // }
  
  getPaymentStatus(invoices: Invoice[]): string {
    const paymentStatuses: string[] = [];

    for (let month = 1; month <= this.currentMonth; month++) {
      const invoice = invoices.find(inv => inv.invoiceMonth === month);
      if (invoice?.paymentStatue === 'Pending') {
        return 'Pending';
      } else if (!invoice) {
        return 'Not Paid';
      } else {
        paymentStatuses.push('Payed');
      }
    }
    return paymentStatuses.every(status => status === 'Payed') ? 'Payed': '';  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openMonthsDialog(resident: Resident): void {
    const dialogRef = this.dialog.open(ListMonthsComponent, {
      width: '750px',
      data: {resident, invoices: resident.invoices, currentMonth: this.currentMonth }
    });

    dialogRef.afterClosed().subscribe(() => {
      const idSyndic = this.activatedRoute.parent?.snapshot.params['idSyndic'];
      this.fetchResidents(idSyndic, this.selectedYear);
    });
  }

  getPaymentStatusClass(paymentStatus: string): string {
    switch (paymentStatus) {
      case 'Payed':
        return 'payment-status-payed';
      case 'Pending':
        return 'payment-status-pending';
      case 'Not Paid':
        return 'payment-status-not-paid';
      default:
        return '';
    }
  }

}
