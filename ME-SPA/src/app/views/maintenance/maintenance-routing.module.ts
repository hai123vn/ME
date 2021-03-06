import { Component, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from "@angular/router";
import { AuditPicDListResolver } from '../../_core/_resolver/audit-pic-d-list.resolver';
import { AuditPicMListResolver } from '../../_core/_resolver/audit-pic-m-list.resolver';
import { AuditRecDListResolver } from '../../_core/_resolver/audit-rec-d-list.resolver';
import { AuditRecMListResolver } from '../../_core/_resolver/audit-rec-m-list.resolver';
import { AuditRecViewModelListResolver } from '../../_core/_resolver/audit-rec-viewmodel-list.resolver';
import { AuditTypeDListResolver } from '../../_core/_resolver/audit-type-d-list.resolver';
import { AuditTypeListResolver } from '../../_core/_resolver/audit-type-list.resolver';
import { BrandListResolver } from '../../_core/_resolver/brand-list.resolver';
import { AuditPicMService } from '../../_core/_service/audit-pic-m.service';
import { AuditPicDAddComponent } from './audit-pic-d/audit-pic-d-add/audit-pic-d-add.component';
import { AuditPicDListComponent } from './audit-pic-d/audit-pic-d-list/audit-pic-d-list.component';
import { AuditPicDUpdateComponent } from './audit-pic-d/audit-pic-d-update/audit-pic-d-update.component';
import { AuditPicMAddComponent } from './audit-pic-m/audit-pic-m-add/audit-pic-m-add.component';
import { AuditPicMListComponent } from './audit-pic-m/audit-pic-m-list/audit-pic-m-list.component';
import { AuditPicMUpdateComponent } from './audit-pic-m/audit-pic-m-update/audit-pic-m-update.component';
import { AuditRecDAddComponent } from './audit-rec-d/audit-rec-d-add/audit-rec-d-add.component';
import { AuditRecDListComponent } from './audit-rec-d/audit-rec-d-list/audit-rec-d-list.component';
import { AuditRecListComponent } from './audit-rec-d/audit-rec-list/audit-rec-list.component';
import { AuditRecMAddComponent } from './audit-rec-d/audit-rec-m-add/audit-rec-m-add.component';
import { AuditRecMListComponent } from './audit-rec-d/audit-rec-m-list/audit-rec-m-list.component';
import { AuditTypeDAddComponent } from './audit-type-d/audit-type-d-add/audit-type-d-add.component';
import { AuditTypeDListComponent } from './audit-type-d/audit-type-d-list/audit-type-d-list.component';
import { AuditTypeDUpdateComponent } from './audit-type-d/audit-type-d-update/audit-type-d-update.component';
import { AuditTypeAddComponent } from './audit-type/audit-type-add/audit-type-add.component';
import { AuditTypeEditComponent } from './audit-type/audit-type-edit/audit-type-edit.component';
import { AuditTypeListComponent } from './audit-type/audit-type-list/audit-type-list.component';
import { BrandAddComponent } from './brands/brand-add/brand-add.component';
import { BrandListComponent } from './brands/brand-list/brand-list.component';
import { BrandUpdateComponent } from './brands/brand-update/brand-update.component';
import { SixsScoreRecordDetailComponent } from './sixs-score-record/sixs-score-record-detail/sixs-score-record-detail.component';
import { SixsScoreRecordEditComponent } from './sixs-score-record/sixs-score-record-edit/sixs-score-record-edit.component';
import { SixsScoreRecordListComponent } from './sixs-score-record/sixs-score-record-list/sixs-score-record-list.component';
import { SmeScoreRecordDetailComponent } from './sme-score-record/sme-score-record-detail/sme-score-record-detail.component';
import { SmeScoreRecordEditComponent } from './sme-score-record/sme-score-record-edit/sme-score-record-edit.component';
import { SmeScoreRecordListComponent } from './sme-score-record/sme-score-record-list/sme-score-record-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { WaterSpiderScoreRecordDetailComponent } from './water-spider-score-record/water-spider-score-record-detail/water-spider-score-record-detail.component';
import { WaterSpiderScoreRecordListComponent } from './water-spider-score-record/water-spider-score-record-list/water-spider-score-record-list.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Maintenance'
        },
        children: [
            {
                path: 'brand',
                children:
                    [
                        {
                            path: '',
                            component: BrandListComponent,
                            resolve: { brands: BrandListResolver },
                            data: {
                                title: 'Brand'
                            }
                        },
                        {
                            path: 'add',
                            component: BrandAddComponent,
                            data: {
                                title: 'Add new brand'
                            }
                        },
                        {
                            path: 'update',
                            component: BrandUpdateComponent,
                            data: {
                                title: 'Update brand'
                            }
                        },
                    ]
            },
            {
                path: 'audit-type',
                children: [
                    {
                        path: '',
                        component: AuditTypeListComponent,
                        resolve: { auditTypes: AuditTypeListResolver },
                        data: {
                            title: 'Audit Type'
                        }
                    },
                    {
                        path: 'add',
                        component: AuditTypeAddComponent,
                        data: {
                            title: 'Add Audit Type'
                        }
                    },
                    {
                        path: 'update',
                        component: AuditTypeEditComponent,
                        data: {
                            title: 'Update Audit Type'
                        }
                    }
                ]
            },
            {
                path: 'audit-type-d',
                children: [
                    {
                        path: '',
                        component: AuditTypeDListComponent,
                        resolve: { auditTypes: AuditTypeDListResolver },
                        data: {
                            title: 'Audit Type D'
                        }
                    },
                    {
                        path: 'add',
                        component: AuditTypeDAddComponent,
                        data: {
                            title: 'Add Audit Type D'
                        }
                    },
                    {
                        path: 'update',
                        component: AuditTypeDUpdateComponent,
                        data: {
                            title: 'Update Audit Type D'
                        }
                    }
                ]
            },
            {
                path: 'user',
                children: [
                    {
                        path: '',
                        component: UserListComponent,
                        data: {
                            title: 'User'
                        }
                    }
                ]
            },
            {
                path: 'audit-pic-m',
                children: [
                    {
                        path: '',
                        component: AuditPicMListComponent,
                        resolve: { auditPics: AuditPicMListResolver },
                        data: {
                            title: 'Audit Pic M'
                        }
                    },
                    {
                        path: 'add',
                        component: AuditPicMAddComponent,
                        data: {
                            title: 'Add Audit Pic M'
                        }
                    },
                    {
                        path: 'update',
                        component: AuditPicMUpdateComponent,
                        data: {
                            title: 'Update Audit Pic M'
                        }
                    }
                ]
            },
            {
                path: 'audit-pic-d',
                children: [
                    {
                        path: '',
                        component: AuditPicDListComponent,
                        resolve: { auditPics: AuditPicDListResolver },
                        data: {
                            title: 'Audit Pic D'
                        }
                    },
                    {
                        path: 'add',
                        component: AuditPicDAddComponent,
                        data: {
                            title: 'Add Audit Pic D'
                        }
                    },
                    {
                        path: 'update',
                        component: AuditPicDUpdateComponent,
                        data: {
                            title: 'Update Audit Pic D'
                        }
                    }
                ]
            },
            {
                path: 'audit-rec',
                children: [
                    {
                        path: '',
                        component: AuditRecListComponent,
                        resolve: { auditRecs: AuditRecViewModelListResolver },
                        data: {
                            title: 'WT Tracking List'
                        }
                    },
                    {
                        path: 'audit-recM-list',
                        component: AuditRecMListComponent,
                        resolve: { auditRecMs: AuditRecMListResolver },
                        data: {
                            title: 'List Meeting Minutes'
                        }
                    },
                    {
                        path: 'audit-recD-list',
                        component: AuditRecDListComponent,
                        resolve: { auditRecDs: AuditRecDListResolver },
                        data: {
                            title: 'List WT Tracking List'
                        }
                    },
                    {
                        path: 'add-audit-recM',
                        component: AuditRecMAddComponent,
                        data: {
                            title: 'Add Meeting Minutes'
                        }
                    },
                    {
                        path: 'update-audit-recM',
                        component: AuditRecMAddComponent,
                        data: {
                            title: 'Update Meeting Minutes'
                        }
                    },
                    {
                        path: 'add-audit-recD',
                        component: AuditRecDAddComponent,
                        data: {
                            title: 'Add new WT Tracking List'
                        }
                    },
                    {
                        path: 'update-audit-recD',
                        component: AuditRecDAddComponent,
                        data: {
                            title: 'Update new WT Tracking List'
                        }
                    },
                ]
            },
            {
                path: 'sme-score-record',
                children: [
                    {
                        path: '',
                        component: SmeScoreRecordListComponent,
                        data: {
                            title: 'SME Score Record'
                        }
                    },
                    {
                        path: 'detail/:recordId',
                        component: SmeScoreRecordDetailComponent,
                        data: {
                            title: 'SME Score Record Detail'
                        }
                    },
                    {
                        path: 'edit/:recordId',
                        component: SmeScoreRecordEditComponent,
                        data: {
                            title: 'SME Score Record Edit'
                        }
                    }
                ]
            },
            {
                path: '6s-score-record',
                children: [
                    {
                        path: '',
                        component: SixsScoreRecordListComponent,
                        data: {
                            title: "6S Score Record"
                        }
                    },
                    {
                        path: 'detail',
                        component: SixsScoreRecordDetailComponent,
                        data: {
                            title: "6S Score Record Detail"
                        }
                    },
                    {
                        path: 'edit',
                        component: SixsScoreRecordEditComponent,
                        data: {
                            title: "6S Score Record Edit"
                        }
                    }
                ]
            },
            {
                path: 'water-spider-score-record',
                children: [
                    {
                        path: '',
                        component: WaterSpiderScoreRecordListComponent,
                        data: {
                            title: "Water Spider Score Record"
                        }
                    },
                    {
                        path: 'detail/:recordId',
                        component: WaterSpiderScoreRecordDetailComponent,
                        data: {
                            title: 'Water Spider Score Record Detail'
                        }
                    }
                ]
            },
            {
                path: 'report',
                loadChildren: () =>
                    import('./report/report.module').then(m => m.ReportModule)
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaintenanceRoutingModule { }