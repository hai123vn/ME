import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { element } from 'protractor';
import * as _ from "lodash";
import { environment } from '../../../../../environments/environment';
import { AuditRecViewModel } from '../../../../_core/_model/audit-rec-viewmodel';
import { Pagination, PaginationResult } from '../../../../_core/_model/pagination';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditRecDService } from '../../../../_core/_service/audit-rec-d.service';
import { AuditRecMService } from '../../../../_core/_service/audit-rec-m.service';
import { AuditTypeService } from '../../../../_core/_service/audit-type.service';
import { MesOrgService } from '../../../../_core/_service/mes-org.service';
import { FunctionUtility } from '../../../../_utility/function-utility';

@Component({
  selector: 'app-audit-rec-list',
  templateUrl: './audit-rec-list.component.html',
  styleUrls: ['./audit-rec-list.component.scss']
})
export class AuditRecListComponent implements OnInit {
  urlImage = environment.imageUrl + "no-image.jpg";
  url: any = environment.imageUrl;
  auditRecs: AuditRecViewModel[];
  user: any = JSON.parse(localStorage.getItem("user"));
  pagination: Pagination;
  text: string;
  reportDate: any;
  statusList: Array<Select2OptionData>;
  buildings: Array<Select2OptionData>;
  lines: Array<Select2OptionData>;
  modelNos: Array<Select2OptionData>;
  pdcList: Array<Select2OptionData>;
  auditType1List: Array<Select2OptionData>;
  auditType2List: Array<Select2OptionData>;
  building: string = "all";
  line: string = "all";
  status: string = "all";
  model_Name: string = "";
  model_No = "all";
  pdc: string = "all";
  auditType1 = "all";
  auditType2: string = "";
  time_start: string = "";
  time_end: string = "";
  timeStart: string = "";
  timeEnd: string = "";
  file_excel: File = null;
  isSearch = false;
  isSendMail = false;
  @ViewChild("fileInput", { static: true }) fileInput;
  constructor(
    private auditRecMService: AuditRecMService,
    private auditRecDService: AuditRecDService,
    private auditTypeM: AuditTypeService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
    private functionUtility: FunctionUtility,
    private mesOrgService: MesOrgService,
  ) { }

  ngOnInit() {
    this.getListStatus();
    this.getListPDCs();
    this.getAllAuditType1();
    this.getListModelNo();
    this.route.data.subscribe((data) => {
      this.auditRecs = data["auditRecs"].result;
      this.auditRecs.map((item) => {
        item.issue_EN = _.truncate(item.issue_EN, { length: 80 });
        item.issue_LL = _.truncate(item.issue_LL, { length: 80 });
        item.issue_ZW = _.truncate(item.issue_ZW, { length: 80 });
        return item;
      });
      this.pagination = data["auditRecs"].pagination;
      this.load();
    })
  }


  load() {
    this.checkTime();
    let object = {
      pdc: this.pdc === 'all' ? '' : this.pdc,
      status: this.status === 'all' ? '' : this.pdc,
      building: this.building === 'all' ? '' : this.building,
      line: this.line === 'all' ? '' : this.line,
      model_Name: this.model_Name,
      model_No: this.model_No === 'all' ? '' : this.model_No,
      audit_Type_1: this.auditType1 === 'all' ? '' : this.auditType1,
      audit_Type_2: this.auditType2,
      from_Date: this.timeStart,
      to_Date: this.timeEnd,
    };
    this.isSearch = true;
    this.auditRecDService.search(this.pagination.currentPage, this.pagination.totalPages, object).subscribe((res: PaginationResult<AuditRecViewModel[]>) => {
      console.log(res);
      this.auditRecs = res.result,
        this.pagination = res.pagination
    }, error => {
      this.alertify.error("🚫🚫🚫");
    });
  }

  checkTime() {
    if (
      this.time_end === "" ||
      this.time_start === "" ||
      this.time_start === null ||
      this.time_end === null ||
      new Date(this.time_start).getTime() > new Date(this.time_end).getTime()
    ) {
      this.timeEnd = "";
      this.timeStart = "";
    } else {
      this.timeStart = this.functionUtility.getDateFormat(new Date(this.time_start));
      this.timeEnd = this.functionUtility.getDateFormat(new Date(this.time_end));
    }
  }

  search() {
    this.checkTime();
    this.pagination.currentPage = 1;
    this.load();
  }

