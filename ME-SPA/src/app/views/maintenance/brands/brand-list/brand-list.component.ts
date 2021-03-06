import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Brand } from '../../../../_core/_model/brand';
import { Pagination, PaginationResult } from '../../../../_core/_model/pagination';
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
  pagination: Pagination;
  searchKey = false;
  constructor(
    private brandService: BrandService,
    private router: Router,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.brandService.currentBrand.subscribe(brand => this.brand = brand);
    this.route.data.subscribe(data => {
      this.brands = data['brands'].result;
      this.pagination = data['brands'].pagination;
    });
  }

  deleteBrand(brand: Brand) {
    this.alertify.confirm('Delete Audit Type', 'Are you sure you want to delete this Audit_Type_ID "' + brand.brand_ID + '" ? ', () => {
      this.brandService.deleteBrand(brand.brand_ID).subscribe(() => {
        this.alertify.success('Brand has been deleted');
        this.loadBrand();
      }, error => {
        this.alertify.error('Failed to delete the Audit Type');
      });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadBrand();
  }

  loadBrand() {
    if (this.searchKey === false) {
      this.brandService.getBrands(this.pagination.currentPage, this.pagination.itemsPerPage)
        .subscribe((res: PaginationResult<Brand[]>) => {
          this.brand = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        });
    } else {
      this.brandService.search(this.pagination.currentPage, this.pagination.itemsPerPage, this.text)
        .subscribe((res: PaginationResult<Brand[]>) => {
          this.brands = res.result;
          this.pagination = res.pagination;
          console.log('Search: ', this.brands);
        }, error => {
          this.alertify.error(error);
        });
    }
  }

  searchBrand() {
    this.pagination.currentPage = 1;
    if (this.text !== '') {
      this.brandService.search(this.pagination.currentPage, this.pagination.itemsPerPage, this.text)
        .subscribe((res: PaginationResult<Brand[]>) => {
          this.brands = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        });
    } else {
      this.loadBrand();
    }
  }

  addBrand() {
    this.brand = {};
    this.brandService.changeBrand(this.brand);
    this.brandService.changeFlag('0');
    this.router.navigate(['/maintenance/brand/add']);
  }

  getAll() {
    this.brandService.getAllBrands().subscribe((res) => {
      this.brands = res;
    });
  }

  changeToEdit(brand: Brand) {
    this.brandService.changeBrand(brand);
    this.brandService.changeFlag('1');
    this.router.navigate(['/maintenance/brand/update']);
  }
}
