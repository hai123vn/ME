import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_core/_model/user';
import { AlertifyService } from '../../_core/_service/alertify.service';
import { AuthService } from '../../_core/_service/auth.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  currentUser: User = JSON.parse(localStorage.getItem('user'));


  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
  ) {

  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    debugger
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.alertify.message('Logged out');
    this.router.navigate(['/login']);
  }

}
