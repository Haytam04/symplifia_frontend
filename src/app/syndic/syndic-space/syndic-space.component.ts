import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-syndic-space',
  templateUrl: './syndic-space.component.html',
  styleUrls: ['./syndic-space.component.css']
})
export class SyndicSpaceComponent {
  sidebarOpen = false;
  idSyndic!: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.idSyndic = this.activatedRoute.snapshot.paramMap.get('idSyndic')!;
    console.log(this.idSyndic);
    
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
