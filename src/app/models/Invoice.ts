export interface Invoice {
    idInvoice?: number;
    invoiceMonth: any;
    invoiceYear: number;
    invoiceDate: Date;
    price: number;
    paymentStatue: 'Payed' | 'Pending';
    paymentMethod: string;
    idSyndic?: string;
    syndic?: any;
    resident?: any;
    idResident?: string;
  }