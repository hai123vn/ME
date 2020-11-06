import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { AuditPicD } from '../../../../_core/_model/audit-pic-d';
import { AuditPicM } from '../../../../_core/_model/audit-pic-m';
import { Pagination, PaginationResult } from '../../../../_core/_model/pagination';
import { User } from '../../../../_core/_model/user';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditPicDService } from '../../../../_core/_service/audit-pic-d.service';

@Component({
  selector: 'app-audit-pic-d-list',
  templateUrl: './audit-pic-d-list.component.html',
  styleUrls: ['./audit-pic-d-list.component.scss']
})
export class AuditPicDListComponent implements OnInit {
  baseUrl = environment.apiUrl;
  auditPics: AuditPicD[];
  auditPic: any = {};
  user: User = JSON.parse(localStorage.getItem('user'));
  text: string;
  searchKey = false;
  pagination: Pagination;
  // pagination: Pagination = {
  //   currentPage: 1,
  //   itemsPerPage: 5,
  //   totalItems: 39,
  //   totalPages: 8,
  // };
  constructor(
    private http: HttpClient,
    private auditService: AuditPicDService,
    private router: Router,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.auditService.currentAuditPicD.subscribe(
      auditPic => (auditPic = this.auditPic)
    );
    this.route.data.subscribe(data => {
      console.log(data);
      this.auditPics = data["auditPics"].result;
      this.pagination = data["auditPics"].pagination;
    });
    // this.load();
  }

  load() {
    if (this.searchKey === false) {
      this.auditService.getListAll(this.pagination.currentPage, this.pagination.itemsPerPage)
        .subscribe((res: PaginationResult<AuditPicD[]>) => {
          this.auditPics = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error("Error -_- !!");
        });
    } else {
      this.auditService.search(
        this.pagination.currentPage, 
        this.pagination.itemsPerPage, 
        this.text)
        .subscribe((res: PaginationResult<AuditPicD[]>) => {
          this.auditPics = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error("Error ¯\_(ツ)_/¯ ");
        });
    }
  }

  delete(auditPicD: AuditPicD) {
    this.alertify.confirm("Delete Audit Pic D", 'Are you sure you  want to delete Pic ID"' + auditPicD.piC_Type_ID + '" ?', () => {
      this.auditService.delete(auditPicD).subscribe(
        () => {
          this.load();
          this.alertify.success("Deleted success (☞ﾟヮﾟ)☞  ☜(ﾟヮﾟ☜)");
        }, error => {
          this.alertify.error("Delete failed !! (T_T)(T_T)");
        }
      );
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.load();
  }

  changePageAdd() {
    this.auditPic = {};
    this.auditService.changeAuditPicD(this.auditPic);
    this.auditService.changeFlag("0");
    this.router.navigate(["/maintenance/audit-pic-d/add"]);
  }

  changePageUpdate(auditPic1: AuditPicD) {
    this.auditPic = auditPic1;
    this.auditService.changeAuditPicD(this.auditPic);
    this.auditService.changeFlag("1");
    this.router.navigate(['/maintenance/audit-pic-d/update']);
  }

  search() {
    this.pagination.currentPage = 1;
    if (this.text !== '') {
      this.searchKey = true;
      this.auditService.search(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.text
      )
        .subscribe((res: PaginationResult<AuditPicD[]>) => {
          this.auditPic = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error("Error (¬‿¬)(¬‿¬)");
        });
    } else {
      this.searchKey = false;
      this.load;
    }
  }
}
