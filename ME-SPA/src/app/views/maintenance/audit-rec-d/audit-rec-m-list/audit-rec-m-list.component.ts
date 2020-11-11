import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditRecM } from '../../../../_core/_model/audit-rec-m';
import { Pagination } from '../../../../_core/_model/pagination';
import { AuditRecMService } from '../../../../_core/_service/audit-rec-m.service';

@Component({
  selector: 'app-audit-rec-m-list',
  templateUrl: './audit-rec-m-list.component.html',
  styleUrls: ['./audit-rec-m-list.component.scss']
})
export class AuditRecMListComponent implements OnInit {
  auditRecMs: AuditRecM[];
  pagination: Pagination;
  constructor(
    private auditRecMService: AuditRecMService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  load() {
    this.auditRecMService.getListAll(this.pagination.currentPage, this.pagination.totalPages).subscribe((res) => {
      this.auditRecMs = res.result;
      this.pagination = res.pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.load();
  }

  add() {
    var AuditRecM: any = [];
    this.auditRecMService.changeAuditRecM(AuditRecM);
    this.auditRecMService.changeFlag('0');
    this.router.navigate(['/maintenance/audit-rec/add-audit-recM']);
  }

  update(auditRecM: AuditRecM) {
    this.auditRecMService.changeFlag('1');
    this.auditRecMService.changeAuditRecM(auditRecM);
    this.router.navigate(['/maintenance/audit-rec/update-audit-recM']);
  }
  back(){
    this.router.navigate(['/maintenance/audit-rec']);
  }
} 
