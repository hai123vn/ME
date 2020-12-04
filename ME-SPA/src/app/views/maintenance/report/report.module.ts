import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReportRoutingModule } from './report-routing.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgSelect2Module } from 'ng-select2';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SmeScoreReportComponent } from './sme-score-report/sme-score-report.component';
import { SixsScoreReportComponent } from './sixs-score-report/sixs-score-report.component';
import { AuditRecDComponent } from './audit-rec-d/audit-rec-d.component';
import { WaterSpiderReportComponent } from './water-spider-report/water-spider-report.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ReportRoutingModule,
    PaginationModule,
    NgSelectModule,
    BsDropdownModule,
    NgSelect2Module,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    SmeScoreReportComponent,
    SixsScoreReportComponent,
    AuditRecDComponent,
    WaterSpiderReportComponent
  ]
})
export class ReportModule { }
