import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditRecMService } from '../../../../_core/_service/audit-rec-m.service';
import { MesMoService } from '../../../../_core/_service/mes-mo.service';
import { MesOrgService } from '../../../../_core/_service/mes-org.service';
import { FunctionUtility } from '../../../../_utility/function-utility';

@Component({
  selector: 'app-audit-rec-m-add',
  templateUrl: './audit-rec-m-add.component.html',
  styleUrls: ['./audit-rec-m-add.component.scss']
})
export class AuditRecMAddComponent implements OnInit {
  auditRecM: any = {};
  flag: string;
  pdcs: Array<Select2OptionData>;
  building: Array<Select2OptionData>;
  lineIDs: Array<Select2OptionData>;
  modelNos: Array<Select2OptionData>;
  today: Date = new Date();

  constructor(
    private mesOrgService: MesOrgService,
    private mesMoService: MesMoService,
    private auditRecMService: AuditRecMService,
    private alertifyService: AlertifyService,
    private router: Router,
    private functionUtility: FunctionUtility
  ) { }

  ngOnInit() {
    this.getAllPdc();
    this.getAllModelNo();
    this.pdcChange();
    this.buingdingChange();

    this.auditRecMService.auditRecMSource.subscribe(auditRecM => this.auditRecM = auditRecM);
    this.auditRecMService.flagSource.subscribe(flag => this.flag = flag);
  }

  saveAndNext() {
    const auditRecM: any = {
      record_Time: this.functionUtility.getDateFormat(this.auditRecM.record_Time),
      pdc: this.auditRecM.pdc,
      building: this.auditRecM.building,
      line: this.auditRecM.line,
      model_No: this.auditRecM.model_No,
      model_Name: this.auditRecM.model_Name,
      chief: this.auditRecM.chief,
      recorder: this.auditRecM.recorder,
      attendees: this.auditRecM.attendees
    }
    this.auditRecMService.create(auditRecM).subscribe((res) => {
      this.alertifyService.success("Add success ✅✅✅");
      this.auditRecM = {};
      this.auditRecM.pdc = '';
      this.auditRecM.building = '';
      this.auditRecM.line = '';
      this.auditRecM.model_No = '';
    }, error => {
      this.alertifyService.error("¯\_( ͡° ͜ʖ ͡°)_/¯     ¯\_( ͡° ͜ʖ ͡°)_/¯");
    })
  }

  save() {
    if (this.flag == '0') {
      const auditRecM: any = {
        record_Time: this.functionUtility.getDateFormat(this.auditRecM.record_Time),
        pdc: this.auditRecM.pdc,
        building: this.auditRecM.building,
        line: this.auditRecM.line,
        model_No: this.auditRecM.model_No,
        model_Name: this.auditRecM.model_Name,
        chief: this.auditRecM.chief,
        recorder: this.auditRecM.recorder,
        attendees: this.auditRecM.attendees
      }
      this.auditRecMService.create(auditRecM).subscribe(() => {
        debugger
        this.alertifyService.success("Add success !!");
        this.router.navigate(["/maintenance/audit-rec"]);
      }, error => {
        this.alertifyService.error("o((⊙﹏⊙))o.o((⊙﹏⊙))o.");
      });
    }
  }

  cancel() {
    this.auditRecM = {};
    this.auditRecM.pdc = '';
    this.auditRecM.building = '';
    this.auditRecM.line = '';
    this.auditRecM.model_No = '';
  }

  getAllPdc() {
    this.mesOrgService.getAllPdc().subscribe((res) => {
      this.pdcs = res.map(item => {
        return { id: item.id, text: item.name };
      });
    });
  }

  getAllBuilding() {
    this.mesOrgService.getAllBuilding(this.auditRecM.pdc).subscribe((res) => {
      this.building = res.map(item => {
        return { id: item.id, text: item.name };
      });
      this.getAllLineId();
    });
  }

  getAllLineId() {
    this.mesOrgService.getAllLineId(this.auditRecM.pdc, this.auditRecM.building).subscribe((res) => {
      this.lineIDs = res.map(item => {
        return { id: item.id, text: item.name };
      });
    });
  }

  getAllModelNo() {
    this.mesMoService.getModelNo().subscribe((res) => {
      this.modelNos = res.map(item => {
        return { id: item, text: item };
      });
    });
  }
  changeOptionModelNo() {
    debugger
    if (this.auditRecM.model_No != null) {
      this.mesMoService.getModelName(this.auditRecM.model_No).subscribe((res) => {
        this.auditRecM.model_Name = res.dataResult;
      });
    }
  }

  pdcChange() {
    this.getAllBuilding();
  }

  buingdingChange() {
    this.getAllLineId();
  }

  back() {
    this.router.navigate(["/maintenance/audit-rec"]);
  }
}

