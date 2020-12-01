import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { Pagination, PaginationResult } from '../../../../_core/_model/pagination';
import { AuditRateWaterSpider } from '../../../../_core/_model/water-spider-score-record';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditTypeService } from '../../../../_core/_service/audit-type.service';
import { MesOrgService } from '../../../../_core/_service/mes-org.service';
import { WaterSpidetScoreRecordService } from '../../../../_core/_service/water-spidet-score-record.service';
import { FunctionUtility } from '../../../../_utility/function-utility';

@Component({
  selector: 'app-water-spider-score-record-list',
  templateUrl: './water-spider-score-record-list.component.html',
  styleUrls: ['./water-spider-score-record-list.component.scss']
})
export class WaterSpiderScoreRecordListComponent implements OnInit {
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 1,
    totalPages: 1
  };
  timeStart: string = "";
  timeEnd: string = "";
  fromTime: string = "";
  toTime: string = "";
  pdc: string = "all";
  line: string = "all";
  building: string = "all";
  pdcList: Array<Select2OptionData>;
  lines: Array<Select2OptionData>;
  buildings: Array<Select2OptionData>;
  auditRateWaterSpider: AuditRateWaterSpider[] = [];
  auditType2List: Array<Select2OptionData>;
  auditType2: string = "";
  auditType1s: Array<Select2OptionData>;
  auditType1: string = 'all';
  constructor(
    private mesOrgService: MesOrgService,
    private router: Router,
    private waterSpiderService: WaterSpidetScoreRecordService,
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
      this.pdcList.unshift({id: "all", text: "All"});
      this.getListBuilding();
    })
  }
  getListBuilding() {
    const pdc = this.pdc === 'all' ? '' : this.pdc;
    this.mesOrgService.getAllBuilding(pdc).subscribe(res => {
      this.buildings = res.map(item => {
        return { id: item.id, text: item.name };
      });
    });
  }

  getListLine() {
    const pdc = this.pdc === 'all' ? '' : this.pdc;
    const building = this.building === 'all' ? '' : this.building;
    this.mesOrgService.getAllLineId(pdc, building).subscribe(res => {
      this.lines = res.map(item => {
        return { id: item.id, text: item.name };
      });
      this.lines.unshift({ id: "all", text: "All" });
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }

  auditType1Change() {
    this.optionAuditType2();
  }
  pdcChange() {
    this.getListBuilding();
  }
  buingdingChange() {
    this.getListLine();
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
    this.waterSpiderService.getAuditType1ByWaterSpider().subscribe((res) => {
      this.auditType1s = res.map((item) => {
        return { id: item, text: item };
      });
      this.auditType1s.unshift({ id: "all", text: "All" });
    });
  }

  addNew() {
    this.router.navigate(["/record/record-add/water-spider-scored-record-add"]);
  }
  loadData() {
    let object = {
      pdc: this.pdc === 'all' ? '' : this.pdc,
      building: this.building === 'all' ? '' : this.building,
      line: this.line === 'all' ? '' : this.line,
      fromDate: this.fromTime,
      toDate: this.toTime,
      auditType2: this.auditType2,
      auditType1: this.auditType1 === 'all' ? '' : this.auditType1
    };
    this.waterSpiderService.search(this.pagination.currentPage, this.pagination.itemsPerPage, object).subscribe((res: PaginationResult<AuditRateWaterSpider[]>) => {
      this.auditRateWaterSpider = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertifyService.error("Error Search !!!");
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
      pdc: this.pdc === 'all' ? '' : this.pdc,
      building: this.building === 'all' ? '' : this.building,
      line: this.line === 'all' ? '' : this.line,
      fromDate: this.fromTime,
      toDate: this.toTime,
      auditType2: this.auditType2,
      auditType1: this.auditType1 === 'all' ? '' : this.auditType1
    };
    this.waterSpiderService.exportExcel(object);
  }
  detail(recordId: string) {
    debugger
    this.router.navigate(["/maintenance/water-spider-score-record/detail", recordId]);
  }

  clearSearch() {
    this.pdc = "all";
    this.building = "all";
    this.line = "all";
    this.timeEnd = "";
    this.timeStart = "";
    this.fromTime = "";
    this.toTime = "";
    this.auditType1 = 'all';
    this.auditType2 = '';
    this.loadData();
  }

  checkTime() {
    if (
      this.timeStart === "" ||
      this.timeEnd === "" ||
      this.timeStart === null ||
      this.timeEnd === null ||
      new Date(this.timeStart).getTime() > new Date(this.timeEnd).getTime()
    ) {
      this.toTime = "";
      this.fromTime = "";
    } else {
      this.fromTime = this.functionUtility.getDateFormat(
        new Date(this.timeStart)
      );
      this.toTime = this.functionUtility.getDateFormat(new Date(this.timeEnd));
    }
  }
}
