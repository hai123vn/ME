import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuditRateSearch } from '../_model/audit-rate-search';
import { AuditRateSme } from '../_model/audit-rate-sme';
import { AuditRecSearch } from '../_model/audit-rec-search';
import { AuditType } from '../_model/audit-type';
import { PaginationResult } from '../_model/pagination';
import { ScoreRecordDetail } from '../_model/score-record-detail';
import { AuditRateModel, ScoreRecordQuestion } from '../_model/score-record-question';
const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }),
}
@Injectable({
  providedIn: 'root'
})
export class SmeScoreRecordService {
  baseUrl = environment.apiUrl;
  questionEditSMESource = new BehaviorSubject<any>([]);
  currentQuestionEditSME = this.questionEditSMESource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  search(page?, itemsPerPage?, auditRateSearch?: AuditRateSearch): Observable<PaginationResult<AuditRateSme[]>> {
    const paginatedResult: PaginationResult<AuditRateSme[]> = new PaginationResult<AuditRateSme[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    let url = this.baseUrl + 'SMERecord/sme-list';
    return this.http.post<any>(url, auditRateSearch, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
  }

  exportExcel(auditRateSearch?: AuditRateSearch) {
    return this.http.post(this.baseUrl + 'SMERecord/ExportExcelSME', auditRateSearch, { responseType: 'blob' })
      .subscribe((result: Blob) => {
        if (result.type !== 'application/xlsx') {
          alert(result.type);
        }
        const blob = new Blob([result]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const currentTime = new Date();
        const filename = 'Sme_Score_Record' + currentTime.getFullYear().toString() +
          (currentTime.getMonth() + 1) + currentTime.getDate() +
          currentTime.toLocaleTimeString().replace(/[ ]|[,]|[:]/g, '').trim() + '.xlsx';
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      });
  }

  getQuestion(auditTypeId: string) {
    return this.http.get<ScoreRecordQuestion[]>(this.baseUrl + 'AuditRate/GetListQuesRecord', {
      params: { auditTypeId }
    });
  }

  saveScoreRecord(param: AuditRateModel) {
    return this.http.post(this.baseUrl + 'AuditRate/save', param);
  }

  getDetailScoreRecord(recordId: string) {
    return this.http.get<ScoreRecordDetail>(this.baseUrl + 'AuditRate/detail/' + recordId);
  }

  exportExcelDetail(recordId: string) {
    return this.http.get(this.baseUrl + 'SMERecord/ExportExcelScoreRecordDetail', {
      responseType: 'blob', params: { recordId: recordId }
    }).subscribe((result: Blob) => {
      if (result.type !== 'application/xlsx') {
        alert(result.type);
      }
      const blob = new Blob([result]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      const currentTime = new Date();
      const filename = 'Sme_Score_Record_Detail_' + currentTime.getFullYear().toString() + (currentTime.getMonth() + 1) + currentTime.getDate() + currentTime.toLocaleDateString().replace(/[]|[,]|[:]/g, '').trim() + '.xlsx';
      link.href = url;
      link.setAttribute('download', filename);
      link.click();
    });
  }

  uploadPicture(formData: FormData) {
    return this.http.post(this.baseUrl + 'AuditRate/upload', formData);
  }

  getBrandBySME() {
    return this.http.get<string[]>(this.baseUrl + 'SMERecord/getbrandbysme');
  }

  getAuditTypeByBrandBySME(brand: string) {
    return this.http.get<AuditType[]>(this.baseUrl + 'SMERecord/getaudittypebybrandbysme', {
      params: { brand: brand }
    });
  }

  getAuditType1BySME() {
    return this.http.get<string[]>(this.baseUrl + 'SMERecord/getaudittype1bysme');
  }

  changeQuestionEditSME(questionEditSME: any) {
    this.questionEditSMESource.next(questionEditSME);
  }

  saveQuestionEditSME(questionEditSME: ScoreRecordQuestion[]) {
    return this.http.post(this.baseUrl + 'AuditRate/update-score-record-detail', questionEditSME);
  }
}
