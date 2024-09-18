import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { UserService } from './user.service';
import { Invoice } from '../models/Invoice';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDetails } from '../models/PaymentDetails';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  invoices: Invoice[] = [];
  months = Array.from({ length: 12 }, (_, i) => i + 1); // Array from 1 to 12 representing months
  idUser: any;

  constructor(
    private route: Router,
    private userService: UserService,
    private dialog: MatDialog, // Assuming AuthService is a service that provides access to user data
  ) {}

  ngOnInit(): void {
    let localStorageSyndic = localStorage.getItem('syndic');
    let localStorageResident = localStorage.getItem('resident');

    if( localStorageSyndic ) {
      this.route.navigate(['/syndic']);  
      return ;
    } else if(localStorageResident) {
      this.route.navigate(['/user']);
      let user = JSON.parse(localStorageResident);
      this.idUser = user.id;
      this.loadInvoices();
      return ;
    }

  }
  loadInvoices(){
    this.userService.getInvoicesForResidentByYear(this.idUser, new Date().getFullYear()).subscribe((data) => {
      this.invoices = data;
    });
  }
  
  getMonthCardClass(month: number): string {
    const invoice = this.invoices.find(i => i.invoiceMonth === month);
    if (invoice) {
      return invoice.paymentStatue === 'Payed' ? 'green' :
             invoice.paymentStatue === 'Pending' ? 'orange' : '';
    } else if (month <= new Date().getMonth() + 1) {
      return 'blue';
    } else {
      return 'grey';
    }
  }

  getMonthCardText(month: number): string {
    const invoice = this.invoices.find(i => i.invoiceMonth === month);
    if (invoice) {
      return invoice.paymentStatue === 'Payed' ? 'Paid' :
             invoice.paymentStatue === 'Pending' ? 'Pending' : '';
    } else if (month <= new Date().getMonth() + 1) {
      return 'Pay';
    } else {
      return 'Not Started';
    }
  }
  onPayButtonClick(month: any) {
    this.userService.getPaymentDetails(this.idUser, month, new Date().getFullYear()).subscribe((data: PaymentDetails) => {
      const dialogRef = this.dialog.open(PaymentDialogComponent, {
        width: '400px',
        data: {
          idUser: this.idUser,
          syndicId: data.syndicId,
          month: data.month,
          year: data.year,
          syndicFullName: data.syndicFullName,
          syndicBankName: data.syndicBankName,
          syndicBankAccount: data.syndicBankAccount,
          buildingPrice: data.buildingPrice
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.loadInvoices();
      });
    });
  }
  Logout() {
    localStorage.removeItem('resident');
    this.route.navigate(['/']);
  }
}
