import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Dashboard } from "../dashboard/dashboard";
import { Nav } from '../nav/nav';




@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, MatToolbarModule, MatListModule, Dashboard, Nav],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav {
  constructor(private router:Router){}
   isDropdownOpen = false;
  logout(){
  this.router.navigate(['/login']);
  }
  dashboard(){
  this.router.navigate(['/dashboard'])
  }
   profile(){
  this.router.navigate(['/profile']);
  }


toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

@HostListener('document:click', ['$event'])
clickOutside(event: Event) {
  const target = event.target as HTMLElement;
  if (!target.closest('.dropdown')) {
    this.isDropdownOpen = false;
  }
  
}
}

