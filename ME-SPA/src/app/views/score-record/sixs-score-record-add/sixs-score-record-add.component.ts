import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { Select2Option } from 'ng-select2-component';
import { element } from 'protractor';
import { audit } from 'rxjs/operators';
import { AuditRateM, AuditRateModel, ScoreRecordQuestion } from '../../../_core/_model/score-record-question';
import { AlertifyService } from '../../../_core/_service/alertify.service';
import { AuditPicDService } from '../../../_core/_service/audit-pic-d.service';
import { MesMoService } from '../../../_core/_service/mes-mo.service';
import { MesOrgService } from '../../../_core/_service/mes-org.service';
import { ScoreRecordService } from '../../../_core/_service/score-record.service';
import { FunctionUtility } from '../../../_utility/function-utility';

@Component({
  selector: 'app-sixs-score-record-add',
  templateUrl: './sixs-score-record-add.component.html',
  styleUrls: ['./sixs-score-record-add.component.scss']
})
export class SixsScoreRecordAddComponent implements OnInit {
  questions: ScoreRecordQuestion[] = [];
  user: any = JSON.parse(localStorage.getItem('user'));
  lang: string = "EN";
  today: Date = new Date();
  recordDate: Date = new Date();
  pdcs: Array<Select2OptionData>;
  buildings: Array<Select2OptionData>;
  lineIDs: Array<Select2OptionData>;
  auditTypes: Array<Select2OptionData>;
  pdc: string;
  building: string;
  lineID: string;
  auditTypeID: string;
  MEPIC: string;
  MEPICS: Array<Select2OptionData>;
  PDRESP: string = "";
  PDRESPS: Array<Select2OptionData>;
  isChecked: any = false;
  isDisable: any = false;
  isCheckDisable: any = true;
  brands: Array<Select2OptionData>;
  brand: string;
  modelNos: Array<Select2OptionData>;
  modelNo: string;
  modelName: string;
  constructor(
    private router: Router,
    private mesOrgService: MesOrgService,
    private scoreService: ScoreRecordService,
    private alertifyService: AlertifyService,
    private functionUtility: FunctionUtility,
    private auditPicDService: AuditPicDService,
    private mesMoService: MesMoService
  ) { }


  ngOnInit() {
    this.getAllPdc();
    this.getMEPIC();
    this.getPDRESP();
    this.getBrand();
    this.getModelNo();
    this.checkHalting();
  }


  getAllPdc() {
    this.mesOrgService.getAllPdc().subscribe(res => {
      this.pdcs = res.map(item => {
        return { id: item.id, text: item.name };
      });
      this.pdc = this.pdcs[0].id;
      this.getAllBuilding();
    });
  }

  getAllBuilding() {
    this.mesOrgService.getAllBuilding(this.pdc).subscribe(res => {
      this.buildings = res.map(item => {
        return { id: item.id, text: item.name };
      });
      this.building = this.buildings[0].id;
      this.getAllLineId();
    });
  }

  getAllLineId() {
    this.mesOrgService.getAllLineId(this.pdc, this.building).subscribe(res => {
      this.lineIDs = res.map(item => {
        return { id: item.id, text: item.name };
      });
      this.lineID = this.lineIDs[0].id;
    });
  }
  getMEPIC() {
    this.auditPicDService.getAllMePic().subscribe(res => {
      this.MEPICS = res.map(item => {
        return { id: item.id, text: item.name };
      });
      this.MEPIC = this.MEPICS[0].id;
      this.getLanguage();
    });
  }
  getPDRESP() {
    this.auditPicDService.getAllPdPic().subscribe(res => {
      this.PDRESPS = res.map(item => {
        return { id: item.id, text: item.name };
      });
      this.PDRESP = this.PDRESPS[0].id;
    });
  }
  back() {
    this.router.navigate(["maintenance/6s-score-record"]);
  }

  getBrand() {
    this.scoreService.getBrandBySixs().subscribe(res => {
      this.brands = res.map(item => {
        return { id: item, text: item };
      });
      this.brand = res[0];
    });
  }

  getAuditType() {
    this.scoreService.getAuditTypeByBrandBySixs(this.brand).subscribe(res => {
      this.auditTypes = res.map(item => {
        return { id: item.audit_Type_ID, text: item.audit_Type1 + '-' + item.audit_Type2 };
      });
      this.auditTypes.unshift({ id: 'all', text: 'Select AuditItem' });
      this.auditTypeID = this.auditTypes[0].id;
    });
  }

  getModelNo() {
    this.mesMoService.getModelNo().subscribe(res => {
      this.modelNos = res.map(item => {
        return { id: item, text: item };
      });
      this.modelNo = this.modelNos[0].id;
    })
  }

  changeModelNo() {
    this.mesMoService.getModelName(this.modelNo).subscribe((res) => {
      this.modelName = res.dataResult;
    });
  }

