import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { localeData } from 'moment';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuditPicD } from '../_model/audit-pic-d';
import { AuditPicM } from '../_model/audit-pic-m';
import { Pagination, PaginationResult } from '../_model/pagination';
import { AlertifyService } from './alertify.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  })
}
@Injectable({
  providedIn: 'root'
})
export class AuditPicDService {
  baseUrl = environment.apiUrl;
  auditPicDSource = new BehaviorSubject<Object>({});
  currentAuditPicD = this.auditPicDSource.asObservable();
  flagSource = new BehaviorSubject<string>('0');
  currentFlag = this.flagSource.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  getListAll(page?, itemPerPage?): Observable<PaginationResult<AuditPicD[]>> {
    const paginatedResult: PaginationResult<AuditPicD[]> = new PaginationResult<AuditPicD[]>();
    let params = new HttpParams;
    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
    }
    return this.http.get<AuditPicD[]>(this.baseUrl + 'auditPicD', { observe: 'response', params })
      .pipe(map(
        response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
  }

  search(page?, itemPerPage?, text?): Observable<PaginationResult<AuditPicD[]>> {
    const paginatedResult: PaginationResult<AuditPicD[]> = new PaginationResult<AuditPicD[]>();
    let params = new HttpParams;
    if (page != null && itemPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemPerPage);
      return this.http.get<AuditPicD[]>(this.baseUrl + 'auditPicD/search/' + text, { observe: 'response', params })
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
  }

  getAllPdPic() {
    return this.http.get(this.baseUrl + 'auditPicD/allPdPic', {});
  }
  getAllMePic() {
    return this.http.get(this.baseUrl + 'auditPicD/allMePic', {});
  }
  getPdPicByID(text: string) {
    return this.http.get(this.baseUrl + 'auditPicD/allPdPicByID/' + text, {});
  }
  getMePicByID(text: string) {
    return this.http.get(this.baseUrl + 'auditPicD/allMePicByID/' + text, {});
  }
  getBuildingByID(text: string) {
    return this.http.get(this.baseUrl + 'auditPicD/allBuildingByID/' + text, {});
  }
  getPdDepartment(text: any) {
    const url = this.baseUrl + 'auditPicD/PdDepartment/' + text;
    return this.http.get<any>(url, {});
  }

  getPbBuilding(text: any) {
    const url = this.baseUrl + 'auditPicD/getPdBuilding/' + text;
    return this.http.get<any>(url, {});
  }

  create(auditPicD: AuditPicD) {
    return this.http.post(this.baseUrl + 'auditPicD/create/', auditPicD);
  }

  update(auditPicD: AuditPicD) {
    return this.http.post(this.baseUrl + 'auditPicD/update/', auditPicD);
  }

  delete(model: AuditPicD) {
    return this.http.post(this.baseUrl + 'auditPicD/delete/', model);
  }

  changeAuditPicD(auditPicD: AuditPicD) {
    this.auditPicDSource.next(auditPicD);
  }

  changeFlag(flag: string) {
    this.flagSource.next(flag);
  }
}
