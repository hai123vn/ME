import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { AuditRateSme } from '../../../../_core/_model/audit-rate-sme';
import { Pagination, PaginationResult } from '../../../../_core/_model/pagination';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditTypeService } from '../../../../_core/_service/audit-type.service';
import { MesOrgService } from '../../../../_core/_service/mes-org.service';
import { SmeScoreRecordService } from '../../../../_core/_service/sme-score-record.service';
import { FunctionUtility } from '../../../../_utility/function-utility';

@Component({
  selector: 'app-sme-score-record-list',
  templateUrl: './sme-score-record-list.component.html',
  styleUrls: ['./sme-score-record-list.component.scss']
})
export class SmeScoreRecordListComponent implements OnInit {
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
  pdc: string = "";
  line: string = "all";
  building: string = "all";
  auditType2: string = "all";
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
    private smeScoreRecordService: SmeScoreRecordService,
    private router: Router,
    private alertify: AlertifyService,
    private functionUtility: FunctionUtility,
    private mesOrgService: MesOrgService,
    private auditTypeMService: AuditTypeService
  ) { }

  ngOnInit() {
  }

  loadData() {
    let object = {
      pdc: this.pdc === 'all' ? '' : this.pdc,
      building: this.building === 'all' ? '' : this.building,
      line: this.line === 'all' ? '' : this.line,
      auditType2: this.auditType2,
      auditType1: this.auditType1 === 'all' ? '' : this.auditType1,
      fromDate: this.fromTime,
      toDate: this.toTime,
    };
    this.smeScoreRecordService.search(this.pagination.currentPage, this.pagination.itemsPerPage, object).subscribe(
      (res: PaginationResult<AuditRateSme[]>) => {
        this.auditRateSme = res.result;
        this.pagination = res.pagination;
      }, (error) => {
        this.alertify.error("Error ❓❓❓");
      }
    );
  }
  getListPDCs() {
    this.mesOrgService.getAllPdc().subscribe((res) => {
      this.pdcList = res.map((item) => {
        return { id: item.id, text: item.name };
      });
    });
  }

  getListBuilding() {
    const pdc = this.pdc === 'all' ? '' : this.pdc;
    this.mesOrgService.getAllBuilding(pdc).subscribe((res) => {
      this.buildings = res.map((item) => {
        return { id: item.id, text: item.name };
      });
    });
  }

  getListLine() {
    const pdc = this.pdc === 'all' ? '' : this.pdc;
    const building = this.building === 'all' ? '' : this.building;
    this.mesOrgService.getAllLineId(pdc, building).subscribe((res) => {
      this.lines = res.map((item) => {
        return { id: item.id, text: item.name };
      });
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
      this.auditTypeMService.getAuditByAuditType1(object).subscribe((res) => {
        this.auditType2List = res.map((item) => {
          return { id: item.id, text: item.name };
        });
      });
    }
  }

  getAuditType1() {
    this.smeScoreRecordService.getAuditType1BySME().subscribe((res) => {
      this.auditType1s = res.map((item) => {
        return { id: item, text: item };
      });
      this.auditType1s.unshift({ id: "all", text: "All" });
    });
  }

  auditType1Change() {
    this.optionAuditType2();
  }

  buildingChange() {
    this.getListLine();
  }

  addNew() {
    this.router.navigate(["/record/record-add/sms-scored-record-add"]);
  }

  search() {
    this.checkTime();
    this.pagination.currentPage = 1;
    this.loadData();
  }

  detail(recordId) {
    this.router.navigate(["maintenance/sme-score-record/detail" + recordId]);
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
      toDate: this.toTime,
    };
    this.smeScoreRecordService.exportExcel(object);
  }

  clearSearch() {
    this.pdc = "all";
    this.building = "all";
    this.line = "all";
    this.auditType1 = "all";
    this.auditType2 = '';
    this.timeEnd = "all";
    this.timeStart = "all";
    this.fromTime = "all";
    this.toTime = "all";
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
      this.fromTime = this.functionUtility.getDateFormat(new Date(this.timeStart));
      this.toTime = this.functionUtility.getDateFormat(new Date(this.timeEnd));
    }
  }
}
