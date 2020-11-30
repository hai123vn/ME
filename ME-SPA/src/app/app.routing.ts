import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScopeRecordLayoutComponent } from './containers';
import { DefaultLayoutComponent } from './containers/default-layout';

// Import Containers
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './_core/_guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Home"
    },
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(m => m.DashboardModule)
      },
      {
        path: "maintenance",
        loadChildren: () =>
          import("./views/maintenance/maintenance.module").then(
            m => m.MaintenanceModule
          )
      },
      {
        path: "record",
        component: ScopeRecordLayoutComponent,
        data: {
          title: "Record Page"
        },
        children: [
          {
            path: 'record-add',
            loadChildren: () =>
              import("./views/score-record/score-record.module").then(
                m => m.ScoreRecordModule
              )
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
