import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuditRecD } from '../_model/audit-rec-d';
import { AuditRecSearch } from '../_model/audit-rec-search';
import { AuditRecViewModel } from '../_model/audit-rec-viewmodel';
import * as ExcelJS from "exceljs/dist/exceljs";
import { PaginationResult } from '../_model/pagination';
import * as fs from "file-saver";
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
      const headers1 = [
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
      const worksheet = workbook.addWorksheet("AuditRecM");
      const worksheet1 = workbook.addWorksheet("AuditRecD");
      //Add header Row
      const headerRow = worksheet.addRow(headers);
      const headerRow1 = worksheet.addRow(headers1);
      //Cell style: Fill and Border
      headerRow.font = {
        size: 12,
      };

      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "33ff33" },
          bfColor: { argb: "33ff33" },
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      headerRow1.font = {
        size: 12,
      };
      headerRow1.eachCell((cell, number) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "33ff33" },
          bgColor: { argb: "33ff33" },
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      // Add Data and Conditional Formatting
      arr.forEach((d) => {
        const row = worksheet.addRow(d);
      });
      arr1.forEach((d) => {
        const row = worksheet1.addRow(d);
      });
      worksheet.getColumn(1).width = 17;
      worksheet.getColumn(2).width = 17;
      worksheet.getColumn(6).width = 15;
      worksheet.getColumn(6).width = 13;
      worksheet.getColumn(6).width = 13;
      worksheet.getColumn(10).width = 30;
      worksheet1.getColumn(1).width = 13;
      worksheet1.getColumn(2).width = 10;
      worksheet1.getColumn(4).width = 14;
      worksheet1.getColumn(6).width = 30;
      worksheet1.getColumn(7).width = 30;
      worksheet1.getColumn(8).width = 30;
      worksheet1.getColumn(11).width = 17;
      worksheet1.getColumn(12).width = 20;
      worksheet1.getColumn(13).width = 17;
      worksheet1.getColumn(14).width = 17;
      worksheet1.getColumn(15).width = 17;
      worksheet1.getColumn(16).width = 20;
      worksheet1.getColumn(17).width = 20;
      worksheet1.getColumn(18).width = 20;
      const countAudit = arr1.length;
      for (let i = 0; i < countAudit + 2; i++) {
        worksheet.getCell("J" + i).alignment = { wrapText: true };
        worksheet1.getCell("F" + i).alignment = { wrapText: true };
        worksheet1.getCell("G" + i).alignment = { wrapText: true };
        worksheet1.getCell("H" + i).alignment = { wrapText: true };
        worksheet1.getCell("J" + i).alignment = { wrapText: true };
        worksheet1.getCell("R" + i).alignment = { wrapText: true };
      }
      //Tạo tệp Excel với tên đã cho
      workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        fs.saveAs(blob, "ME_Detail.xlsx");
      });
    });
  }

  async exportWTTracking(auditRecSearch: AuditRecSearch) {
    return this.http.post(this.baseUrl + "auditRecD/ExportExcelWTTrackingList", auditRecSearch, { responseType: "blob" }).subscribe((result: Blob) => {
      console.log(result);
      if (result.type !== "application/xlsx") {
        alert(result.type);
      }
      const blob = new Blob([result]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      const currentTime = new Date();
      const filename = "WT_Tracking_List" + currentTime.getFullYear().toString() + (currentTime.getMonth() + 1) + currentTime.getDate() + currentTime.toLocaleDateString().replace(/[ ]|[,],[:]/g, "").trim() + " .xlsx";
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    });
  }

  async getSearchExcel(auditRecSearch: AuditRecSearch) {
    let url = this.baseUrl + "auditRecD/SearchExcel/";
    this.http.post<any>(url, auditRecSearch).subscribe((res) => {
      const header = [
        "Record_ID",
        "Record_Time",
        "PDC",
        "Building",
        "Line",
        "Model_Name",
        "Model_No",
        "Chief",
        "Recorder",
        "Attendees",
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
        "Updated_By",
        "Updated_Time",
      ];
      this.searchAuditRecD = res;
      this.searchAuditRecD.map((item) => {
        delete item.audit_Type_ID;
        delete item.before_Picture;
        delete item.after_Picture;
      });

      let arr = [];
      this.searchAuditRecD.forEach((item) => {
        let itemConvert = [];
        itemConvert[0] = item.record_ID;
        itemConvert[1] = this.dateFormat(item.record_Time);
        itemConvert[2] = item.pdc;
        itemConvert[3] = item.building;
        itemConvert[4] = item.line;
        itemConvert[5] = item.model_Name;
        itemConvert[6] = item.model_No;
        itemConvert[7] = item.chief;
        itemConvert[8] = item.recorder;
        itemConvert[9] = item.attendees;
        itemConvert[10] = item.item_no;
        itemConvert[11] = item.ercs;
        itemConvert[12] = item.audit_Type;
        itemConvert[13] = item.audit_Item;
        itemConvert[14] = item.issue_ZW;
        itemConvert[15] = item.issue_LL;
        itemConvert[16] = item.issue_EN;
        itemConvert[17] = item.pD_PIC;
        itemConvert[18] = item.pD_Department;
        itemConvert[19] = item.pD_Building;
        itemConvert[20] = item.mE_PIC;
        itemConvert[21] = this.dateFormat(item.finished_Date);
        itemConvert[22] = item.status;
        itemConvert[23] = item.remark;
        itemConvert[24] = item.updated_By;
        itemConvert[25] = item.updated_Time;
        itemConvert[26] = item.implement_User;
        itemConvert[27] = this.dateFormat(item.implement_Time);
        arr.push(itemConvert);
      });
      //Create workboot and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("ME");
      // Add header Row
      const headerRow = worksheet.addRow(header);
      //Cell style: Fill and Border
      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "33ff33" },
          bgColor: { argb: "33ff33" },
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" }
        };
      });
      // add data and conditional formatting
      arr.forEach((d) => {
        const row = worksheet.addRow(d);
      });
      worksheet.getColumn(1).width = 17;
      worksheet.getColumn(2).width = 17;
      worksheet.getColumn(3).width = 17;
      worksheet.getColumn(6).width = 15;
      worksheet.getColumn(6).width = 13;
      worksheet.getColumn(10).width = 30;
      worksheet.getColumn(15).width = 30;
      worksheet.getColumn(16).width = 30;
      workbook.getColumn(17).width = 30;
      workbook.getColumn(21).width = 17;
      workbook.getColumn(24).width = 17;
      workbook.getColumn(25).width = 17;
      workbook.getColumn(26).width = 17;
      workbook.getColumn(27).width = 20;
      const countAudit = arr.length;
      for (let i = 1; i < countAudit + 2; i++) {
        worksheet.getCell("K" + i).alignment = { wrapText: true };
        worksheet.getCell("O" + i).alignment = { wrapText: true };
        worksheet.getCell("P" + i).alignment = { wrapText: true };
        worksheet.getCell("Q" + i).alignment = { wrapText: true };
      }
      // Generate Excel File with given name
      workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        fs.saveAs(blob, "ME.xlsx");
      });
    });
  }

  getListStatus() {
    return this.http.get<any>(this.baseUrl + "auditRecD/status", {});
  }

  changeAuditRecD(auditRecD: AuditRecD) {
    this.auditRecDSource.next(auditRecD);
  }

  changeFlag(flag: string) {
    this.flagSource.next(flag);
  }

  getAuditRecDById(recordID: string, item_no: string) {
    return this.http.get(this.baseUrl + "auditRecD/getbyid" + recordID + "/" + item_no);
  }

  getListMail(line: string) {
    return this.http.get<any>(this.baseUrl + "auditRecD/getListMail", {params: {line: line}});
  }
}
