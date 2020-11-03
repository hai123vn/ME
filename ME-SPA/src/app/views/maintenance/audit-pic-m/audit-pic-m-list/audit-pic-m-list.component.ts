import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditPicM } from '../../../../_core/_model/audit-pic-m';
import { Pagination, PaginationResult } from '../../../../_core/_model/pagination';
import { User } from '../../../../_core/_model/user';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditPicMService } from '../../../../_core/_service/audit-pic-m.service';

@Component({
  selector: 'app-audit-pic-m-list',
  templateUrl: './audit-pic-m-list.component.html',
  styleUrls: ['./audit-pic-m-list.component.scss']
})
export class AuditPicMListComponent implements OnInit {
  auditPics: AuditPicM[];
  auditPic: any = {};
  user: User = JSON.parse(localStorage.getItem('user'));
  pagination: Pagination;
  searchKey = false;
  text: string;

  constructor(private http: HttpClient,
    private auditPicMService: AuditPicMService,
    private alertify: AlertifyService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  load() {
    if (this.searchKey === false) {
      this.auditPicMService.getListAll(this.pagination.currentPage, this.pagination.itemsPerPage)
        .subscribe((res: PaginationResult<AuditPicM[]>) => {
          this.auditPics = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        });
    } else {
      this.auditPicMService.search(this.pagination.currentPage, this.pagination.itemsPerPage, this.text)
        .subscribe((res: PaginationResult<AuditPicM[]>) => {
          this.auditPics = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        });
    }
  }

  delete(auditPicM: AuditPicM) {
    this.alertify.confirm('You want delete Audit Pic M', 'Are you sure "' + auditPicM.piC_Type_ID + '" ?',
      () => {
        this.auditPicMService.delete(auditPicM.piC_Type_ID).subscribe(() => {
          this.load();
          this.alertify.success('Delete Success');
        }, error => {
          this.alertify.error(error);
        });
      });
  }

  add() {
    this.auditPic = {};
    this.auditPicMService.changeAuditPicM(this.auditPic);
    this.auditPicMService.changeFlag('0');
    this.router.navigate(['/maintenance/audit-pic-m/add']);
  }

  update(auditPicM: AuditPicM) {
    this.auditPicMService.changeAuditPicM(auditPicM);
    this.auditPicMService.changeFlag('1');
    this.router.navigate(['maintenance/audit-pic-m/update']);
  }

  search() {
    if (this.text != null) {
      this.searchKey = true;
      this.auditPicMService.search(this.pagination.currentPage, this.pagination.itemsPerPage, this.text)
        .subscribe((res: PaginationResult<AuditPicM[]>) => {
          this.auditPics = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        });
    } else {
      this.searchKey = false;
      this.load();
    }
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.load();
  }
}
