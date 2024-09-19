import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from 'src/app/models/Expense';
import { environment } from 'src/app/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  

  private apiUrl = environment.apiUrls.syndic;

  constructor(private http: HttpClient) {}

  getExpensesBySyndicId(idSyndic: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}${idSyndic}/expenses`);
  }

  addExpense(idSyndic: string, expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}${idSyndic}/expenses`, expense);
  }

  updateExpense(idSyndic: string, expenseId: number, updatedExpense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}${idSyndic}/expenses/${expenseId}`, updatedExpense);
  }

  deleteExpense(idSyndic: string, expenseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${idSyndic}/expenses/${expenseId}`);
  }

}
