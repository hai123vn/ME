import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, NgModel } from "@angular/forms";
import { AlertComponent } from 'ngx-bootstrap/alert';
import { BrandListResolver } from '../../_core/_resolver/brand-list.resolver';
import { BrandAddComponent } from './brands/brand-add/brand-add.component';
import { BrandListComponent } from './brands/brand-list/brand-list.component';
import { BrandUpdateComponent } from './brands/brand-update/brand-update.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';

@NgModule({
    imports: [
        MaintenanceRoutingModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        BrandListComponent,
        BrandAddComponent,
        BrandUpdateComponent
    ],
})
export class MaintenanceModule {}
