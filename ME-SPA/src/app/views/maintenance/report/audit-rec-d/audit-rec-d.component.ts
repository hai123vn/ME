import { Component, OnInit, ViewChild } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { environment } from '../../../../../environments/environment';
import { AuditRecViewModel } from '../../../../_core/_model/audit-rec-viewmodel';
import { Pagination, PaginationResult } from '../../../../_core/_model/pagination';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditRecMService } from '../../../../_core/_service/audit-rec-m.service';
import { AuditRecReportService } from '../../../../_core/_service/audit-rec-report.service';
import { AuditTypeService } from '../../../../_core/_service/audit-type.service';
import { MesOrgService } from '../../../../_core/_service/mes-org.service';
import { FunctionUtility } from '../../../../_utility/function-utility';

@Component({
  selector: 'app-audit-rec-d',
  templateUrl: './audit-rec-d.component.html',
  styleUrls: ['./audit-rec-d.component.scss']
})
export class AuditRecDComponent implements OnInit {
  urlImage = environment.imageUrl;
  url: any = environment.imageUrl;
  auditRecs: AuditRecViewModel[];
  user: any = JSON.parse(localStorage.getItem("user"));
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1
  };
  text: string;
  searchKey = false;
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
  pdc: string = "all";
  status: string = "all";
  model_Name: string = "all";
  model_No: string = "all";
  auditType1: string = "all";
  auditType2: string = "";
  timeStart = "";
  timeEnd = "";
  fromTime = "";
  toTime = "";
  file_excel: File = null;
  @ViewChild("fileInput", { static: true }) fileInput;
  constructor(
    private auditRecDService: AuditRecReportService,
    private auditRecMService: AuditRecMService,
    private auditTypeMService: AuditTypeService,
    private alertifyService: AlertifyService,
    private functionUtility: FunctionUtility,
    private mesOrgService: MesOrgService
  ) { }

  ngOnInit() {
    this.getListPDCs();
    this.getListStatus();
    this.getListModelNo();
    this.getAllAuditType1();
    this.load();
  }

  load() {
    this.checkTime();
    let object = {
      pdc: this.pdc === 'all' ? '' : this.pdc,
      status: this.status === 'all' ? '' : this.status,
      building: this.building === 'all' ? '' : this.building,
      line: this.line === 'all' ? '' : this.line,
      model_Name: this.model_Name === 'all' ? '' : this.model_Name,
      model_No: this.model_No === 'all' ? '' : this.model_No,
      audit_Type_1: this.auditType1 === 'all' ? '' : this.auditType1,
      audit_Type_2: this.auditType2,
      from_Date: this.timeStart,
      to_Date: this.timeEnd,
    };
    this.auditRecDService.search(this.pagination.currentPage, this.pagination.itemsPerPage, object).subscribe((res: PaginationResult<AuditRecViewModel[]>) => {
      this.auditRecs = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertifyService.error(error);
    })
  }

  search() {
    this.checkTime();
    this.pagination.currentPage = 1;
    this.load();
  }
  exportExcel() {
    this.checkTime();
    if (this.line === 'all' || this.line === null || this.line === undefined) {
      this.alertifyService.error("Please option line !!");
    } else {
      let object = {
        pdc: this.pdc === "all" ? '' : this.pdc,
        status: this.status === "all" ? '' : this.status,
        building: this.building === "all" ? '' : this.building,
        line: this.line === "all" ? '' : this.line,
        model_No: this.model_No === "all" ? '' : this.model_No,
        model_Name: this.model_Name,
        audit_Type_1: this.auditType1 === "all" ? '' : this.auditType1,
        audit_Type_2: this.auditType2,
        from_Date: this.timeStart,
        to_Date: this.timeEnd
      };
      this.auditRecDService.exportExcelDetail(object);
    }
  }
  exportExcelWT() {
    this.checkTime();
    if (this.timeEnd === "" || this.timeStart === "") {
      this.alertifyService.error("Please option Date !!!");
      return;
    }
    if (this.timeStart > this.timeEnd || this.timeStart < this.timeEnd) {
      this.alertifyService.error("Please option in a Date !!!");
      return;
    }
    if (this.pdc === 'all' || this.pdc === null || this.pdc === undefined) {
      this.alertifyService.error("Please option PDC !!!");
      return;
    }
    if (this.building === 'all' || this.building === null || this.building === undefined) {
      this.alertifyService.error("Please option Building !!! ")
      return;
    }
    if (this.line === 'all' || this.line === null || this.line === undefined) {
      this.alertifyService.error("Please option line !!!");
      return;
    }
    if (this.model_No === 'all' || this.model_No === null || this.model_No === undefined) {
      this.alertifyService.error("Please option Model No !!!");
      return;
    }
    let object = {
      pdc: this.pdc,
      status: this.status === "all" ? '' : this.status,
      building: this.building === "all" ? '' : this.building,
      line: this.line,
      model_Name: this.model_Name,
      model_No: this.model_No,
      audit_Type_1: this.auditType1 === "all" ? '' : this.auditType1,
      audit_Type_2: this.auditType2,
      from_Date: this.timeStart,
      to_Date: this.timeEnd,
    };
    this.auditRecDService.exportWTTracking(object);
  }
  getListStatus() {
    this.auditRecDService.getListStatus().subscribe((res) => {
      this.statusList = res.map(item => {
        return { id: item, text: item };
      });
      this.statusList.unshift({ id: "all", text: "All" });
    });
  }
  getListModelNo() {
    this.auditRecMService.getListModelNo().subscribe((res) => {
      this.modelNos = res.map(item => {
        return { id: item, text: item };
      });
      this.modelNos.unshift({ id: "all", text: "All" });
    })
  }

  getAllAuditType1() {
    this.auditTypeMService.getAllAuditType1().subscribe(res => {
      this.auditType1List = res.map(item => {
        return { id: item, text: item };
      });
      this.auditType1List.unshift({ id: "all", text: "All" });
    });
  }

  getListPDCs() {
    this.mesOrgService.getAllPdc().subscribe((res) => {
      this.pdcList = res.map(item => {
        return { id: item.id, text: item.name };
      });
      this.pdcList.unshift({ id: "all", text: "All" });
      this.getListBuilding();
    });
  }
  getListBuilding() {
    const pdc = this.pdc === "all" ? '' : this.pdc;
    this.mesOrgService.getAllBuilding(pdc).subscribe(res => {
      this.buildings = res.map(item => {
        return { id: item.id, text: item.name };
      });
      this.buildings.unshift({ id: "all", text: "all" });
      this.getListLine();
    });
  }

  getListLine() {
    const pdc = this.pdc === "all" ? '' : this.pdc;
    const building = this.building === "all" ? '' : this.building;
    this.mesOrgService.getAllLineId(pdc, building).subscribe(res => {
      this.lines = res.map(item => {
        return { id: item.id, text: item.name };
      });
      this.lines.unshift({ id: "all", text: "All" });
    });
  }
  optionAuditType1(e) {
    this.auditType1 = e;
    const object = {
      audit_type_1: this.auditType1,
    };
    if (this.auditType1 === "all") {
      this.auditType2List = [];
      this.auditType2 = '';
    } else {
      this.auditTypeMService.getAuditsByAuditType1(object).subscribe(res => {
        this.auditType2List = res.map((item) => {
          return { id: item.audit_Type2, text: item.audit_Type2 };
        });
        this.auditType2 = this.auditType2List[0].id;
      });
    }
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.load();
  }
  OnDateChange(event): void {
    let getDate = event.value._i;
    this.reportDate = getDate.year + "/" + getDate.month + "/" + getDate.date;
  }
  pdcChange() {
    this.getListBuilding();
  }
  buingdingChange() {
    this.getListLine();
  }
  checkTime() {
    if (this.timeEnd === "" ||
      this.timeStart === "" ||
      this.timeStart === null ||
      this.timeEnd === null ||
      new Date(this.timeStart).getTime() > new Date(this.timeEnd).getTime()) {
      this.timeEnd == "";
      this.timeStart == "";
    } else {
      this.timeStart = this.functionUtility.getDateFormat(new Date(this.timeStart));
      this.timeEnd = this.functionUtility.getDateFormat(new Date(this.timeEnd));
    }
  }

  chkImage(uploadPicture) {
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
  openOutlook() {

  }
  openImage(image) {
    if (image != null) {
      window.open(this.url + image + '_blank');
    }
  }
}
