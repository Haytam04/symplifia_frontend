import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Resident } from 'src/app/models/Resident';
import { ResidentsService } from '../residents.service';
import { Invoice } from 'src/app/models/Invoice';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.css']
})
export class ConfirmPaymentComponent {
  @Output() paymentConfirmed = new EventEmitter<void>();
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: {resident: Resident, invoice: Invoice },
              private residentService: ResidentsService,
              private dialogRef: MatDialogRef<ConfirmPaymentComponent>,
              private snackBar: MatSnackBar,
              ) { }

  confirmPayment(): void {
    const currentYear = new Date().getFullYear();

    this.residentService.confirmPayment(this.data.resident.id , this.data.invoice.invoiceMonth, currentYear).subscribe({
      next: () => {
        this.paymentConfirmed.emit();
        this.dialogRef.close(true);
        this.showSnackbar('Payment confirmed successfully')
      },
      error: (error) => {
        console.error('Error confirming payment:', error);
      }
    });
  }
  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2500, 
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
  }


