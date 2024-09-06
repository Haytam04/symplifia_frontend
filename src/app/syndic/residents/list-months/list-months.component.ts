import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Invoice } from 'src/app/models/Invoice';
import { ConfirmPaymentComponent } from '../confirm-payment/confirm-payment.component';
import { Resident } from 'src/app/models/Resident';

@Component({
  selector: 'app-list-months',
  templateUrl: './list-months.component.html',
  styleUrls: ['./list-months.component.css']
})
export class ListMonthsComponent {
  months: { month: number, paymentStatus: string }[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {resident: Resident,
                                                     invoices : Invoice[],
                                                     currentMonth: number
                                                    },
            private dialog: MatDialog) 
  {
    this.generateMonthsStatus(data.invoices, data.currentMonth);
  }
  
  public generateMonthsStatus(invoices: Invoice[], currentMonth: number): void {
    for (let month = 1; month <= 12; month++) {
      let paymentStatus:string;

      if (month <= currentMonth) {
        const invoice = invoices.find(inv => inv.invoiceMonth === month);
        if (invoice) {
          paymentStatus = invoice.paymentStatue === 'Payed' ? 'Paid' : 'Pending';
        } else {
          paymentStatus = 'Not Paid';
        }
      }
      else {
        paymentStatus = 'Not Started';
      }

      this.months.push({ month, paymentStatus });
    }
  }

  updateMonthStatus(month: number, status: string): void {
    const monthToUpdate = this.months.find(m => m.month === month);
    if (monthToUpdate) {
      monthToUpdate.paymentStatus = status;
    }
  }

  getCardClass(paymentStatus: string): string {
    switch (paymentStatus) {
      case 'Paid':
        return 'paid';
      case 'Pending':
        return 'pending';
      case 'Not Paid':
        return 'not-paid';
      default:
        return 'not-started';
    }
  }

  openConfirmPaymentDialog(month: number): void {
    const invoice = this.data.invoices.find(inv => inv.invoiceMonth === month);

    const dialogRef = this.dialog.open(ConfirmPaymentComponent, {
      width: '350px',
      data: {resident: this.data.resident, invoice}
    });
    dialogRef.componentInstance.paymentConfirmed.subscribe(() => {
      this.dialog.closeAll();
    });
  } 

}
