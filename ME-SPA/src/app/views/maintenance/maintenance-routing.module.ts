import { Component, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from "@angular/router";
import { AuditPicDListResolver } from '../../_core/_resolver/audit-pic-d-list.resolver';
import { AuditPicMListResolver } from '../../_core/_resolver/audit-pic-m-list.resolver';
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
import { AuditTypeDAddComponent } from './audit-type-d/audit-type-d-add/audit-type-d-add.component';
import { AuditTypeDListComponent } from './audit-type-d/audit-type-d-list/audit-type-d-list.component';
import { AuditTypeDUpdateComponent } from './audit-type-d/audit-type-d-update/audit-type-d-update.component';
import { AuditTypeAddComponent } from './audit-type/audit-type-add/audit-type-add.component';
import { AuditTypeEditComponent } from './audit-type/audit-type-edit/audit-type-edit.component';
import { AuditTypeListComponent } from './audit-type/audit-type-list/audit-type-list.component';
import { BrandAddComponent } from './brands/brand-add/brand-add.component';
import { BrandListComponent } from './brands/brand-list/brand-list.component';
import { BrandUpdateComponent } from './brands/brand-update/brand-update.component';
import { UserListComponent } from './user/user-list/user-list.component';

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
                        resolve: { auditPicDs : AuditPicDListResolver},
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
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaintenanceRoutingModule { }