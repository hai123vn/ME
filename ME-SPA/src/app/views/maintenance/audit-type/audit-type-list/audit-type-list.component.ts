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
  searchKey = false;

  constructor(
    private auditTypeService: AuditTypeService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.auditTypeService.currentAuditType.subscribe(auditType => this.auditType = auditType);
    this.route.data.subscribe(data => {
      console.log('Data: ', data);
      this.auditTypes = data['auditTypes'].result;
      this.pagination = data['auditTypes'].pagination;
    });
    console.log('pa: ', this.pagination);
  }
  load() {
    if (this.searchKey === false) {
      this.auditTypeService.getListAll(this.pagination.currentPage, this.pagination.itemsPerPage)
        .subscribe((res: PaginationResult<AuditType[]>) => {
          debugger
          this.auditTypes = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        });
    } else {
      this.auditTypeService.search(this.pagination.currentPage, this.pagination.itemsPerPage, this.text)
        .subscribe((res: PaginationResult<AuditType[]>) => {
          this.auditTypes = res.result;
          this.pagination = res.pagination;
          console.log('Search: ', this.auditTypes);
        }, error => {
          this.alertify.error(error);
        });
    }
  }

  search() {
    this.pagination.currentPage = 1;
    if (this.text !== '') {
      this.auditTypeService.search(this.pagination.currentPage, this.pagination.itemsPerPage, this.text)
        .subscribe((res: PaginationResult<AuditType[]>) => {
          this.auditTypes = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        });
    } else {
      this.load();
    }
  }

  add() {
    this.auditType = {};
    this.auditTypeService.changeAuditType(this.auditType);
    this.auditTypeService.changeFlag('0');
    this.router.navigate(['/maintenance/audit-type/add']);
  }

  changeToEdit(auditType: AuditType) {
    this.auditTypeService.changeAuditType(auditType);
    this.auditTypeService.changeFlag('1');
    this.router.navigate(['/maintenance/audit-type/update']);
  }

  delete(auditType: AuditType) {
    this.alertify.confirm('Delete Audit Type', 'Are you sure you want to delete this Audit_Type_ID "' + auditType.audit_Type_ID + '" ? ', () => {
      this.auditTypeService.delete(auditType.audit_Type_ID).subscribe(() => {
        this.load();
        this.alertify.success('Audit Type has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Audit Type');
      });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    debugger
    this.load();
  }






}
