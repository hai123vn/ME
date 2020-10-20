import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private brandService: BrandService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  backList() {
    this.router.navigate(['/maintenance/brand']);
  }

  update() {
    this.brandService.updateBrand(this.brand).subscribe(
      () => {
        console.log(" Updated success !");
      }, error => {
        console.log(error);
      }
    )
  }
}
