import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';
import { AuditType } from '../_model/audit-type';
import { AlertifyService } from '../_service/alertify.service';
import { AuditTypeDService } from '../_service/audit-type-d.service';

@Injectable()
export class AuditTypeDListResolver implements Resolve<AuditType[]> {
    pageNumber = 1;
    pageSize = 3;
    constructor(private auditTypeDService: AuditTypeDService, private router: Router, private alertify: AlertifyService) { }
    
    resolve(route: ActivatedRouteSnapshot): Observable<AuditType[]> {
        return this.auditTypeDService.getAll(this.pageNumber, this.pageSize).pipe(
            catchError(error => {

                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/dashboard']);
                return of(null);
            }),
        );
    }

}