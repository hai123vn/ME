import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, NgModel } from "@angular/forms";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuditTypeAddComponent } from './audit-type/audit-type-add/audit-type-add.component';
import { AuditTypeListComponent } from './audit-type/audit-type-list/audit-type-list.component';
import { BrandAddComponent } from './brands/brand-add/brand-add.component';
import { BrandListComponent } from './brands/brand-list/brand-list.component';
import { BrandUpdateComponent } from './brands/brand-update/brand-update.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';

@NgModule({
    imports: [
        MaintenanceRoutingModule,
        CommonModule,
        FormsModule,
        NgxSpinnerModule,
        PaginationModule.forRoot()
    ],
    declarations: [
        BrandListComponent,
        BrandAddComponent,
        BrandUpdateComponent,
        AuditTypeAddComponent,
        AuditTypeListComponent
    ],
    providers: [
        NgxSpinnerService,
    ]
})
export class MaintenanceModule {}
