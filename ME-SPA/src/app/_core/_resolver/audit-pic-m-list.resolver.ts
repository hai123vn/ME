import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { AuditPicM } from '../_model/audit-pic-m';
import { AlertifyService } from '../_service/alertify.service';
import { AuditPicMService } from '../_service/audit-pic-m.service';

@Injectable()
export class AuditPicMListResolver implements Resolve<AuditPicM[]> {
    pageNumber = 1;
    pageSize = 5;
    constructor(private auditPicMService: AuditPicMService, private router: Router, private alertify: AlertifyService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<AuditPicM[]> {
        return this.auditPicMService.getListAll(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/dashboard']);
                return of(null);
            }),
        );
    }

}