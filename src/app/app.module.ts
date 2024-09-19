import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuildingService } from './syndic/buildings/building.service';
import { DashboardComponent } from './syndic/dashboard/dashboard.component';
import { BuildingsComponent } from './syndic/buildings/buildings.component';
import { ResidentsComponent } from './syndic/residents/residents.component';
import { ExpensesComponent } from './syndic/expenses/expenses.component';
import { SyndicSpaceComponent } from './syndic/syndic-space/syndic-space.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BuildingFormComponent } from './syndic/buildings/building-form/building-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ExpenseFormComponent } from './syndic/expenses/expense-form/expense-form.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { DeleteDialogComponent } from './syndic/expenses/delete-dialog/delete-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { ListMonthsComponent } from './syndic/residents/list-months/list-months.component';
import { ConfirmPaymentComponent } from './syndic/residents/confirm-payment/confirm-payment.component';
import { MatIconModule } from '@angular/material/icon';
import { UserComponent } from './user/user.component';
import { PaymentDialogComponent } from './user/payment-dialog/payment-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { LoginComponent } from './authentification/login/login.component';
import { SignUpComponent } from './authentification/sign-up/sign-up.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BuildingsComponent,
    ResidentsComponent,
    ExpensesComponent,
    SyndicSpaceComponent,
    BuildingFormComponent,
    ExpenseFormComponent,
    DeleteDialogComponent,
    ListMonthsComponent,
    ConfirmPaymentComponent,
    UserComponent,
    PaymentDialogComponent,
    LoginComponent,
    SignUpComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSelectModule,
    MatSortModule,
    MatIconModule,
    MatRadioModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
