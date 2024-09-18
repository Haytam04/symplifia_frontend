import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emptyValidator } from 'src/app/validators/emptyValidator';
import { passwordValidator } from 'src/app/validators/passwordValidator';
import * as CryptoJS from 'crypto-js'; // Import crypto-js

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
      this.router.navigate(['/syndic']);  
      return ;
    } else if(localStorageResident) {
      this.router.navigate(['/user']);  
      return ;
    }

    this.loginForm = this.fb.group({
      phoneNumber: ['' , [emptyValidator(), Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [emptyValidator(), Validators.minLength(8), Validators.maxLength(255), passwordValidator()]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {

      const { phoneNumber, password} = this.loginForm.value;
      const encryptedPassword = CryptoJS.SHA256(password).toString();

      this.authService.login(phoneNumber, encryptedPassword).subscribe(
        (response) => {
          if (response.role === 'syndic') {
            localStorage.setItem('syndic', JSON.stringify(response));
            this.router.navigate(['/syndic']);
          } else if (response.role === 'resident') {
            localStorage.setItem('resident', JSON.stringify(response));
            this.router.navigate(['/user']);
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
