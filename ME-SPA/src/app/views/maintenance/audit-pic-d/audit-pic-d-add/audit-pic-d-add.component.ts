import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditPicDService } from '../../../../_core/_service/audit-pic-d.service';

@Component({
  selector: 'app-audit-pic-d-add',
  templateUrl: './audit-pic-d-add.component.html',
  styleUrls: ['./audit-pic-d-add.component.scss']
})
export class AuditPicDAddComponent implements OnInit {
  auditPicD: any = {};
  flag = '100';

  constructor(private auditPicDService: AuditPicDService,
    private router: Router,
    private alertify: AlertifyService,
  ) { }

  ngOnInit() {
  }

  blacklist()
  {
    this.router.navigate(['maintenance/audit-pic-d']);
  }

  save()
  {
    if(this.flag === '0')
    {
      this.auditPicDService.create(this.auditPicD).subscribe(()=>{
        this.alertify.success("Add success 😁");
      })
    }
  }
}
