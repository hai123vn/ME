import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { BrandService } from '../../../../_core/_service/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.scss']
})
export class BrandUpdateComponent implements OnInit {
  brand: any = {};
  flag = '0';
  constructor(
    private alertify: AlertifyService,
    private brandService: BrandService,
    private router: Router
  ) { }

  ngOnInit() {
    this.brandService.currentBrand.subscribe(brand => this.brand = brand);
    this.brandService.currentFlag.subscribe(flag => this.flag = flag);
  }

  backList() {
    this.router.navigate(['/maintenance']);
  }

  update() {
    this.brandService.updateBrand(this.brand).subscribe(
      () => {
        this.alertify.success(" Updated success !");
      }, error => {
        this.alertify.error(error);
      }
    )
  }

  cancel() {
    this.brand = {};
  }
}
