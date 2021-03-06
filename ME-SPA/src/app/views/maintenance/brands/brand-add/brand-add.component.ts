import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { BrandService } from '../../../../_core/_service/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.scss']
})
export class BrandAddComponent implements OnInit {
  brand: any = {};
  flag = '0';


  constructor(
    private brandService: BrandService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.brandService.refreshNeeded.subscribe(() => {
      this.brandService.currentBrand.subscribe(brand => this.brand = brand);
      this.brandService.currentFlag.subscribe(flag => this.flag = flag);
    });
    // this.brandService.currentBrand.subscribe(brand => this.brand = brand);
    // this.brandService.currentFlag.subscribe(flag => this.flag = flag);
  }

  backList() {
    this.router.navigate(['/maintenance/brand']);
  }

  cancel() {
    this.brand = {};
  }

  save() {
    console.log(this.brand);
    if (this.flag === '0') {
      debugger
      this.brandService.createBrand(this.brand).subscribe(
        () => {
          this.alertify.success('Add succeed');
        }, error => {
          this.alertify.error(error);
        }
      )
    }
  }

  delete() {
    this.brandService.deleteBrand(this.brand).subscribe(
      () => {
        this.alertify.success('Deleted success');
      }, error => {
        this.alertify.error(error);
      }
    )
  }

}
