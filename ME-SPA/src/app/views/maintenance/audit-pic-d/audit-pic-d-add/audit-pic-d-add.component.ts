import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { Select2Option } from 'ng-select2-component';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditPicDService } from '../../../../_core/_service/audit-pic-d.service';
import { AuditPicMService } from '../../../../_core/_service/audit-pic-m.service';
import { MesOrgService } from '../../../../_core/_service/mes-org.service';

@Component({
  selector: 'app-audit-pic-d-add',
  templateUrl: './audit-pic-d-add.component.html',
  styleUrls: ['./audit-pic-d-add.component.scss']
})
export class AuditPicDAddComponent implements OnInit {
  auditPicD: any = {};
  auditPicM: Array<Select2OptionData>;
  flag = '0';
  lang: string = "EN";
  update: boolean = true;
  pdcs: Array<Select2OptionData>;
  building: Array<Select2OptionData>;
  lines: Array<Select2OptionData>;

  constructor(private auditPicDService: AuditPicDService,
    private auditPicMService: AuditPicMService,
    private mesOrgService: MesOrgService,
    private router: Router,
    private alertify: AlertifyService,
  ) { }

  ngOnInit(): void {
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

  getAllPicM() {
    debugger
    this.auditPicMService.getAll().subscribe(res => {
      debugger
      this.auditPicM = res.map(item => {
        return { id: item.piC_Type_ID, text: item.piC_Type_ZW };
      });
    });
  }

  blacklist() {
    this.router.navigate(['maintenance/audit-pic-d']);
  }

  cancel() {
    this.auditPicD = {};
  }

  save() {
    if (this.flag === '0') {
      this.auditPicDService.create(this.auditPicD).subscribe(() => {
        this.alertify.success("Add success 😁");
        this.router.navigate(["/maintenance/audit-pic-d"]);
      }, error => {
        this.alertify.error("Add failed !! 😯");
      });
    }
  }

  deleteList(selectorID) {
    let el = document.getElementById(selectorID);
    el.parentNode.removeChild(el);
  }

  changeHtmlError(parenDiv, span, newHtml) {
    if (document.getElementById(span) == null) {
      document.
        querySelector(parenDiv)
        .insertAdjacentHTML("beforeend", newHtml);
    }
    else {
      this.deleteList(span);
      document
        .querySelector(parenDiv)
        .insertAdjacentHTML("beforeend", newHtml);
    }
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

  check() {
    const countCharactersPdc = this.auditPicD["pdc"].split("").length;
    const countCharactersBuilding = this.auditPicD["building"].split("").length;
    const countCharactersLanguage = this.auditPicD["language"].split("").length;
    const countCharactersLine = this.auditPicD["line"].split("").length;
    const parrentPdc = ".parent-pdc";
    const parrentBuilding = ".parent-building";
    const parrentLanguage = ".parent-language";
    const parrentLine = ".parent-line";
    const spanPdc = "pdc-id";
    const spanBuilding = "building-id";
    const spanLanguage = "language-id";
    const spanLine = "line-id";
    const newHtmlPdc =
      '<span id="pdc-id" style="color:red;">Maximum 1 characters</span>';
    const newHtmlBuilding =
      '<span id="building-id" style="color:red;">Maximum 1 characters</span>';
    const newHtmlLanguage =
      '<span id="language-id" style="color:red;">Maximum 2 characters</span>';
    const newHtmlLine =
      '<span id="line-id" style="color:red;">Maximum 3 characters</span>';
    if (countCharactersPdc > 1) {
      this.changeHtmlError(parrentPdc, spanPdc, newHtmlPdc);
    } else {
      if (document.getElementById(spanPdc) !== null) {
        this.deleteList(spanPdc);
      }
    }
    if (countCharactersLine > 3) {
      this.changeHtmlError(parrentLine, spanLine, newHtmlLine);
    } else {
      if (document.getElementById(spanLine) !== null) {
        this.deleteList(spanLine);
      }
    }

    if (countCharactersBuilding > 1) {
      this.changeHtmlError(parrentBuilding, spanBuilding, newHtmlBuilding);
    } else {
      if (document.getElementById(spanBuilding) !== null) {
        this.deleteList(spanBuilding);
      }
    }

    if (countCharactersLanguage > 2) {
      this.changeHtmlError(parrentLanguage, spanLanguage, newHtmlLanguage);
    } else {
      if (document.getElementById(spanLanguage) !== null) {
        this.deleteList(spanLanguage);
      }
    }

    if (
      countCharactersPdc === 1 &&
      countCharactersBuilding === 1 &&
      countCharactersLine <= 3 &&
      countCharactersLine >= 1 &&
      countCharactersLanguage <= 2 &&
      countCharactersLanguage >= 1
    ) {
      let error = 0;
    }
  }
}
