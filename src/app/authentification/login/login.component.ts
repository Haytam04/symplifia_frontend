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
  loginFailed?: boolean ;

  constructor(private authService: AuthService,
             private router: Router,
             private fb: FormBuilder,
            ) 
             {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phoneNumber: [ , [emptyValidator(), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
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

          localStorage.setItem('user', JSON.stringify(response.user));

          if (role === 'syndic') {
            this.router.navigate(['syndic']);
          } else {
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
