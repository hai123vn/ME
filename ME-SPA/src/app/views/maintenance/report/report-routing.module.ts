import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmeScoreReportComponent } from './sme-score-report/sme-score-report.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'report'
    },
    children: [
      {
        path: 'sme-score-report',
        component: SmeScoreReportComponent,
        data: {
          title: 'SME Score Report'
        }
      }
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
