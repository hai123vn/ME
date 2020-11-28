import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { AuditRateDDetail } from '../../../../_core/_model/score-record-detail';
import { AuditRateM } from '../../../../_core/_model/score-record-question';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditPicDService } from '../../../../_core/_service/audit-pic-d.service';
import { ScoreRecordService } from '../../../../_core/_service/score-record.service';

@Component({
  selector: 'app-sixs-score-record-detail',
  templateUrl: './sixs-score-record-detail.component.html',
  styleUrls: ['./sixs-score-record-detail.component.scss']
})
export class SixsScoreRecordDetailComponent implements OnInit {
  urlImage = environment.imageUrl + "no-image.jpg";
  url: any = environment.imageUrl;
  recordId: string;
  auditRateM: AuditRateM = {
    record_ID: "",
    audit_Type1: "",
    audit_Type2: "",
    audit_Type_ID: "",
    building: "",
    halting_Production: false,
    line: "",
    line_ID_2_Name: "",
    mE_PIC: "",
    pD_RESP: "",
    model_Name: "",
    model_No: "",
    pdc: "",
    record_Date: null,
    updated_By: "",
    updated_Time: "",
  };
  listAuditRateD: AuditRateDDetail[] = [];
  pdResp: string = '';
  mePic: string = '';
  building: string = '';
  constructor(
    private router: Router,
    private scoreRecordService: ScoreRecordService,
    private alertifyService: AlertifyService,
    private auditPicDService: AuditPicDService
  ) { }

  ngOnInit() {
  }
  loadData() {
    // this.scoreRecordService.getDetailScoreRecord(this.recordId).subscribe(
    //   (res) => {
    //     this.auditRateM = res.auditRateM;
    //     this.listAuditRateD = res.listAuditRateD;
    //     this.g
    //   }
    // )
  }
  getMEPIC(mE_PIC) {
    this.auditPicDService.getMePicByID(mE_PIC).subscribe(res => {
      this.mePic = res.dataResult;
    });
  }
  getBuilding(building) {
    this.auditPicDService.getBuildingByID(building).subscribe(res => {
      this.building = res.dataResult;
    });
  }
  onSelectFile(event, auditItemId) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      var title = event.target.files[0].name.split(".").pop();
      var fileZise = event.target.files[0].size;
      var file = event.target.files[0];
      if (
        title == "jpg" ||
        title == "jpeg" ||
        title == "png" ||
        title == "JPG" ||
        title == "JPEG" ||
        title == "PNG"
      ) {
        if (fileZise <= 20971520) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("recordId", this.recordId);
          formData.append("auditItemId", auditItemId);
          this.scoreRecordService.uploadPicture(formData).subscribe(
            () => {
              this.alertifyService.success("Upload image of " + auditItemId + "sucessfully");
              this.loadData();
            }, error => {
              this.alertifyService.error("Upload image of" + auditItemId + "failed");
            }
          )
          this.loadData();
        } else {
          this.alertifyService.error("Images cannot be larger than 20MB");
        }
      } else if (title == "mp4" || title == "MP4") {
        if (fileZise <= 20971520) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("recordId", this.recordId);
          formData.append("auditItemId", auditItemId);
          this.scoreRecordService.uploadPicture(formData).subscribe(() => {
            this.loadData();
          });
          this.scoreRecordService.uploadPicture(formData).subscribe(
            () => {
              this.loadData();
              this.alertifyService.success("Upload video of " + auditItemId + "failed");
            }
          );
        } else {
          this.alertifyService.error("Video cannot be larger than 20MB");
        }
      } else {
        this.alertifyService.error("Incorrect format");
      }
    }
  }
  back() {
    this.router.navigate(["maintanance/6s-score-record"]);
  }

  checkImage(uploadPicture) {
    if (uploadPicture != null) {
      if (uploadPicture.split(".").pop() == "mp4" || uploadPicture.split().pop() == "MP4") {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  exportExcel() {
    this.scoreRecordService.exportExcelDetail(this.recordId);
  }

  print() {
    window.print();
  }

  edit() {
    const questionEditSixs = this.listAuditRateD.filter(item => {
      return item.ratingNA === 0 && item.rating0 === 0 && item.rating1 === 0 && item.rating2 === 0;
    }).map(itemQues => {
      return {
        recordId: this.recordId,
        audit_Item_ID: itemQues.auditItemId,
        question: itemQues.auditItemLL,
        questionEN: itemQues.auditItemEN,
        questionLL: itemQues.auditItemLL,
        questionZW: itemQues.auditItemZW
      }
    });
    this.scoreRecordService.changeQuestionEditSixs(questionEditSixs);
    this.router.navigate(['/maintenance/6s-score-record/edit/']);
  }
}
