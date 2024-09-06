import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  phoneNumber: string = '';
  password: string = '';
  role: string = 'syndic';
  loginFailed?: boolean ;

  constructor(private authService: AuthService,
             private router: Router
            ) {}

  onLogin() {
    this.authService.login(this.phoneNumber, this.password, this.role).subscribe(
      (response: any) => {
        if (response.authenticated) {

          localStorage.setItem('user', JSON.stringify(response.user));

          if (this.role === 'syndic') {
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
