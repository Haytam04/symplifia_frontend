import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-syndic-space',
  templateUrl: './syndic-space.component.html',
  styleUrls: ['./syndic-space.component.css']
})
export class SyndicSpaceComponent{
  sidebarOpen = false;

  constructor(private route: Router) {}


  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  Logout(){
    localStorage.removeItem('user');
    this.route.navigate(['/']);
  }
}
