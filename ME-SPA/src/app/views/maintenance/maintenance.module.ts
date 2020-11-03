import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, NgModel } from "@angular/forms";
import { NgSelect2Module } from 'ng-select2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuditTypeDAddComponent } from './audit-type-d/audit-type-d-add/audit-type-d-add.component';
import { AuditTypeDListComponent } from './audit-type-d/audit-type-d-list/audit-type-d-list.component';
import { AuditTypeDUpdateComponent } from './audit-type-d/audit-type-d-update/audit-type-d-update.component';
import { AuditTypeAddComponent } from './audit-type/audit-type-add/audit-type-add.component';
import { AuditTypeEditComponent } from './audit-type/audit-type-edit/audit-type-edit.component';
import { AuditTypeListComponent } from './audit-type/audit-type-list/audit-type-list.component';
import { BrandAddComponent } from './brands/brand-add/brand-add.component';
import { BrandListComponent } from './brands/brand-list/brand-list.component';
import { BrandUpdateComponent } from './brands/brand-update/brand-update.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { UserListComponent } from './user/user-list/user-list.component';

@NgModule({
    imports: [
        MaintenanceRoutingModule,
        CommonModule,
        FormsModule,
        NgxSpinnerModule,
        PaginationModule.forRoot(),
        NgSelect2Module,
        ModalModule.forRoot(),
    ],
    declarations: [
        BrandListComponent,
        BrandAddComponent,
        BrandUpdateComponent,
        AuditTypeAddComponent,
        AuditTypeListComponent,
        AuditTypeEditComponent,
        AuditTypeDAddComponent,
        AuditTypeDListComponent,
        AuditTypeDUpdateComponent,
        UserListComponent,
    ],
    providers: [
        NgxSpinnerService,
    ]
})
export class MaintenanceModule {}
