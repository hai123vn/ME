import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Environment } from '@angular/compiler-cli/src/ngtsc/typecheck/src/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuditPicM } from '../_model/audit-pic-m';
import { Pagination, PaginationResult } from '../_model/pagination';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorizetion': 'Bearer ' + localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuditPicMService {
  baseUrl = environment.apiUrl;
  auditPicMSource = new BehaviorSubject<Object>({});
  currentAuditPicM = this.auditPicMSource.asObservable();
  flagSource = new BehaviorSubject<string>('0');
  currentFlag = this.flagSource.asObservable();
  constructor(private http: HttpClient) { }

  getListAll(page?, itemPerPage?): Observable<PaginationResult<AuditPicM[]>> {
    const paginatedResult: PaginationResult<AuditPicM[]> = new PaginationResult<AuditPicM[]>();
    let param = new HttpParams;
    if (page != null && itemPerPage != null) {
      param = param.append('pageNumber', page);
      param = param.append('pageSize', itemPerPage);
    }
    return this.http.get<AuditPicM[]>(this.baseUrl + 'auditPicM', { observe: 'response' })
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

  search(page?, itemPerPage?, text?): Observable<PaginationResult<AuditPicM[]>> {
    const paginatedResult: PaginationResult<AuditPicM[]> = new PaginationResult<AuditPicM[]>();
    let params = new HttpParams;
    if (page != null && itemPerPage != null) {
      params = params.append('PageNumber', page);
      params = params.append('PageSize', itemPerPage);
    }

    return this.http.get<AuditPicM[]>(this.baseUrl + 'auditPicM/search/' + text, { observe: 'response', params })
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

  create(auditpicM: AuditPicM)
  {
    return this.http.post(this.baseUrl + 'auditPicM/create', auditpicM);
  }

  delete(id: string)
  {
    return this.http.post(this.baseUrl + 'auditPicM/delete' + id , {});
  }

  update(auditPicM : AuditPicM)
  {
    return this.http.post(this.baseUrl + 'auditPicM/update', auditPicM);
  }

  getAll():Observable<AuditPicM[]> {
    return this.http.get<AuditPicM[]>(this.baseUrl + 'auditPicM/all', {});
  }

  changeAuditPicM(auditPicm : AuditPicM)
  {
    this.auditPicMSource.next(auditPicm);
  }

  changeFlag(flag: string)
  {
    this.flagSource.next(flag);
  }
}
