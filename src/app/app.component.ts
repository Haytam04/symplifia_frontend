import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router){}

  navigateToSyndic() {
    this.router.navigate(['/syndic/1']);
  }
  navigateToUser() {
    this.router.navigate(['/user/1']);
  }

  title = 'symplifia';
}
