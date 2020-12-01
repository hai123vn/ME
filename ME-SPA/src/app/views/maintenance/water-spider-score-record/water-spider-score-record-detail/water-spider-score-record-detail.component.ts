import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { AuditRateDDetail, ScoreRecordDetail } from '../../../../_core/_model/score-record-detail';
import { AuditRateM } from '../../../../_core/_model/score-record-question';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditPicDService } from '../../../../_core/_service/audit-pic-d.service';
import { WaterSpidetScoreRecordService } from '../../../../_core/_service/water-spidet-score-record.service';

@Component({
  selector: 'app-water-spider-score-record-detail',
  templateUrl: './water-spider-score-record-detail.component.html',
  styleUrls: ['./water-spider-score-record-detail.component.scss']
})
export class WaterSpiderScoreRecordDetailComponent implements OnInit {
  urlNoImage: string = environment.imageUrl + 'no-image.jpg';
  url: any = environment.imageUrl;
  recordId: string = '';
  auditRateM: AuditRateM = {
    audit_Type1: '',
    audit_Type2: '',
    audit_Type_ID: '',
    building: '',
    halting_Production: false,
    line: '',
    line_ID_2_Name: '',
    mE_PIC: '',
    model_Name: '',
    model_No: '',
    pD_RESP: '',
    pdc: '',
    record_Date: null,
    record_ID: '',
    updated_By: '',
    updated_Time: '',
  };
  listAuditRateD: AuditRateDDetail[] = [];
  pdResp: string = '';
  mePic: string = '';
  building: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private waterSpiderService: WaterSpidetScoreRecordService,
    private auditPicDService: AuditPicDService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.recordId = param['recordId'];
    });
    this.loadData();
  }

  onSelectFile(event, auditItemId) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const title = event.target.files[0].name.split('.').pop();
      const fileSize = event.target.files[0].size;
      const file = event.target.files[0];
      //kiem tra duoi file
      if (title === 'jpg' || title === 'jpeg' || title === 'png' || title === 'JPG' || title === 'JPEG' || title === 'PNG' || title === 'PNG') {
        if (fileSize < 20971520) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('recordId', this.recordId);
          formData.append('auditItemId', auditItemId);
          this.waterSpiderService.uploadPicture(formData).subscribe(() => {
            this.loadData();
            this.alertifyService.success('Upload image of ' + auditItemId + 'successfully');
          }, error => {
            this.alertifyService.error('Upload image of' + auditItemId + 'failed');
          });
          this.loadData();
        } else {
          this.alertifyService.error('Images cannot be larget than 20MB');
        }
      } else if (title === 'mp4' || title === 'MP4') {
        if (fileSize < 20971520) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('recordId', this.recordId);
          formData.append('auditItemId', auditItemId);
          this.waterSpiderService.uploadPicture(formData).subscribe(() => {
            this.loadData();
            this.alertifyService.success('Upload video of' + auditItemId + 'success');
          }, error => {
            this.alertifyService.error('Upload video of' + auditItemId + 'failed');
          });
        } else {
          this.alertifyService.error('Video cannot be larget than 20MB');
        }
      } else {
        this.alertifyService.error('Incorrect format');
      }
    }
  }

  chkImage(uploadPicture) {
    if (uploadPicture != null) {
      if (uploadPicture.split('.').pop() === 'mp4' || uploadPicture.split('.').pop() === 'MP4') {
        return false;
      } else {
        true;
      }
    } else {
      return true;
    }
  }

  loadData() {
    this.waterSpiderService.getDetailScoreRecord(this.recordId).subscribe(res => {
      this.auditRateM = res.auditRateM;
      this.listAuditRateD = res.listAuditRateD;
      this.getMEPIC(this.auditRateM.mE_PIC);
      this.getPDRESP(this.auditRateM.pD_RESP);
      this.getBuilding(this.auditRateM.building);
    });
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

  getPDRESP(pd_RESP) {
    this.auditPicDService.getPdPicByID(pd_RESP).subscribe(res => {
      this.pdResp = res.dataResult;
    });
  }
  back() {
    this.router.navigate(["/maintenance/water-spider-score-record"]);
  }

  exportExcel() {
    this.waterSpiderService.exportExcelDetail(this.recordId);
  }
  print() {
    window.print();
  }
  edit() {
    const questionEditWaterSpider = this.listAuditRateD.filter(item => {
      return item.ratingNA === 0 && item.rating0 === 0 && item.rating1 === 0 && item.rating2 === 0;
    }).map(itemQues => {
      return {
        recordId: this.recordId,
        audit_Item_ID: itemQues.auditItemId,
        question: itemQues.auditItemLL,
        questionEN: itemQues.auditItemEN,
        questionLL: itemQues.auditItemLL,
        questionZW: itemQues.auditItemZW
      };
    });
    this.waterSpiderService.changeQuestionEditWaterSpider(questionEditWaterSpider);
    this.router.navigate(['/maintenance/water-spider-score-record/' + this.recordId]);
  }
}
