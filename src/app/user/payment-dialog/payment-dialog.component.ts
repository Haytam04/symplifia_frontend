import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/models/Invoice';
import { PaymentService } from '../payment/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent {
  paymentMethod: string = 'BankTransfer';
  idUser: any;

  constructor(
      public dialogRef: MatDialogRef<PaymentDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private route: ActivatedRoute,
      private paymentService: PaymentService,
      private snackBar: MatSnackBar,
      ) 
  {}

  ngOnInit(): void {
    this.idUser = this.route.snapshot.params['idUser'];
    console.log(this.route.snapshot);
    
  }

  onConfirm(): void {
    const invoice: Invoice = {
      invoiceMonth: this.data.month,
      invoiceYear: this.data.year,
      invoiceDate: new Date(),
      price: this.data.buildingPrice,
      paymentStatue: 'Pending',
      paymentMethod: this.paymentMethod,
      syndic: { idSyndic: this.data.syndicId },
      resident: { idResident: this.data.idUser }
    };
    console.log(this.data.idUser);
    

    this.paymentService.createInvoice(invoice).subscribe(
      (response) => {
        console.log('Invoice created successfully', response);
        this.dialogRef.close(true);
        this.showSnackbar('Payment sent, Waiting for syndic confirmation');
      },
      (error) => {
        console.error('Error creating invoice', error);
        this.dialogRef.close(false);
      }
    );

  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2500, 
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  selectPaymentMethod(method: any) {
    this.paymentMethod = method;
  }
}
