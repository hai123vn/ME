import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditPicMService } from '../../../../_core/_service/audit-pic-m.service';

@Component({
  selector: 'app-audit-pic-m-update',
  templateUrl: './audit-pic-m-update.component.html',
  styleUrls: ['./audit-pic-m-update.component.scss']
})
export class AuditPicMUpdateComponent implements OnInit {
  auditPicM: any = {};
  flag = '100';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private auditPicMService: AuditPicMService
  ) { }

  ngOnInit() {
    this.auditPicMService.currentAuditPicM.subscribe(auditPicM => this.auditPicM = auditPicM);
    this.auditPicMService.currentFlag.subscribe(flag => this.flag = flag);
  }

  blacklist() {
    this.router.navigate(['/maintenance/audit-pic-m']);
  }

  update() {
    this.auditPicMService.update(this.auditPicM).subscribe(() => {
      this.alertify.success("Updated success !");
      this.router.navigate(['/maintenance/audit-pic-m']);
    }, error => {
      this.alertify.error("Updated failed !!!!");
    });
  }

  cancel() {
    this.auditPicM = {};
  }
}
