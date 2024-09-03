import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent {
  paymentMethod: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }


  selectPaymentMethod(method: string) {
    this.paymentMethod = method;
  }

}
