import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { threadId } from 'worker_threads';
import { AuditRateSme } from '../../../../_core/_model/audit-rate-sme';
import { Pagination, PaginationResult } from '../../../../_core/_model/pagination';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditTypeService } from '../../../../_core/_service/audit-type.service';
import { MesOrgService } from '../../../../_core/_service/mes-org.service';
import { SmeScoreReportService } from '../../../../_core/_service/sme-score-report.service';
import { FunctionUtility } from '../../../../_utility/function-utility';

@Component({
  selector: 'app-sme-score-report',
  templateUrl: './sme-score-report.component.html',
  styleUrls: ['./sme-score-report.component.scss']
})
export class SmeScoreReportComponent implements OnInit {
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };

  timeStart: string = "";
  timeEnd: string = "";
  fromTime: string = "";
  toTime: string = "";
  pdc: string = "all";
  line: string = "all";
  building: string = "all";
  auditType2: string = "";
  pdcList: Array<Select2OptionData>;
  lines: Array<Select2OptionData>;
  buildings: Array<Select2OptionData>;
  auditType2List: Array<Select2OptionData>;
  auditRateSme: AuditRateSme[] = [];
  searchKey = false;
  text: string;
  auditType1s: Array<Select2OptionData>;
  auditType1: string = "all";
  constructor(
    private smeScoreReportService: SmeScoreReportService,
    private alertifyService: AlertifyService,
    private functionUtility: FunctionUtility,
    private mesOrgService: MesOrgService,
    private auditTypeMService: AuditTypeService
  ) { }

  ngOnInit() {
    this.getListPDCs();
    this.getListBuilding();
    this.getListLine();
    this.getAuditType1();
    this.loadData();
  }

  loadData() {
  
    let object = {
      pdc: this.pdc === 'all' ? '' : this.pdc,
      building: this.building === 'all' ? '' : this.building,
      line: this.line === 'all' ? '' : this.line,
      auditType2: this.auditType2,
      auditTyepe1: this.auditType1 === 'all' ? '' : this.auditType1,
      fromDate: this.fromTime,
      toDate: this.toTime
    }
    this.smeScoreReportService.search(this.pagination.currentPage, this.pagination.itemsPerPage, object).subscribe((res: PaginationResult<AuditRateSme[]>) => {
    
      console.log(res);
      this.auditRateSme = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertifyService.error(error);
    });
  }

  getListPDCs() {
    this.mesOrgService.getAllPdc().subscribe(res => {
      this.pdcList = res.map(item => {
        return { id: item.id, text: item.name };
      });
      this.pdcList.unshift({ id: "all", text: "All" });
    });
  }
  getListBuilding() {
    const pdc = this.pdc === 'all' ? '' : this.pdc;
    this.mesOrgService.getAllBuilding(pdc).subscribe(res => {
      this.buildings = res.map(item => {
        return { id: item.id, text: item.name };
      });
      this.buildings.unshift({ id: "all", text: "All" });
      this.building = this.buildings[0].id;
      this.getListLine();
    });
  }

  getListLine() {
    const pdc = this.pdc === 'all' ? '' : this.pdc;
    const building = this.building === 'all' ? '' : this.building;
    this.mesOrgService.getAllLineId(pdc, building).subscribe(res => {
      debugger
      this.lines = res.map(item => {
        return { id: item.id, text: item.name };
      });
      this.lines.unshift({ id: "all", text: "All" });
    });

  }

  optionAuditType2() {
    const object = {
      audit_type_1: this.auditType1,
    };
    if (this.auditType1 === "all") {
      this.auditType2List = [];
      this.auditType2 = '';
    } else {
      this.auditTypeMService.getAuditsByAuditType1(object).subscribe((res) => {
        this.auditType2List = res.map((item) => {
          return { id: item.audit_Type2, text: item.audit_Type2 };
        });
        this.auditType2 = this.auditType2List[0].id;
      });
    }
  }

  getAuditType1() {
    this.smeScoreReportService.getAuditType1BySME().subscribe(res => {
      this.auditType1s = res.map(item => {
        return { id: item, text: item };
      });
      this.auditType1s.unshift({ id: "all", text: "All" });
    })
  }

  auditType1Change() {
    this.optionAuditType2();
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }
  pdcChange() {
    this.getListBuilding();
  }
  buingdingChange() {
    this.getListLine();
  }
  search() {
    this.checkTime();
    this.pagination.currentPage = 1;
    this.loadData();
  }
  exportExcel() {
    this.checkTime();
    let object = {
      pdc: this.pdc === 'all' ? '' : this.pdc,
      building: this.building === 'all' ? '' : this.building,
      line: this.line === 'all' ? '' : this.line,
      auditType2: this.auditType2,
      auditType1: this.auditType1 === 'all' ? '' : this.auditType1,
      fromDate: this.fromTime,
      toDate: this.toTime
    };
    this.smeScoreReportService.exportExcel(object);
  }
  exportExcelDetail(item) {
    this.smeScoreReportService.exportExcelDetail(item.recordId);
  }
  clearSearch() {
    this.pdc = "all";
    this.building = "all";
    this.line = "all";
    this.auditType1 = "all";
    this.auditType2 = '';
    this.timeEnd = "";
    this.timeStart = "";
    this.fromTime = "";
    this.toTime = "";
    this.loadData();
  }
  checkTime() {
    if (this.timeStart === "" ||
      this.timeEnd === "" ||
      this.timeStart === null ||
      this.timeEnd === null ||
      new Date(this.timeStart).getTime() > new Date(this.timeEnd).getTime()) {
      this.toTime = "";
      this.fromTime = "";
    } else {
      this.fromTime = this.functionUtility.getDateFormat(new Date(this.timeStart));
      this.toTime = this.functionUtility.getDateFormat(new Date(this.toTime));
    }
  }
}
