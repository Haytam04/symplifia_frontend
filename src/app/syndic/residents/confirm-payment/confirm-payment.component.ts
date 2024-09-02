import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Resident } from 'src/app/models/Resident';
import { ResidentsService } from '../residents.service';
import { Invoice } from 'src/app/models/Invoice';

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
              ) { }

  confirmPayment(): void {
    const currentYear = new Date().getFullYear();

    this.residentService.confirmPayment(this.data.resident.id , this.data.invoice.invoiceMonth, currentYear).subscribe({
      next: () => {
        this.paymentConfirmed.emit(); // Emit the event
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error confirming payment:', error);
      }
    });
  }
  }


