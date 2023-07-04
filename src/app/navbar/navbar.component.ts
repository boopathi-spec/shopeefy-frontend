import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  redirect() {
    let confirm = window.confirm('Want to logout?');
    if (confirm) {
      localStorage.removeItem('userName');
      localStorage.removeItem('password');
      localStorage.removeItem('token');
      alert('You are now loggedOut');
      this.router.navigate(['']);
    }
  }
}
