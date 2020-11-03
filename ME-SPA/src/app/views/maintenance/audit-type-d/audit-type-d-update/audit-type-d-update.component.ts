import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { environment } from '../../../../../environments/environment';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditTypeDService } from '../../../../_core/_service/audit-type-d.service';
import { AuditTypeService } from '../../../../_core/_service/audit-type.service';

@Component({
  selector: 'app-audit-type-d-update',
  templateUrl: './audit-type-d-update.component.html',
  styleUrls: ['./audit-type-d-update.component.scss']
})
export class AuditTypeDUpdateComponent implements OnInit {
  auditType: any = {};
  flag = '0';

  url_image: any = environment.imageUrl + "no-image.jpg";
  url: any = environment.videoUrl;
  hideVideo: boolean = false;
  filevideo: any;


  auditTypeM: Array<Select2OptionData>;
  constructor(
    private auditTypeDService : AuditTypeDService,
    private router: Router,
    private alertify: AlertifyService,
    private auditTypeService: AuditTypeService,
  ) { }

  ngOnInit() {
    this.getAllAuditTypeM();
    this.auditTypeDService.currentAuditTypeD.subscribe(auditType => this.auditType = auditType);
    this.auditTypeDService.currentFlag.subscribe(flag => this.flag = flag);
  }


  update() {
    this.auditTypeDService.update(this.auditType).subscribe(() => {
      this.router.navigate(["/maintenance/audit-type-d"]);
      this.alertify.success('Updated Success');
    }, error => {
      this.alertify.error(error);
    });
  }
  onSelectFile() {

  }

  backlist(){
    this.router.navigate(["/maintenance/audit-type-d"]);
  }

  getAllAuditTypeM() {
    this.auditTypeService.getAlls().subscribe(
      data => {
        this.auditTypeM = data.map(item => {
          return {
            id: item.audit_Type_ID,
            text: item.audit_Type1 + " - " + item.audit_Type2
          };
        });
        console.log(this.auditType.audit_Type_ID, data);
      }, error => {
        this.alertify.error(error);
      }
    );
  }
}

