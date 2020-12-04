import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { Select2 } from 'ng-select2-component';
import { Pagination, PaginationResult } from '../../../../_core/_model/pagination';
import { AuditRateWaterSpider } from '../../../../_core/_model/water-spider-score-record';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditTypeService } from '../../../../_core/_service/audit-type.service';
import { MesOrgService } from '../../../../_core/_service/mes-org.service';
import { WaterSpiderScoreReportService } from '../../../../_core/_service/water-spider-score-report.service';
import { FunctionUtility } from '../../../../_utility/function-utility';

@Component({
  selector: 'app-water-spider-report',
  templateUrl: './water-spider-report.component.html',
  styleUrls: ['./water-spider-report.component.scss']
})
export class WaterSpiderReportComponent implements OnInit {
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1,
  };
  timeStart: string = "";
  timeEnd: string = "";
  fromTime = "";
  toTime = "";
  pdc: string = "all";
  line: string = "all";
  building: string = "all";
  pdcList: Array<Select2OptionData>;
  buildings: Array<Select2OptionData>;
  lines: Array<Select2OptionData>;
  auditRateWaterSpider: AuditRateWaterSpider[] = [];
  auditType2List: Array<Select2OptionData>;
  auditType2: string = "";
  auditType1s: Array<Select2OptionData>;
  auditType1: string = 'all';

  constructor(
    private mesOrgService: MesOrgService,
    private waterSpiderService: WaterSpiderScoreReportService,
    private alertifyService: AlertifyService,
    private functionUtility: FunctionUtility,
    private auditTypeMService: AuditTypeService
  ) { }

  ngOnInit() {
    this.getListPDCs();
    this.getAuditType1();
    this.loadData();
  }
  getListPDCs() {
    this.mesOrgService.getAllPdc().subscribe(res => {
      this.pdcList = res.map(item => {
        return { id: item.id, text: item.name };
      });
      this.pdcList.unshift({ id: "all", text: "All" });
      this.getAllBuilding();
    })
  }
  getAllBuilding() {
    const pdc = this.pdc === "all" ? '' : this.pdc;
    this.mesOrgService.getAllBuilding(pdc).subscribe(res => {
      this.buildings = res.map(item => {
        return { id: item.id, text: item.name };
      });
      this.buildings.unshift({ id: "all", text: "All" });
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
    })
  }
  pageChange(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }
  buingdingChange() {
    this.getListLine();
  }
  auditType1Change() {
    this.optionAuditType2();
  }
  pdcChange() {
    this.getAllBuilding();
  }
  optionAuditType2() {
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
  getAuditType1() {
    this.waterSpiderService.getAuditType1ByWaterSpider().subscribe((res) => {
      this.auditType1s = res.map((item) => {
        return { id: item, text: item };
      });
      this.auditType1s.unshift({ id: "all", text: "All" });
    })
  }
  loadData() {
    let object = {
      pdc: this.pdc === "all" ? '' : this.pdc,
      line: this.line === "all" ? '' : this.line,
      building: this.building === "all" ? '' : this.building,
      fromDate: this.fromTime,
      toDate: this.toTime,
      auditType2: this.auditType2,
      auditType1: this.auditType1 === "all" ? '' : this.auditType1,
    };
    this.waterSpiderService.search(this.pagination.currentPage, this.pagination.itemsPerPage, object).subscribe((res: PaginationResult<AuditRateWaterSpider[]>) => {
      this.auditRateWaterSpider = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertifyService.error(error);
    })
  }
  search() {
    this.checkTime();
    this.pagination.currentPage = 1;
    this.loadData();
  }
  exportExcel() {
    this.checkTime();
    let object = {
      pdc: this.pdc === "all" ? '' : this.pdc,
      building: this.building === "all" ? '' : this.building,
      line: this.line === "all" ? '' : this.line,
      fromDate: this.fromTime,
      toDate: this.toTime,
      auditType2: this.auditType2,
      auditType1: this.auditType1 === "all" ? '' : this.auditType1,
    };
    this.waterSpiderService.exportExcel(object);
  }

  exportExcelDetail(item) {
    this.waterSpiderService.exportExcelDetail(item.recordId);
  }
  clearSearch() {
    this.pdc = "all";
    this.building = "all";
    this.line = "all";
    this.timeEnd = "";
    this.timeStart = "";
    this.fromTime = "";
    this.toTime = "";
    this.auditType1 = "all";
    this.auditType2 = '';
    this.loadData();
  }
  checkTime() {
    if (this.timeStart === "" ||
      this.timeEnd === "" ||
      this.timeStart === null ||
      this.timeEnd === null ||
      new Date(this.timeStart).getTime() > new Date(this.timeEnd).getTime()
    ) {
      this.toTime = "";
      this.fromTime = "";
    } else {
      this.fromTime = this.functionUtility.getDateFormat(new Date(this.timeStart));
      this.toTime = this.functionUtility.getDateFormat(new Date(this.timeEnd));
    }
  }
}
