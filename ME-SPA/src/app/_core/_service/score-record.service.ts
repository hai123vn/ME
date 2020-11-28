import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuditRate6s } from '../_model/audit-rate-6s';
import { AuditRateSearch } from '../_model/audit-rate-search';
import { Pagination, PaginationResult } from '../_model/pagination';
import { ScoreRecordDetail } from '../_model/score-record-detail';
import { AuditRateModel, ScoreRecordQuestion } from '../_model/score-record-question';

@Injectable({
  providedIn: 'root'
})
export class ScoreRecordService {
  baseUrl = environment.apiUrl;
  score6SSource = new BehaviorSubject<Object>({});
  currentScore6S = this.score6SSource.asObservable();
  recordId = new BehaviorSubject<string>('0');
  currentRecordId = this.recordId.asObservable();
  questionEditSixSource = new BehaviorSubject<any>([]);
  currentQuestionEditSixs = this.questionEditSixSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  search(page?, itemsPerPage?, auditRateSearch?: AuditRateSearch): Observable<PaginationResult<AuditRate6s[]>> {
    const paginatedResual: PaginationResult<AuditRate6s[]> = new PaginationResult<AuditRate6s[]>();
    let params = new HttpParams;
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    let url = this.baseUrl + 'SixsRecord/sixs-list';
    return this.http.post<any>(url, auditRateSearch, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResual.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResual.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResual;
      })
    );
  }

  exportExcel(auditRateSearch?: AuditRateSearch) {
    return this.http.post(this.baseUrl + 'SixsRecord/ExportExcelSixs', auditRateSearch, { responseType: 'blob' }).subscribe((result: Blob) => {
      if (result.type !== 'application/xlsx') {
        alert(result.type);
      }

      const blob = new Blob([result]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      const currentTime = new Date();
      const filename = '6S_Score_Record_' + currentTime.getFullYear().toString() + (currentTime.getMonth() + 1) + currentTime.getDate() + currentTime.toLocaleDateString().replace(/[]|[,]|[:]/g, '').trim() + '.xlsx';
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    });
  }

  getListMEPIC() {
    return this.http.get<any>(this.baseUrl + 'AuditRate/getmepic', {});
  }
  getListPDRESP() {
    return this.http.get<any>(this.baseUrl + 'AuditRate/getpdresp', {});
  }

  getQuestion(auditTypeId) {
    return this.http.get<ScoreRecordQuestion[]>(this.baseUrl + 'AuditRate/GetListQuesRecord', {
      params: {
        auditTypeId: auditTypeId
      }
    });
  }

  saveScoreRecord(param: AuditRateModel) {
    return this.http.post(this.baseUrl + 'AuditRate/save', param);
  }

  getDetailScoreRecord(recordId: string) {
    return this.http.get<ScoreRecordDetail>(this.baseUrl + 'AuditRate/detail/' + recordId);
  }

  changeRecordId(recordId: string) {
    this.recordId.next(recordId);
  }

  uploadPicture(formData: FormData) {
    return this.http.post(this.baseUrl + 'AuditRate/upload', formData);
  }

  exportExcelDetail(recordId: string) {
    return this.http.get(this.baseUrl + 'SixsRecord/ExportExcelScoreRecordDetail', {
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
      const filename = '6S_Score_Record_Detail_' + currentTime.getFullYear().toString() + (currentTime.getMonth() + 1) + currentTime.getDate() + currentTime.toLocaleDateString().replace(/[]|[,]|[:]/g, '').trim() + '.xlsx';
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    });
  }

  getLanguage(user: string) {
    return this.http.get(this.baseUrl + 'AuditRate/getlanguage/' + user);
  }

  getBrandBySixs() {
    return this.http.get<string[]>(this.baseUrl + 'SixsRecord/getbrandbysixs');
  }

  getAuditTypeByBrandBySixs(brand: string) {
    return this.http.get<any>(this.baseUrl + 'SixsRecord/getaudittypebybrandbysixs', { params: { brand: brand } });
  }

  getAuditType1BySixs() {
    return this.http.get<string[]>(this.baseUrl + 'SixsRecord/getaudittype1bysixs');
  }

  changeQuestionEditSixs(questionEditSixs: any) {
    this.questionEditSixSource.next(questionEditSixs);
  }

  saveQuestionEditSixs(questionEditSixs: ScoreRecordQuestion[]) {
    return this.http.post(this.baseUrl + 'AuditRate/update-score-record-detail', questionEditSixs);
  }

  getListMail(line: string) {
    return this.http.get<any>(this.baseUrl + 'auditRecD/getListMail', { params: { line } });
  }
}
