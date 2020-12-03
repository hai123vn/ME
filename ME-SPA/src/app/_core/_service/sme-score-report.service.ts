import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { link } from 'fs';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuditRateSearch } from '../_model/audit-rate-search';
import { AuditRateSme } from '../_model/audit-rate-sme';
import { PaginationResult } from '../_model/pagination';

@Injectable({
  providedIn: 'root'
})
export class SmeScoreReportService {
  baseUrl = environment.apiUrl;
  questionEditSMESource = new BehaviorSubject<any>([]);
  currrentQuestionEditSME = this.questionEditSMESource.asObservable();
  constructor(private http: HttpClient) { }
  search(page?, itemsPerPage?, auditRateSearch?: AuditRateSearch): Observable<PaginationResult<AuditRateSme[]>> {
   
    const paginatedResult: PaginationResult<AuditRateSme[]> = new PaginationResult<AuditRateSme[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    let url = this.baseUrl + 'SMEReport/sme-list';
    return this.http.post<any>(url, auditRateSearch, { observe: 'response', params })
      .pipe
      (map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      }));
  }

  exportExcel(auditRateSearch?: AuditRateSearch) {
    return this.http.post(this.baseUrl + 'SMEReport/ExportExcelSME', auditRateSearch, { responseType: 'blob' }).subscribe((result: Blob) => {
      if (result.type != 'application/xlsx') {
        alert(result.type);
      }
      const blob = new Blob([result]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      const currentTime = new Date();
      const fileName = 'Sme_Score_Record' + currentTime.getFullYear().toString() + currentTime.toLocaleDateString().replace(/[ ]|[,]|[:]/g, '').trim() + '.xlsx';
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    });
  }

  exportExcelDetail(recordId: string) {
    return this.http.get(this.baseUrl + 'SMEReport/ExportExcelScoreRecordDetail', {
      responseType: 'blob', params: {
        recordId: recordId
      }
    }).subscribe((result: Blob) => {
      if (result.type !== 'application/xlsx') {
        alert(result.type);
      }
      const blob = new Blob([result]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      const currentTime = new Date();
      const fileName = 'Sme_Score_Record_Detail_' + currentTime.getFullYear().toString() + (currentTime.getMonth() + 1) + currentTime.getDate() + currentTime.toLocaleDateString().replace(/[ ]|[,]|[:]/g, '').trim() + '.xlsx';
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    });
  }

  getAuditType1BySME() {
    return this.http.get<string[]>(this.baseUrl + 'SMEReport/getaudittype1bysme');
  }

}
