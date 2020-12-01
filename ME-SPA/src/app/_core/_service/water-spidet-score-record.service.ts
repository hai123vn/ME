import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuditRateSearch } from '../_model/audit-rate-search';
import { AuditType } from '../_model/audit-type';
import { PaginationResult } from '../_model/pagination';
import { ScoreRecordDetail } from '../_model/score-record-detail';
import { AuditRateModel, ScoreRecordQuestion } from '../_model/score-record-question';
import { AuditRateWaterSpider } from '../_model/water-spider-score-record';

@Injectable({
  providedIn: 'root'
})
export class WaterSpidetScoreRecordService {
  baseUrl = environment.apiUrl;
  questionEditWaterSpiderSource = new BehaviorSubject<any>([]);
  currentQuestionEditWaterSpider = this.questionEditWaterSpiderSource.asObservable();
  constructor(
    private http: HttpClient
  ) { }
  search(page?, itemsPerPage?, auditRateSearch?: AuditRateSearch): Observable<PaginationResult<AuditRateWaterSpider[]>> {
    const paginatedResult: PaginationResult<AuditRateWaterSpider[]> = new PaginationResult<AuditRateWaterSpider[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    let url = this.baseUrl + 'WaterSpiderRecord/waterspider-list';
    return this.http.post<any>(url, auditRateSearch, { observe: 'response', params }).pipe(
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
    return this.http.post(this.baseUrl + 'WaterSpiderRecord/ExportExcelWaterSpider', auditRateSearch, { responseType: 'blob' }).
      subscribe((result: Blob) => {
        if (result.type !== 'application/xlsx') {
          alert(result.type);
        }
        const blob = new Blob([result]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const currentTime = new Date();
        const filename = 'WaterSpider_Score_Record' + currentTime.getFullYear().toString() + (currentTime.getMonth() + 1) + currentTime.getDate() + currentTime.toLocaleTimeString().replace(/[]|[,]|[:]/g, '').trim() + '.xlsx';
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      });
  }

  exportExcelDetail(recordId: string) {
    return this.http.get(this.baseUrl + 'WaterSpiderRecord/ExportExcelScoreRecordDetail', { responseType: 'blob', params: { recordId: recordId } }).subscribe((result: Blob) => {
      if (result.type != 'application/xlsx') {
        alert(result.type);
      }
      const blob = new Blob([result]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      const currentTime = new Date();
      const fileName = 'WaterSpider_Score_Record' + currentTime.getFullYear().toString() + (currentTime.getMonth() + 1) + currentTime.getDate() + currentTime.toLocaleTimeString().replace(/[]|[,]|[:]/g, '').trim() + '.xlsx';
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    });
  }

  getQuestion(auditTypeId: string) {
    return this.http.get<ScoreRecordQuestion[]>(this.baseUrl + 'AuditRate/GetListQuesRecord', { params: { auditTypeId: auditTypeId } });
  }
  getBrandByWaterSpider() {
    return this.http.get<string[]>(this.baseUrl + 'WaterSpiderRecord/getbrandbywaterspider');
  }
  getAuditTypeByBrandByWaterSpider(brand: string) {
    return this.http.get<AuditType[]>(this.baseUrl + 'WaterSpiderRecord/getaudittypebybrandbywaterspider', { params: { brand: brand } });
  }
  getAuditType1ByWaterSpider() {
    return this.http.get<string[]>(this.baseUrl + 'WaterSpiderRecord/getaudittype1bywaterspider');
  }
  saveScoreRecord(param: AuditRateModel) {
    return this.http.post(this.baseUrl + 'AuditRate/save', param);
  }

  getDetailScoreRecord(recordId: string) {
    return this.http.get<ScoreRecordDetail>(this.baseUrl + 'AuditRate/detail/' + recordId);
  }

  uploadPicture(formData: FormData) {
    return this.http.post(this.baseUrl + 'AuditRate/upload', formData);
  }

  changeQuestionEditWaterSpider(questionEditSME: any) {
    this.questionEditWaterSpiderSource.next(questionEditSME);
  }

  saveQuestionEditWaterSpider(questionEditWaterSpider: ScoreRecordQuestion[]) {
    return this.http.post(this.baseUrl + 'AuditRate/update-score-record-detail', questionEditWaterSpider);
  }
}
