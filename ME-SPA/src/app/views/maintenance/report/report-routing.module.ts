import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditRecDComponent } from './audit-rec-d/audit-rec-d.component';
import { SixsScoreReportComponent } from './sixs-score-report/sixs-score-report.component';
import { SmeScoreReportComponent } from './sme-score-report/sme-score-report.component';
import { WaterSpiderReportComponent } from './water-spider-report/water-spider-report.component';

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
      },
      {
        path: 'wttracking-report',
        component: AuditRecDComponent,
        data: {
          title: "WTTracking List Report"
        }
      },
      {
        path: 'water-spider-report',
        component: WaterSpiderReportComponent,
        data: {
          title: "Water Spider Score Record Report"
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
