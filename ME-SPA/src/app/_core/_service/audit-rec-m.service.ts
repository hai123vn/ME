import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuditRecM } from '../_model/audit-rec-m';
import { AuditRecMAdd } from '../_model/audit-rec-m-add';
import { Pagination, PaginationResult } from '../_model/pagination';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
}
@Injectable({
  providedIn: 'root'
})
export class AuditRecMService {
  baseUrl = environment.apiUrl;
  auditRecMSource = new BehaviorSubject<Object>({});
  currentAuditRecM = this.auditRecMSource.asObservable();
  flagSource = new BehaviorSubject<string>('0');
  currentFlag = this.flagSource.asObservable();

  constructor(private http: HttpClient) { }

  getListAll(page?, itemPerPage?): Observable<PaginationResult<AuditRecM[]>> {
    const paginationResult: PaginationResult<AuditRecM[]> = new PaginationResult<AuditRecM[]>();
    let params = new HttpParams();
    if (page != null && itemPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSiz", itemPerPage);
    }
    return this.http.get<AuditRecM[]>(this.baseUrl + 'auditRecM/RecMs/', { observe: 'response', params })
      .pipe(
        map(response => {
          paginationResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginationResult;
        }),
      );
  }

  getListRecordID() {
    return this.http.get<any>(this.baseUrl + 'auditRecM/recordIDs', {});
  }

  getListBuilding() {
    return this.http.get<any>(this.baseUrl + 'auditRecM/buildings', {});
  }

  getListLine() {
    return this.http.get<any>(this.baseUrl + 'auditRecM/lines', {});
  }

  getListModelName() {
    return this.http.get<any>(this.baseUrl + 'auditRecM/modelNames', {});
  }

  getListModelNo() {
    return this.http.get<any>(this.baseUrl + 'auditRecM/modelNos', {});
  }

  getListPDC() {
    return this.http.get<any>(this.baseUrl + 'auditRecM/pdcs')
  }

  create(auditRecM: any) {
    return this.http.post(this.baseUrl + 'auditRecM/create', auditRecM);
  }

  update(auditRecM: AuditRecMAdd) {
    return this.http.post(this.baseUrl + 'auditRecM/edit/', auditRecM);
  }

  setStringRecordID(dateString: string) {
    const arrTime = new Date(dateString);
    const year = arrTime.getFullYear().toString();
    const arrYear = year.split('');
    const y = arrYear[2].toString() + arrYear[3].toString();
    const month = (arrTime.getMonth() + 1).toString();

    let arrMonth = month.split('');

    let count = arrMonth.length;
    let m = '';
    if (count === 1) {
      m = '0' + month.toString();
    } else {
      m = arrMonth[0].toString() + arrMonth[1].toString();
    }
    return 'REC' + y + m;
  }

  importExcel(files: FormData, userName: string) {
    return this.http.post(this.baseUrl + 'auditRecM/importExcel/' + userName, files);
  }

  changeAuditRecM(auditRecM: AuditRecM) {
    this.auditRecMSource.next(auditRecM);
  }

  changeFlag(flag: string) {
    this.flagSource.next(flag);
  }

  getAuditRecMById(recordID: string) {
    return this.http.get(this.baseUrl + 'auditRecM/getbyid/' + recordID);
  }
}
