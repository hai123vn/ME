import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuditRecD } from '../_model/audit-rec-d';
import { AuditRecSearch } from '../_model/audit-rec-search';
import { AuditRecViewModel } from '../_model/audit-rec-viewmodel';
import * as ExcelJS from "exceljs/dist/exceljs";
import { Pagination, PaginationResult } from '../_model/pagination';
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: "Bearer " + localStorage.getItem("token"),
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuditRecDService {
  baseUrl = environment.apiUrl;
  auditRecDSource = new BehaviorSubject<Object>({
    status: '',
    finished_Date: null,
    record_ID: '',
    ercs: '',
    audit_Type_ID: '',
    audit_Item: '',
    pD_PIC: '',
    pD_Building: '',
    mE_PIC: '',
    issue_LL: '',
    issue_EN: '',
    issue_ZW: '',
    remark: '',
    before_Picture: '',
    after_Picture: ''
  });
  currentAuditRecD = this.auditRecDSource.asObservable();
  flagSource = new BehaviorSubject<string>('0');
  currentFlag = this.flagSource.asObservable();
  allAuditRecD: AuditRecViewModel[] = [];
  searchAuditRecD: AuditRecViewModel[] = [];

  constructor(private http: HttpClient) { }

  getListRecDs(page?, itemPerPage?): Observable<PaginationResult<AuditRecD[]>> {
    const paginationResult: PaginationResult<AuditRecD[]> = new PaginationResult<AuditRecD[]>();
    let params = new HttpParams();
    if (page != null && itemPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSiz", itemPerPage);
    }
    return this.http.get<AuditRecD[]>(this.baseUrl + "auditRecD/recDs/", {
      observe: "response",
      params,
    }).pipe(
      map((response) => {
        paginationResult.result = response.body;
        if (response.headers.get("Pagination") != null) {
          paginationResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }
        return paginationResult;
      })
    );
  }

  getListAll(page?, itemPerPage?): Observable<PaginationResult<AuditRecViewModel[]>> {
    const paginationResult: PaginationResult<AuditRecViewModel[]> = new PaginationResult<AuditRecViewModel[]>();
    let params = new HttpParams();
    if (page != null && itemPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", page);
    }

    return this.http.get<AuditRecViewModel[]>(this.baseUrl + "auditRecD/all", {
      observe: "response",
      params,
    })
      .pipe(
        map((response) => {
          paginationResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            paginationResult.pagination = JSON.parse(response.headers.get("Pagination"));
          }
          return paginationResult;
        })
      );
  }

  search(page?, itemPerPage?, auditRecSearch?: AuditRecSearch): Observable<PaginationResult<AuditRecViewModel[]>> {
    const paginationResult: PaginationResult<AuditRecViewModel[]> = new PaginationResult<AuditRecViewModel[]>();
    let params = new HttpParams();
    if (page != null && itemPerPage != null) {
      params.append("pageNumber", page);
      params.append("pageSize", itemPerPage);
    }

    let url = this.baseUrl + "auditRecD/searchModel/";
    return this.http.post<any>(url, auditRecSearch, { observe: "response" })
      .pipe(
        map((response) => {
          paginationResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            paginationResult.pagination = JSON.parse(response.headers.get("Pagination"));
          }
          return paginationResult;
        })
      );
  }

  dateFormat(today: Date) {
    if (today === null || today === undefined) {
      return null;
    } else {
      let arr = today.toString().split("T");
      let result = arr[0] + " " + arr[1];
      return result;
    }
  }

  createAuditRecD(auditRecD: AuditRecD) {
    console.log(auditRecD);
    console.log("let go img64: ", auditRecD);
    return this.http.post(this.baseUrl + "auditRecD/addnew/", auditRecD);
  }

  update(auditRecD: AuditRecD, before: boolean, after: boolean) {
    console.log(auditRecD);
    return this.http.post(this.baseUrl + "auditRecD/edit/" + before + "/" + after, auditRecD);
  }
  async exportExcelDetail(auditRecSearch: AuditRecSearch) {
    let url = this.baseUrl + "auditRecD/SearchExcel/";
    this.http.post<any>(url, auditRecSearch).subscribe((res) => {
      const headers = [
        "Record_ID",
        "Record_Time",
        "PDC",
        "Building",
        "Line",
        "Model_Name",
        "Model_No",
        "Chief",
        "Recorder",
        "Attendees"
      ];
      const header1 = [
        "Record_ID",
        "Item_No",
        "ERCS",
        "Audit_Type",
        "Audit_Item",
        "Issue_ZW",
        "Issue_LL",
        "Issue_EN",
        "PD_PIC",
        "PD_Department",
        "PD_Building",
        "ME_PIC",
        "Finished_Date",
        "Status",
        "Remark",
        "Updated_By",
        "Updated_Time",
        "Implement_By",
        "Implement_Time",
      ];
      this.allAuditRecD = res;
      this.allAuditRecD.map((item) => {
        delete item.audit_Type_ID;
        delete item.before_Picture;
        delete item.after_Picture;
      });
      let arr = [];
      let arr1 = [];

      this.allAuditRecD.forEach((item) => {
        let bool = false;
        for (let i = 1; i < arr.length; i++) {
          if (arr[i - 1][0] == item.record_ID) {
            bool = true;
            break;
          }
        }
        let itemConvert = [];
        let itemConvert1 = [];
        if (bool == false) {
          itemConvert[0] = item.record_ID,
            itemConvert[1] = this.dateFormat(item.record_Time);
          itemConvert[2] = item.pdc;
          itemConvert[3] = item.building;
          itemConvert[4] = item.line;
          itemConvert[5] = item.model_Name;
          itemConvert[6] = item.model_No;
          itemConvert[7] = item.chief;
          itemConvert[8] = item.recorder;
          itemConvert[9] = item.attendees;
          arr.push(itemConvert);
        }

        itemConvert1[0] = item.record_ID,
          itemConvert1[1] = item.item_no;
        itemConvert1[2] = item.ercs;
        itemConvert1[3] = item.audit_Type;
        itemConvert1[4] = item.audit_Item;
        itemConvert1[5] = item.issue_ZW;
        itemConvert1[6] = item.issue_LL;
        itemConvert1[7] = item.issue_EN;
        itemConvert1[8] = item.pD_PIC;
        itemConvert1[9] = item.pD_Department;
        itemConvert1[10] = item.pD_Building;
        itemConvert1[11] = item.mE_PIC;
        itemConvert1[12] = this.dateFormat(item.finished_Date);
        itemConvert1[13] = item.status;
        itemConvert1[14] = item.remark;
        itemConvert1[15] = item.updated_By;
        itemConvert1[16] = this.dateFormat(item.updated_Time);
        itemConvert1[17] = item.implement_User;
        itemConvert1[18] = this.dateFormat(item.implement_Time);
        arr1.push(itemConvert1);
      });

      //Create workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("ME");
      //Add header Row
      const headerRow = worksheet.addRow(headers);
      //Cell style: Fill and Border
      headerRow.font = {
        size : 12,
      };
      
      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "33ff33"},
          bfColor: {argb: "33ff33"},
        };
        cell.border = {
          top: { style: "thin"},
          left: {style: "thin"},
          bottom: {style:"thin"},
          right: {style: "thin"},
        };
      });
    })
  }

}
