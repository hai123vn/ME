import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { AuditPicM } from '../_model/audit-pic-m';
import { AuditRecM } from '../_model/audit-rec-m';
import { AlertifyService } from '../_service/alertify.service';
import { AuditRecMService } from '../_service/audit-rec-m.service';

@Injectable()
export class AuditRecMListResolver implements Resolve<AuditRecM[]> {
    pageNumber = 1;
    pageSize = 5;
    constructor(private auditRecMService: AuditRecMService, private router: Router, private alertify: AlertifyService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<AuditRecM[]> {
        return this.auditRecMService.getListAll(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data (☞ﾟヮﾟ)☞');
                this.router.navigate(['/dashboard']);
                return of(null);
            }),
        );
    }

}