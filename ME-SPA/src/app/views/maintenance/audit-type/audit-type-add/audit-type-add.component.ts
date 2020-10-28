import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditTypeService } from '../../../../_core/_service/audit-type.service';
import { BrandService } from '../../../../_core/_service/brand.service';


@Component({
  selector: 'app-audit-type-add',
  templateUrl: './audit-type-add.component.html',
  styleUrls: ['./audit-type-add.component.scss']
})
export class AuditTypeAddComponent implements OnInit {
  auditType: any = {};
  brands: Array<Select2OptionData>;
  flag = '0';
  auditKinds: Array<Select2OptionData>;

  constructor(
    private auditTypeService: AuditTypeService,
    private alertify: AlertifyService,
    private brandService: BrandService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.auditTypeService.refresh.subscribe(() => {
      this.auditTypeService.currentAuditType.subscribe(
        (auditType) => (this.auditType = auditType)
      );
      this.auditTypeService.currentFlag.subscribe((flag) => (this.flag = flag));
      this.getAllBrands();
      if (this.flag == "0") {
        this.auditType.version = 1;
      }

      this.auditKinds = [
        {id:'SME', text:'SME'},
        {id: '6S', text:'6S'},
        {id: 'WS', text:'Water Spider'}
      ];
    });
  }

  saveAndNext() {
    if (this.flag == "0") {
      this.auditTypeService.create(this.auditType).subscribe(() => {
        this.alertify.success("Add succed");
        this.auditType = {};
        this.auditType.version = 1;
      }, error => {
        this.alertify.error(error);
      });
    } else {
      this.auditTypeService.update(this.auditType).subscribe(() => {
        this.alertify.success("Update succed");
        this.router.navigate(["/maintenance/audit-type"]);
      });
    }
  }
  blackList() {
    this.router.navigate(["/maintenance/audit-type"]);
  }
  save() {
    if (this.flag == "0") {
      this.auditTypeService.create(this.auditType).subscribe(() => {
        this.alertify.success("Create success");
        this.router.navigate(["/maintenance/audit-type"]);
      });
    } else {
      this.auditTypeService.update(this.auditType).subscribe(() => {
        this.alertify.success("Updated success");
        this.router.navigate(["/maintenance/audit-type"]);
      }, error => {
        this.alertify.error("Delete failed");
      });
    }
  }

  getAllBrands() {
    this.brandService.getAllBrands().subscribe((data) => {
      this.brands = data.map(item => {
        return { id: item.brand_ID, text: item.brand_ID + ' - ' + item.brand_EN };
      });
    }, error => {
      this.alertify.error(error);
    });
  }

  update() {
    if (this.flag == "1") {
      this.auditTypeService.upgrade(this.auditType.audit_Type_ID).subscribe(() => {
        this.alertify.success("Upgrade success");
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  cancel() {
    this.auditType = {};
  }
}
