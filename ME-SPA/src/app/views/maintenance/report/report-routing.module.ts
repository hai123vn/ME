import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SixsScoreReportComponent } from './sixs-score-report/sixs-score-report.component';
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
      },
      {
        path: 'sixs-score-report',
        component: SixsScoreReportComponent,
        data: {
          title: 'Six Score Report'
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
