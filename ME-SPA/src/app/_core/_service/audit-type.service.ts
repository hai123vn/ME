import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuditType } from '../_model/audit-type';
import { AuditType1 } from '../_model/audit-type1';
import { Pagination, PaginationResult } from '../_model/pagination';

@Injectable({
  providedIn: 'root'
})
export class AuditTypeService {
  baseUrl = environment.apiUrl;
  auditTypeSource = new BehaviorSubject<Object>({});
  currentAuditType = this.auditTypeSource.asObservable();
  flagSource = new BehaviorSubject<string>('0');
  currentFlag = this.flagSource.asObservable();
  constructor(private http: HttpClient) { }

  getListAll(page?, itemsPerPage?): Observable<PaginationResult<AuditType[]>> {
    const paginatedResult: PaginationResult<AuditType[]> = new PaginationResult<AuditType[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumer', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<AuditType[]>(this.baseUrl + 'auditType', { observe: 'response', params })
      .pipe(
        map(response => {
          console.log(response);
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
  }

  search(page?, itemsPerPage?, text?): Observable<PaginationResult<AuditType[]>> {
    const paginatedResult: PaginationResult<AuditType[]> = new PaginationResult<AuditType[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<AuditType[]>(this.baseUrl + 'auditType/search/' + text, { observe: 'response', params })
      .pipe(
        map(response => {
          console.log(response);
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination =JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
  }

  create(auditType: AuditType) {
    return this.http.post(this.baseUrl + 'auditType/create', auditType);
  }

  upgrade(auditType: string) {
    return this.http.post(this.baseUrl + 'auditType/upgrade', auditType);
  }

  getAuditTypeVersion() {
    return this.http.get<any>(this.baseUrl + 'auditType/auditTypeVersion', {});
  }

  getAlls() {
    return this.http.get<any>(this.baseUrl + 'auditType/all', {});
  }

  getAllAuditType1() {
    return this.http.get<string[]>(this.baseUrl + 'auditType/allAuditType1', {});
  }

  getAuditByAuditType1(auditType1: AuditType1): Observable<any> {
    let url = this.baseUrl + 'auditType/searchaudit';
    return this.http.post<AuditType1>(url, auditType1).pipe(shareReplay());
  }

  changeStatus(id: number) {
    return this.http.post(this.baseUrl + 'auditType/' + id + '/changeStatus', {});
  }

  update(auditType: AuditType) {
    return this.http.post(this.baseUrl + 'auditType/edit/', auditType);
  }

  delete(id: string) {
    return this.http.post(this.baseUrl + 'auditTyep/delete' + id, {});
  }

  changeAuditType(auditType: AuditType) {
    this.auditTypeSource.next(auditType);
  }

  changeFlag(flag: string) {
    this.flagSource.next(flag);
  }
}
