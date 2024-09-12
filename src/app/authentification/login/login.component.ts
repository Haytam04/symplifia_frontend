import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emptyValidator } from 'src/app/validators/emptyValidator';
import { passwordValidator } from 'src/app/validators/passwordValidator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginFailed?: boolean;

  constructor(private authService: AuthService,
             private router: Router,
             private fb: FormBuilder,
            ) 
             {}

  ngOnInit(): void {
    let localStorageSyndic = localStorage.getItem('syndic');
    let localStorageResident = localStorage.getItem('resident');

    if( localStorageSyndic ) {
      this.router.navigate(['/syndic']);  // Redirect to 404 page if user is not logged in.  // Assuming AuthService is a service that provides access to user data.  // Please replace 'not-found' with the actual route name for your 404 page.  // Also, replace 'idSyndic' with the actual property name for your syndic ID.  // Make sure to handle the case where the user is not logged
      return ;
    } else if(localStorageResident) {
      this.router.navigate(['/user']);  // Redirect to 404 page if user is not logged in.  // Assuming AuthService is a service that provides access to user data.  // Please replace 'not-found' with the actual route name for your 404 page.  // Also, replace 'idSyndic' with the actual property name for your syndic ID.  // Make sure to handle the case where the user is not logged
      return ;
    }

    this.loginForm = this.fb.group({
      phoneNumber: ['' , [emptyValidator(), Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [emptyValidator(), Validators.minLength(8), Validators.maxLength(200), passwordValidator()]],
      role: ['syndic', emptyValidator()]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { phoneNumber, password, role } = this.loginForm.value;

    this.authService.login(phoneNumber, password, role).subscribe(
      (response) => {
        if (response.authenticated) {

          if (role === 'syndic') {
            localStorage.setItem('syndic', JSON.stringify(response.user));
            this.router.navigate(['syndic']);
          } else if (role === 'resident') {
            localStorage.setItem('resident', JSON.stringify(response.user));
            this.router.navigate(['user']);
          }
        } else {
          this.loginFailed = true;
        }
      },
      (error) => {
        this.loginFailed = true;
        console.error('Login error', error);
      }
    );
  }
}
}