  exportExcel() {
    this.checkTime();
    let object = {
      pdc: this.pdc === 'all' ? '' : this.pdc,
      status: this.status === 'all' ? '' : this.status,
      building: this.building === 'all' ? '' : this.building,
      line: this.line === 'all' ? '' : this.line,
      model_Name: this.model_Name,
      model_No: this.model_No === 'all' ? '' : this.model_No,
      audit_Type_1: this.auditType1 === 'all' ? '' : this.auditType1,
      audit_Type_2: this.auditType2,
      from_Date: this.timeStart,
      to_Date: this.timeEnd,
    };
    this.auditRecDService.getSearchExcel(object);
  }

  exportExcelDetail() {
    this.checkTime();
    if (this.line === 'all' || this.line === null || this.line === undefined) {
      this.alertify.error("Please option line 📛📛📛");
    } else {
      let object = {
        pdc: this.pdc === 'all' ? '' : this.pdc,
        status: this.status === 'all' ? '' : this.status,
        building: this.building === 'all' ? '' : this.building,
        line: this.line === 'all' ? '' : this.line,
        model_Name: this.model_Name,
        model_No: this.model_No === 'all' ? '' : this.model_No,
        audit_Type_1: this.auditType1 === 'all' ? '' : this.auditType1,
        audit_Type_2: this.auditType2,
        from_Date: this.timeStart,
        to_Date: this.timeEnd
      }
      this.auditRecDService.exportExcelDetail(object);
    }
  }

  exportExcelWT() {
    this.checkTime();
    if (this.timeEnd == "" || this.timeStart == "") {
      this.alertify.error("Please option Date ___*( ￣皿￣)/#____");
      return;
    }
    if (this.time_start > this.time_end || this.time_end > this.time_start) {
      this.alertify.error("Please option in a Date ___*( ￣皿￣)/#____");
      return;
    }
    if (this.pdc === 'all' || this.pdc === null || this.pdc === undefined) {
      this.alertify.error("Please option Department ___*( ￣皿￣)/#____");
      return;
    }
    if (this.building === 'all' || this.building === null || this.building === undefined) {
      this.alertify.error("Please option Building ___*( ￣皿￣)/#____");
      return;
    }
    if (this.line === 'all' || this.line === null || this.line === undefined) {
      this.alertify.error("Please option Line ___*( ￣皿￣)/#____");
      return;
    }
    if (this.model_No === 'all' || this.model_No === null || this.model_No === undefined) {
      this.alertify.error("Please option Model No ___*( ￣皿￣)/#____");
      return;
    }
    let object = {
      pdc: this.pdc,
      status: this.status === 'all' ? '' : this.status,
      building: this.building,
      line: this.line,
      model_Name: this.model_Name,
      model_No: this.model_No,
      audit_Type_1: this.auditType1 === 'all' ? '' : this.auditType1,
      audit_Type_2: this.auditType2,
      from_Date: this.timeStart,
      to_Date: this.timeEnd,
    };
    this.auditRecDService.exportWTTracking(object);
  }

  getListStatus() {
    this.auditRecDService.getListStatus().subscribe((res) => {
      this.statusList = res.map((item) => {
        return { id: item, text: item };
      });
      this.statusList.unshift({ id: "all", text: "All" });
    });
  }

  getListModelNo() {
    this.auditRecMService.getListModelNo().subscribe((res) => {
      this.modelNos = res.map((item) => {
        return { id: item, text: item };
      });
      this.modelNos.unshift({ id: "all", text: "All" });
    });
  }

  getAllAuditType1() {
    this.auditTypeM.getAllAuditType1().subscribe((res) => {
      this.auditType1List = res.map((item) => {
        return { id: item, text: item };
      });
      this.auditType1List.unshift({ id: "all", text: "All" });
    });
  }

  getListPDCs() {
    this.mesOrgService.getAllPdc().subscribe((res) => {
      this.pdcList = res.map((item) => {
        return { id: item, text: item };
      })
      return this.pdcList.unshift({ id: "all", text: "All" });
    })
  }

  getListBuilding() {
    const pdc = this.pdc === 'all' ? '' : this.pdc;
    this.mesOrgService.getAllBuilding(pdc).subscribe((res) => {
      this.buildings = res.map((item) => {
        return { id: item.id, text: item.name };
      });
      this.buildings.unshift({ id: "all", text: "All" });
      this.getListLine();
    })
  }

