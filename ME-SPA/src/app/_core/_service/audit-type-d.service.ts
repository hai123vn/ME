import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { audit, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuditTypeD } from '../_model/audit-type-d';
import { AuditTypeDParam } from '../_model/audit-type-d-param';
import { Pagination, PaginationResult } from '../_model/pagination';

@Injectable({
  providedIn: 'root'
})
export class AuditTypeDService {
  baseUrl = environment.apiUrl;
  auditTypeDSource = new BehaviorSubject<any>({});
  currentAuditTypeD = this.auditTypeDSource.asObservable();
  flagSource = new BehaviorSubject<string>('0');
  currentFlag = this.flagSource.asObservable();

  constructor(private http: HttpClient) { }


  search(page?, itemsPerPage?, auditTypeDSearch?: AuditTypeDParam): Observable<PaginationResult<AuditTypeD[]>> {
    const paginationResult: PaginationResult<AuditTypeD[]> = new PaginationResult<AuditTypeD[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null)
      params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
    let url = this.baseUrl + 'auditTypeD/search';
    return this.http.post<any>(url, auditTypeDSearch, { observe: 'response', params }).
      pipe(
        map(response => {
          paginationResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginationResult;
        }),
      );
  }

  getAll(page?, itemsPerPage?): Observable<PaginationResult<AuditTypeD[]>> {
    const paginationResult: PaginationResult<AuditTypeD[]> = new PaginationResult<AuditTypeD[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null)
      params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
    let url = this.baseUrl + 'auditTypeD';
    return this.http.get<any>(url, { observe: 'response', params }).
      pipe(
        map(response => {
          paginationResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginationResult;
        }),
      );
  }

  searchauditItem(auditTypeId: any) {
    return this.http.get<any>(this.baseUrl + 'auditTypeD/auditItem/' + auditTypeId.toString(), {});
  }

  create(auditTypeD: FormData) {
    return this.http.post(this.baseUrl + 'auditTypeD/create', auditTypeD);
  }

  update(auditTypeD: FormData) {
    return this.http.post(this.baseUrl + 'auditTypeD/edit', auditTypeD);
  }

  delete(id1: string, id2: string) {
    return this.http.post(this.baseUrl + 'AuditTypeD/delete?id1=' + id1 + '&id2='+ id2, {});
  }

  changeAuditType(auditType: AuditTypeD) {
    this.auditTypeDSource.next(auditType);
  }

  changeFlag(flag: string) {
    this.flagSource.next(flag);
  }

  changeVisible(id: string, item: string) {
    debugger
    return this.http.post(this.baseUrl + 'auditTypeD/' + id + "/" + item + '/changeVisible', {});
  }

}
