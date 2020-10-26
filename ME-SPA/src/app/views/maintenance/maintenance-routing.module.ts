import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from "@angular/router";
import { BrandListResolver } from '../../_core/_resolver/brand-list.resolver';
import { BrandAddComponent } from './brands/brand-add/brand-add.component';
import { BrandListComponent } from './brands/brand-list/brand-list.component';
import { BrandUpdateComponent } from './brands/brand-update/brand-update.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Maintenance'
        },
        children:
            [
                {
                    path: '',
                    component: BrandListComponent,
                    resolve: { brands: BrandListResolver},
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
                }
            ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaintenanceRoutingModule { }