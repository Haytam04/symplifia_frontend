import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../expense.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Expense } from 'src/app/models/Expense';
import { emptyValidator } from 'src/app/validators/emptyValidator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent {
  expenseForm!: FormGroup;
  isUpdate: boolean = false;
  minDate: Date = new Date(2024, 0, 1); 
  maxDate: Date = new Date();
  
  constructor(
    private fb: FormBuilder,
    private expensesService: ExpenseService,
    private dialogRef: MatDialogRef<ExpenseFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { expense?: Expense, isUpdate?: boolean, idSyndic: string }
  ) {}

  ngOnInit(): void {
    this.isUpdate = !!this.data.isUpdate;
    this.expenseForm = this.fb.group({
      name: [this.data.expense?.name || '', [ Validators.maxLength(30), emptyValidator()]],
      cost: [this.data.expense?.cost || '', [ Validators.pattern('^[0-9]*$')]],
      description: [this.data.expense?.description || '', [Validators.maxLength(60), emptyValidator()]],
      date: [this.data.expense?.date || this.maxDate , Validators.required]
    });
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const expense: Expense = this.expenseForm.value;

      if (this.isUpdate && this.data.expense) {
        this.expensesService.updateExpense(this.data.idSyndic, this.data.expense.idExpense, expense).subscribe(
          () => {
            this.dialogRef.close(true),
            this.showSnackbar('Expense updated successfully')
          },
          (error) => console.error('Error updating expense:', error)
        );
      } else {
        this.expensesService.addExpense(this.data.idSyndic, expense).subscribe(
          () => {
            this.dialogRef.close(true),
            this.showSnackbar('Expense added successfully')
          },
          (error) => console.error('Error creating expense:', error)
        );
      }
    }
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2500, 
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
