import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { AuditRecD } from '../../../../_core/_model/audit-rec-d';
import { Pagination } from '../../../../_core/_model/pagination';
import { AuditRecDService } from '../../../../_core/_service/audit-rec-d.service';

@Component({
  selector: 'app-audit-rec-d-list',
  templateUrl: './audit-rec-d-list.component.html',
  styleUrls: ['./audit-rec-d-list.component.scss']
})
export class AuditRecDListComponent implements OnInit {
  urlImage = environment.imageUrl + "no-image.jpg";
  url: any = environment.imageUrl;
  auditRecDs: AuditRecD[];
  pagination: Pagination;
  constructor(
    private auditRecDSerivce: AuditRecDService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  load() {
    this.auditRecDSerivce.getListRecDs(this.pagination.currentPage, this.pagination.totalPages).subscribe((res) => {
      this.auditRecDs = res.result;
      this.pagination = res.pagination;
    });
  }

  pageChange(event: any): void {
    this.pagination.currentPage = event.page;
    this.load();
  }
  update(auditRecD: AuditRecD): void {
    this.auditRecDSerivce.changeFlag("1");
    this.auditRecDSerivce.changeAuditRecD(auditRecD);
    this.router.navigate(["/maintenance/audit-rec/update-audit-redD"]);
  }
  add() {
    var auditRecD: any = {
      status: '',
      finished_Date: '',
      record_ID: '',
      ercs: '',
      audit_Type_ID: '',
      audit_Item: '',
      pD_PIC: '',
      pD_RESP: '',
      issue_LL: '',
      issue_EN: '',
      issue_ZW: '',
      remake: '',
      before_Picture: '',
      after_Picture: '',
    };
    this.auditRecDSerivce.changeFlag("0");
    this.auditRecDSerivce.changeAuditRecD(auditRecD);
    this.router.navigate(["/maintenance/audit-rec/add-audit-recD"]);
  }
  back() {
    this.router.navigate(["/maintenance/audit-rec"]);
  }
  chkImage(uploadPicture) {
    if (uploadPicture != null && uploadPicture !== '') {
      if (uploadPicture.split(".").pop() == "mp4" || uploadPicture.splip(".").pop() == "MP4") {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  openImage(image) {
    if (image != null) {
      window.open(this.url + image, '_blank');
    }
  }
}
