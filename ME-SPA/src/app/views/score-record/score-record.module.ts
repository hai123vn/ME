import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ScoreRecordRoutingModulle } from './score-record-routing.module';
import { NgSelect2Module } from 'ng-select2';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        PaginationModule,
        NgSelectModule,
        ScoreRecordRoutingModulle,
        NgSelect2Module,
        BsDropdownModule,
        BsDatepickerModule.forRoot(),
    ],
    declarations: [
    
    ],
})

export class ScoreRecordModule { }
