export class Invoice {
    idInvoice!: number;
    invoiceMonth!: number;
    invoiceYear!: number;
    invoiceDate!: Date;
    price!: number;
    paymentStatue!: 'Payed' | 'Pending';
    paymentMethod!: 'BankTransfer' | 'Cash';
    idSyndic!: number;
  }