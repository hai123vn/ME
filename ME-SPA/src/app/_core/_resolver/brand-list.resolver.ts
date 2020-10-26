import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Brand } from '../_model/brand';
import { AlertifyService } from '../_service/alertify.service';
import { BrandService } from '../_service/brand.service';

@Injectable()
export class BrandListResolver implements Resolve<Brand[]> {
    pageNumber = 1;
    pageSize = 5;
    constructor(private brandService: BrandService, private router: Router, private alertify: AlertifyService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Brand[]> {
        return this.brandService.getBrands(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        )
    }

}
