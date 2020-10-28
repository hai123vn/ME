import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from "@angular/router";
import { AuditTypeListResolver } from '../../_core/_resolver/audit-type-list.resolver';
import { BrandListResolver } from '../../_core/_resolver/brand-list.resolver';
import { AuditTypeAddComponent } from './audit-type/audit-type-add/audit-type-add.component';
import { AuditTypeListComponent } from './audit-type/audit-type-list/audit-type-list.component';
import { BrandAddComponent } from './brands/brand-add/brand-add.component';
import { BrandListComponent } from './brands/brand-list/brand-list.component';
import { BrandUpdateComponent } from './brands/brand-update/brand-update.component';

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
                        component: AuditTypeAddComponent,
                        data: {
                            title: 'Update Audit Type'
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