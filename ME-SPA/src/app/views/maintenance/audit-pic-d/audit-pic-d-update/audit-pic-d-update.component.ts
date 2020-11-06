import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditPicDService } from '../../../../_core/_service/audit-pic-d.service';
import { AuditPicMService } from '../../../../_core/_service/audit-pic-m.service';
import { MesOrgService } from '../../../../_core/_service/mes-org.service';

@Component({
  selector: 'app-audit-pic-d-update',
  templateUrl: './audit-pic-d-update.component.html',
  styleUrls: ['./audit-pic-d-update.component.scss']
})
export class AuditPicDUpdateComponent implements OnInit {
  auditPicD: any = {};
  auditPicM: Array<Select2OptionData>;
  flag = '100';
  lang: string = "EN";
  update1: boolean = true;
  pdcs: Array<Select2OptionData>;
  building: Array<Select2OptionData>;
  lines: Array<Select2OptionData>;

  constructor(private router : Router,
    private auditPicDService: AuditPicDService,
    private alertify : AlertifyService,
    private mesOrgService: MesOrgService,
    private auditPicMService: AuditPicMService) { }

  ngOnInit() {
    this.getAllPicM();
    this.getAllPdc();
    this.getAllBuilding();
    this.getAllLine();
    this.auditPicDService.currentFlag.subscribe(flag => (this.flag = flag));
    this.auditPicDService.currentAuditPicD.subscribe(auditPicD => {
      this.auditPicD = auditPicD;
      if (this.flag == "1") {
        this.lang = this.auditPicD.language;
      }
    });
  }

  backlist()
  {
    this.router.navigate(['maintenance/audit-pic-d']);
  }

  getAllPicM() {
    this.auditPicMService.getAll().subscribe(res => {
      this.auditPicM = res.map(item => {
        return { id: item.piC_Type_ID, text: item.piC_Type_ZW };
      });
    });
  }

  update(){
    this.auditPicDService.update(this.auditPicD).subscribe(()=>{
      this.alertify.success("Updated Success !! ☜(ﾟヮﾟ☜)");
      this.router.navigate(['maintenance/audit-pic-d']);
    }, error =>{
      this.alertify.error('Updated Failed !! 😫😫');
    });
  }


  changeLanguage(event) {
    this.lang = event;
  }

  getAllPdc() {
    this.mesOrgService.getAllPdc().subscribe(res => {
      this.pdcs = res.map(item => {
        return { id: item.id, text: item.name };
      });
    });
  }

  getAllBuilding() {
    debugger
    this.mesOrgService.getAllBuilding(this.auditPicD.pdc).subscribe(res => {
      this.building = res.map(item => {
        return { id: item.id, text: item.name };
      });
    });
  }

  getAllLine() {
    this.mesOrgService.getAllLineId(this.auditPicD.pdc, this.auditPicD.building).subscribe(res => {
      this.lines = res.map(item => {
        return { id: item.id, text: item.name };
      })
    })
  }

  pdcChange() {
    this.getAllBuilding();
  }

  buildingChange() {
    this.getAllLine();
  }
}
