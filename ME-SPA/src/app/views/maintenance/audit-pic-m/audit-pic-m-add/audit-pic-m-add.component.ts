import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditPicMService } from '../../../../_core/_service/audit-pic-m.service';

@Component({
  selector: 'app-audit-pic-m-add',
  templateUrl: './audit-pic-m-add.component.html',
  styleUrls: ['./audit-pic-m-add.component.scss']
})
export class AuditPicMAddComponent implements OnInit {
  auditPicM: any = {};
  flag = '100';
  constructor(private http: HttpClient,
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

  save() {
    if (this.flag === '0') {
      console.log(this.auditPicM);
      this.auditPicMService.create(this.auditPicM).subscribe(() => {
        this.alertify.success('Add success');
        this.router.navigate(['/maintenance/audit-pic-m']);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  cancel() {
    this.auditPicM = {};
  }
}
