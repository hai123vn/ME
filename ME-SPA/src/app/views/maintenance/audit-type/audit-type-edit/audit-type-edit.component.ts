import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditTypeService } from '../../../../_core/_service/audit-type.service';
import { BrandService } from '../../../../_core/_service/brand.service';

@Component({
  selector: 'app-audit-type-edit',
  templateUrl: './audit-type-edit.component.html',
  styleUrls: ['./audit-type-edit.component.scss']
})
export class AuditTypeEditComponent implements OnInit {
  auditType: any = {};
  brands: Array<Select2OptionData>;
  flag = '0';
  auditKinds: Array<Select2OptionData>;


  constructor(private auditTypeService: AuditTypeService,
    private alertify: AlertifyService,
    private brandService: BrandService,
    private router: Router,) { }

  ngOnInit() {
    this.getAllBrands();
    this.auditTypeService.currentAuditType.subscribe(auditType => this.auditType = auditType);
    this.auditTypeService.currentFlag.subscribe(flag => this.flag = flag);
  }

  update() {
    this.auditTypeService.update(this.auditType).subscribe(() => {
      this.router.navigate(["/maintenance/audit-type"]);
      this.alertify.success('Updated Success');
    }, error => {
      this.alertify.error(error);
    });

  }

  getAllBrands() {
    debugger
    this.brandService.getAllBrands().subscribe((data) => {
      this.brands = data.map(item => {
        return { id: item.brand_ID, text: item.brand_ID + ' - ' + item.brand_EN };
      });
    }, error => {
      this.alertify.error(error);
    });
  }

  blackList() {
    this.router.navigate(["/maintenance/audit-type"]);
  }

  cancel() {
    this.auditType = {};
  }
}
