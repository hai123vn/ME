import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';
import { AuditType } from '../_model/audit-type';
import { AlertifyService } from '../_service/alertify.service';
import { AuditTypeService } from '../_service/audit-type.service';

@Injectable()
export class AuditTypeListResolver implements Resolve<AuditType[]> {
    pageNumber = 1;
    pageSize = 5;
    constructor(private auditTypeService: AuditTypeService, private router: Router, private alertify: AlertifyService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<AuditType[]> {
        return this.auditTypeService.getListAll(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/dashboard']);
                return of(null);
            }),
        );
    }

}