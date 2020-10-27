import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditType } from '../../../../_core/_model/audit-type';
import { Pagination, PaginationResult } from '../../../../_core/_model/pagination';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditTypeService } from '../../../../_core/_service/audit-type.service';

@Component({
  selector: 'app-audit-type-list',
  templateUrl: './audit-type-list.component.html',
  styleUrls: ['./audit-type-list.component.scss']
})
export class AuditTypeListComponent implements OnInit {
  auditTypes: AuditType[];
  auditType: any = {};
  pagination: Pagination;
  text: string;

  constructor(
    private auditTypeService: AuditTypeService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  load() {
    this.auditTypeService.getListAll(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginationResult<AuditType[]>) => {
        this.auditTypes = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  search() {
    if (this.text !== '') {
      this.auditTypeService.search(this.pagination.currentPage, this.pagination.itemsPerPage, this.text)
        .subscribe((res: PaginationResult<AuditType[]>) => {
          this.auditType = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        });
    } else {
      this.load();
    }
  }




}
