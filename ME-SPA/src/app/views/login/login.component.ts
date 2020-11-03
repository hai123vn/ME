import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { AlertifyService } from '../../_core/_service/alertify.service';
import { AuthService } from '../../_core/_service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};

  constructor(
    private authService : AuthService,
    private router : Router,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    if(this.authService.loggedIn()) this.router.navigate(["/dashboard"]);
  }


  login() {
    console.log(this.user);
    this.spinner.show();
    this.authService.login(this.user).subscribe(
      next => {
        this.alertify.success("Login Success !!");
        this.spinner.hide();
      },
      error => {
        this.alertify.error("Login failed");
        this.spinner.hide();
      }, () => {
        this.router.navigate(["/maintenance"]);
        this.spinner.hide();
      }
    );
  }


}
