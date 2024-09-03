import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.idUser = this.route.snapshot.params['idUser'];
    const currentYear = new Date().getFullYear();
    this.userService.getInvoicesForResidentByYear(this.idUser, currentYear).subscribe((data) => {
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
    const year = new Date().getFullYear();
    this.userService.getPaymentDetails(this.idUser, month, year).subscribe((data: PaymentDetails) => {
      this.dialog.open(PaymentDialogComponent, {
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
    });
  }
}
