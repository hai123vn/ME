import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from '../../../../_core/_model/brand';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { BrandService } from '../../../../_core/_service/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {
  brands: Brand[];
  brand: any = {};
  text: string;
  constructor(
    private brandService: BrandService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  deleteBrand(brand: Brand) {
    this.brandService.deleteBrand(brand.brand_ID).subscribe(
      () => {
        this.alertify.success("Deleted success");
      }, error => {
        this.alertify.error(error);
      }
    )
  }

  addBrand() {
    this.brand = {};
    this.brandService.changeBrand(this.brand);
    this.brandService.changeFlag('0');
    this.router.navigate(['/maintenance/add']);
  }

  getAll() {
    this.brandService.getAllBrands().subscribe((res ) => {
      this.brands = res;
    } );
  }
}