  loadQuestion() {
    this.isChecked = false;
    this.scoreService.getQuestion(this.auditTypeID).subscribe(res => {
      this.questions = res;
      this.checkHalting();
    });
  }

  checkChange(item: ScoreRecordQuestion, number) {
    if (number === 0) {
      item.rating_0 === 1;
      item.rating_1 === 0;
      item.rating_2 === 0;
      item.rate_Na === 0;
      item.remark === null;
    }
    if (number === 1) {
      item.rating_0 === 0;
      item.rating_1 === 1;
      item.rating_2 === 0;
      item.rate_Na === 0;
      item.remark === null;
    }
    if (number === 2) {
      item.rating_0 === 0;
      item.rating_1 === 0;
      item.rating_2 === 1;
      item.rate_Na === 0;
      item.remark === null;
    }
    if (number === 3) {
      item.rating_0 === 0;
      item.rating_1 === 0;
      item.rating_2 === 0;
      item.rate_Na === 1;
      item.remark === null;
    }
  }

  saveAll(check) {
    if (this.auditTypeID == "") {
      this.alertifyService.error("Please option auditType");
    } else {
      let auditRateM = new AuditRateM();
      auditRateM.pdc = this.pdc;
      auditRateM.building = this.building;
      auditRateM.line = this.lineID;
      auditRateM.audit_Type_ID = this.auditTypeID;
      auditRateM.audit_Type_ID = this.auditTypeID;
      auditRateM.updated_By = this.user.user.id;
      auditRateM.mE_PIC = this.MEPIC;
      auditRateM.pD_RESP = this.PDRESP;
      auditRateM.model_No = this.modelNo;
      auditRateM.model_Name = this.modelName;
      auditRateM.record_Date = this.functionUtility.returnDayNotTime(this.recordDate);
      auditRateM.halting_Production = this.isChecked;
      let param = new AuditRateModel();
      param.listAuditRateD = this.questions;
      param.auditRateM = auditRateM;


      //Kiem tra phai tra loi het cac cau hoi moi duoc luu
      for (let index = 0; index < this.questions.length; index++) {
        if (this.questions[index].rate_Na === undefined) {
          this.alertifyService.error("Please answer all the questions");
          return;
        }
      }
      this.scoreService.saveScoreRecord(param).subscribe(() => {
        if (check != 2) {
          this.questions = [];
          this.isCheckDisable = true;
          this.isDisable = false;
          this.isChecked = false;
        } else {
          this.router.navigate(["maintenance/6s-score-record"]);
        }
        this.alertifyService.success("success");
      }, error => {
        this.alertifyService.error(error);
      });
    }
  }

  auditTypeChange() {
    this.loadQuestion();
  }

  pdcChange() {
    this.getAllBuilding();
  }

  buingChange() {
    this.getAllLineId();
  }
  brandChange() {
    this.getAuditType();
  }

  cancel() {
    this.loadQuestion();
  }
  changeLanguage(event) {
    this.lang = event;
    this.loadQuestion();
    this.isCheckDisable = true;
    this.isDisable = false;
    this.isChecked = false;
  }

  getLanguage() {
    this.scoreService.getLanguage(this.MEPIC).subscribe(res => {
      if (
        res[0].langugage != "" &&
        res[0].langugage != null &&
        res[0].language != undefined &&
        (res[0].language == "LL" ||
          res[0].language == "EN" ||
          res[0].language == "ZW")
      ) {
        this.lang = res[0].language;
        this.changeLanguage(this.lang);
      } else {
        this.lang = "EN";
        this.changeLanguage(this.lang);
      }
    });
  }

  mepicChange() {
    this.getLanguage();
  }

  haltingProduction() {
    //Chon Halting Production
    if (this.isChecked == true) {
      this.questions.forEach((item, index) => {
        let ele = document.getElementById(index.toString()) as HTMLInputElement;
        ele.checked = true;
        item.rating_0 = 0;
        item.rating_1 = 0;
        item.rating_2 = 0;
        item.rate_Na = 1;
        item.remark = null;
      });
      this.isDisable = true;
    } else {
      this.isDisable = false;
    }
  }
  checkHalting() {
    if (this.questions.length == 0) {
      this.isCheckDisable = true;
      return;
    }
    this.isCheckDisable = false;
  }

  openOutlook() {
    this.scoreService.getListMail(this.lineID).subscribe(res => {
      let listMail = res;
      let stringListMail = '';
      listMail.foreach(element => {
        stringListMail = stringListMail + element.toString() + ';';
      });
      let record_Date = '';
      record_Date = new Date(this.recordDate).toLocaleDateString("en-US");
      let mailTo = stringListMail;
      let subject = '6S Audit Result_' + record_Date + ',' + this.pdc + ',' + this.building + ',' + this.lineID
      let body = `Hi All %0AThis is audit result, please check it, thank you. %0ALink :`;
      const mail = `mailTo:${mailTo}&subject=${subject}&body=${body}`;
      window.location.href = mail;
    });
  }
}
