import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmeScoreRecordAddComponent } from './sme-score-record-add/sme-score-record-add.component';



const routes: Routes = [
    {
        path: 'sms-scored-record-add',
        component: SmeScoreRecordAddComponent
    }
]





@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ScoreRecordRoutingModulle { }