  getListLine() {
    const pdc = this.pdc === 'all' ? '' : this.pdc;
    const building = this.building === 'all' ? '' : this.building;
    this.mesOrgService.getAllLineId(pdc, building).subscribe((res) => {
      this.lines = res.map((item) => {
        return { id: item.id, text: item.name };
      });
      this.lines.unshift({ id: "all", text: "All" });
    })
  }
  // khi click chon option selection audit type 1
  optionAuditType1(e) {
    this.auditType1 = e;
    const object = {
      audit_type_1: this.auditType1,
    };
    if (this.auditType1 === "all") {
      this.auditType2List = [];
      this.auditType2 = '';
    } else {
      this.auditTypeM.getAuditByAuditType1(object).subscribe((res) => {
        this.auditType2List = res.map((item) => {
          return { id: item.audit_Type2, text: item.audit_Type2 };
        });
        this.auditType2 = this.auditType2List[0].id;
      });
    }
  }

  addAuditRecM() {
    var auditRecM: any = [];
    this.auditRecMService.changeFlag("0");
    this.auditRecMService.changeAuditRecM(auditRecM);
    this.router.navigate(["/maintenance/audit-rec/add-audit-recM"]);
  }

  addAuditRecD() {
    const auditRecD: any = {
      status: '',
      finished_Date: '',
      record_ID: '',
      ercs: '',
      audit_Type_ID: '',
      audit_Item: '',
      pD_PIC: '',
      pD_RESP: '',
      mE_PIC: '',
      issue_LL: '',
      issue_EN: '',
      issue_ZW: '',
      remark: '',
      before_Picture: '',
      after_Picture: '',
    };
    this.auditRecDService.changeAuditRecD(auditRecD);
    this.auditRecDService.changeFlag("0");
    this.router.navigate(["/maintenance/audit-rec/add-audit-recD"]);
  }

  pageChange(event: any): void {
    this.pagination.currentPage = event.page;
    this.load();
  }

  onDateChange(event): void {
    let getDate = event.value._i;
    this.reportDate = getDate.year + "/" + getDate.month + "/" + getDate.date;
  }

  pdcChange() {
    this.getListBuilding();
  }

  buingdingChange() {
    this.getListLine();
  }

  upLoadFile() {
    if (this.file_excel === null) {
      this.alertify.error("Please select file");
      return;
    }

    const formData = new FormData();
    formData.append("files", this.fileInput.nativeElement.files[0]);
    console.log(this.user.user_Name);
    this.auditRecMService.importExcel(formData, this.user.user_Name).subscribe((res) => {
      if (res) {
        this.alertify.success("Upload file success");
      } else {
        this.alertify.error("Upload file failed");
      }
    });
  }

  openOutlook() {
    this.auditRecDService.getListMail(this.line).subscribe(res => {
      let listMail = res;
      let stringListMail = '';
      listMail.forEach(element => {
        stringListMail = stringListMail + element.toString() + ';';
      });
      let record_Date = '';
      if (this.auditRecs.length > 0) {
        let date = this.auditRecs[0].record_Time;
        record_Date = new Date(date).toLocaleDateString("en-US");
      }
      let mailTo = stringListMail;
      let subject = 'Factory Inspection Record_' + record_Date + ',' + this.pdc + ',' + this.building + ',' + this.line + ',' + this.model_No;
      let body = `Hi All %0AThis is audit result, please check it, thanks . %0ALink: `;
      const email = `mailto: ${mailTo}&subject=${subject}&body=${body}`;
      window.location.href = email;
    });
  }

  update(item, number) {
    if (number == 1) {
      this.auditRecDService.getAuditRecDById(item.record_ID, item.item_no).subscribe((res) => {
        const auditRecD: any = res;
        this.auditRecDService.changeAuditRecD(auditRecD);
        this.auditRecDService.changeFlag("1");
        this.router.navigate(["/maintenance/audit-rec/update-audit-recD"]);
      }, (error) => {
        this.alertify.error("❌❌❌❌");
      });
    }
  }

  checkImage(uploadPicture) {
    if (uploadPicture != null && uploadPicture !== '') {
      if (
        uploadPicture.split(".").pop() == "mp4" ||
        uploadPicture.split(".").pop() == "MP4"
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  openImage(image) {
    if (image != null && image != "") {
      window.open(this.url + image, '_blank');
    }
  }

  //Check xem co mail nao duoc gui khong
  ngAfterContentChecked() {
    if (this.pdc !== "all" && this.line !== "adll" && this.building !== "all" && this.model_Name !== "" && this.timeEnd != "") {
      this.isSendMail = true;
    } else {
      this.isSendMail = false;
    }
  }
}
