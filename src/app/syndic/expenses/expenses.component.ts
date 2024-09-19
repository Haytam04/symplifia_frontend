import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from 'src/app/models/Expense';
import { ExpenseService } from './expense.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit, AfterViewInit  {
  idSyndic!: string;
  expenses: Expense[] = []; 
  dataSource: MatTableDataSource<Expense> = new MatTableDataSource<Expense>();
  displayedColumns: string[] = ['name', 'cost', 'description', 'date', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private expenseService: ExpenseService,
              private dialog: MatDialog,
              private router: Router) {}

  ngOnInit(): void {
    let localStorageSyndic = localStorage.getItem('syndic');
    let localStorageResident = localStorage.getItem('resident');

    if( localStorageSyndic ) {
      let user = JSON.parse(localStorageSyndic);
      this.idSyndic = user.id;
      this.showExpenses(); 
      return ;
    } else if( localStorageResident ) {
      this.router.navigate(['/user']);  
      return ;
    }else {
      this.router.navigate(['/login']);
      return ;
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showExpenses(): void {
    this.expenseService.getExpensesBySyndicId(this.idSyndic).subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      },  
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  openCreateExpenseDialog(): void {
    const dialogRef = this.dialog.open(ExpenseFormComponent, {
      width: '600px',
      data: { idSyndic: this.idSyndic }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showExpenses();
      }
    });
  }

  openUpdateExpenseDialog(expense: Expense): void {
    const dialogRef = this.dialog.open(ExpenseFormComponent, {
      width: '600px',
      data: { expense: { ...expense }, isUpdate: true, idSyndic: this.idSyndic }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showExpenses();
      }
    });
  }

  deleteExpense(expenseId: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      height: '180px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expenseService.deleteExpense(this.idSyndic,expenseId).subscribe(() => {
          this.showExpenses(); 
        });
      }
    });
  }
}
  

