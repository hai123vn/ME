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
    private auditTypeDService: AuditTypeDService,
    private router: Router,
    private alertify: AlertifyService,
    private auditTypeService: AuditTypeService,
  ) { }

  ngOnInit() {
    this.getAllAuditTypeM();
    debugger
    this.auditTypeDService.currentAuditTypeD.subscribe(auditType =>  {
      debugger
      this.auditType = auditType;
      this.url = this.url + auditType.movie_Name;
    });
    this.auditTypeDService.currentFlag.subscribe(flag => this.flag = flag);
  }


  update() {
    debugger
    const formData = new FormData();
    formData.append("filevideo", this.filevideo);
    formData.append("audit_Type_ID", this.auditType.audit_Type_ID);
    formData.append("audit_Item_ID", this.auditType.audit_Item_ID);
    formData.append("audit_Type3_ZW", this.auditType.audit_Type3_ZW == undefined ? "" : this.auditType.audit_Type3_ZW);
    formData.append("audit_Type3_EN", this.auditType.audit_Type3_EN == undefined ? "" : this.auditType.audit_Type3_EN);
    formData.append("audit_Type3_LL", this.auditType.audit_Type3_LL == undefined ? "" : this.auditType.audit_Type3_LL);
    formData.append("audit_Item_EN", this.auditType.audit_Item_EN == undefined ? "" : this.auditType.audit_Item_EN);
    formData.append("audit_Item_LL", this.auditType.audit_Item_LL == undefined ? "" : this.auditType.audit_Item_LL);
    formData.append("audit_Item_ZW", this.auditType.audit_Item_ZW == undefined ? "" : this.auditType.audit_Item_ZW);
    formData.append("rating_0", this.auditType.rating_0);
    formData.append("rating_1", this.auditType.rating_1);
    formData.append("rating_2", this.auditType.rating_2);
    formData.append("updated_By", this.auditType.updated_By);
    formData.append("movie_name", this.auditType.movie_name == null ? "" : this.auditType.movie_name);
    this.auditTypeDService.update(formData).subscribe(() => {
      this.alertify.success('Updated Success');
      this.router.navigate(["/maintenance/audit-type-d"]);
    }, error => {
      this.alertify.error(error);
    });
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      var file = event.target.files[0];
      debugger
      var title = file.name.split(".").pop();
      var filesize = file.size;
      if (filesize > 262144000) {
        this.alertify.error("video cannot be larger than 250MB");
      }
      if (title == "mp4" || title == "MP4") {
        reader.onload = event => {
          this.hideVideo = false;
          this.auditType.movie_name = "";
          this.url = event.target.result;
          debugger
          this.filevideo = file;
        };
        debugger
        this.filevideo = file;
      }
      else {
        this.alertify.error("Please choise MP4 file");
      }
    }
  }

  backlist() {
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

