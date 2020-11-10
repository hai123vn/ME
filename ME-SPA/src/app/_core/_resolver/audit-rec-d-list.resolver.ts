import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { AuditPicM } from '../_model/audit-pic-m';
import { AuditRecD } from '../_model/audit-rec-d';
import { AlertifyService } from '../_service/alertify.service';
import { AuditRecDService } from '../_service/audit-rec-d.service';

@Injectable()
export class AuditRecDListResolver implements Resolve<AuditRecD[]> {
    pageNumber = 1;
    pageSize = 5;
    constructor(private auditRecDService: AuditRecDService, private router: Router, private alertify: AlertifyService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<AuditRecD[]> {
        return this.auditRecDService.getListAll(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data (☞ﾟヮﾟ)☞');
                this.router.navigate(['/dashboard']);
                return of(null);
            }),
        );
    }

}