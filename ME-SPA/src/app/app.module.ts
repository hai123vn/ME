import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { AlertifyService } from './_core/_service/alertify.service';


export function tokenGetter() {
  return localStorage.getItem('token');
}

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrandListResolver } from './_core/_resolver/brand-list.resolver';
import { NgSelect2Module } from 'ng-select2';
import { AuditTypeListResolver } from './_core/_resolver/audit-type-list.resolver';
import { AuditTypeDListResolver } from './_core/_resolver/audit-type-d-list.resolver';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './views/login/login.component';
import { AuthService } from './_core/_service/auth.service';
import { AuthGuard } from './_core/_guards/auth.guard';
import { AuditPicMListResolver } from './_core/_resolver/audit-pic-m-list.resolver';
import { AuditPicDListResolver } from './_core/_resolver/audit-pic-d-list.resolver';

@NgModule({
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    BrandListResolver,
    AlertifyService,
    AuditTypeListResolver,
    AuditTypeDListResolver,
    AuditPicMListResolver,
    AuditPicDListResolver,
    AuthService,
    AuthGuard
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    NgSelect2Module,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5002"], 
        disallowedRoutes: ["localhost: 5002/api/auth"]
      }
    })
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ...APP_CONTAINERS
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
