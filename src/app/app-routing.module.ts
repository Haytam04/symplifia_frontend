import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SyndicSpaceComponent } from './syndic/syndic-space/syndic-space.component';
import { DashboardComponent } from './syndic/dashboard/dashboard.component';
import { BuildingsComponent } from './syndic/buildings/buildings.component';
import { ResidentsComponent } from './syndic/residents/residents.component';
import { ExpensesComponent } from './syndic/expenses/expenses.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './authentification/login/login.component';
import { SignUpComponent } from './authentification/sign-up/sign-up.component';


const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'sign-up', component: SignUpComponent
  },
  { 
    path: 'syndic', 
    component: SyndicSpaceComponent, 
    children: [
      { path: '', redirectTo:'dashboard' ,pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'building', component: BuildingsComponent },
      { path: 'residents', component: ResidentsComponent},
      { path: 'expenses', component: ExpensesComponent} 
    ]
  },
  {
    path: 'user', component: UserComponent
  }
    
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
