import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, NgModel } from "@angular/forms";
import { NgSelect2Module } from 'ng-select2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
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
        AuditPicMListComponent,
        AuditPicMAddComponent,
        AuditPicMUpdateComponent,
        AuditPicDListComponent,
        AuditPicDAddComponent,
        AuditPicDUpdateComponent,
        AuditRecDListComponent,
        AuditRecDAddComponent,
        AuditRecListComponent,
        AuditRecMAddComponent,
        AuditRecMListComponent,
    ],
    providers: [
        NgxSpinnerService,
    ]
})
export class MaintenanceModule {}
