import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { Invoice } from '../models/Invoice';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  invoices: Invoice[] = [];
  months = Array.from({ length: 12 }, (_, i) => i + 1); // Array from 1 to 12 representing months

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const idUser = this.route.snapshot.params['idUser'];
    const currentYear = new Date().getFullYear();
    this.userService.getInvoicesForResidentByYear(idUser, currentYear).subscribe((data) => {
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

}
