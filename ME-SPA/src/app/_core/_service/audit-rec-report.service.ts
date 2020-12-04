import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuditRateSearch } from '../_model/audit-rate-search';
import { AuditRecSearch } from '../_model/audit-rec-search';
import * as ExcelJS from "exceljs/dist/exceljs";
import * as fs from "file-saver";
import { AuditRecViewModel } from '../_model/audit-rec-viewmodel';
import { PaginationResult } from '../_model/pagination';

@Injectable({
  providedIn: 'root'
})
export class AuditRecReportService {
  allAuditRecD: AuditRecViewModel[] = [];
  searchAuditRecD: AuditRecViewModel[] = [];
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  search(page?, itemsPerPage?, auditRecSearch?: AuditRecSearch): Observable<PaginationResult<AuditRecViewModel[]>> {
    const paginatedResult: PaginationResult<AuditRecViewModel[]> = new PaginationResult<AuditRecViewModel[]>();
    let params = new HttpParams;
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    let url = this.baseUrl + "WTTrackingReport/searchModel/";
    return this.http.post<any>(url, auditRecSearch, { observe: "response", params }).pipe(map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get("Pagination") != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"))
      }
      return paginatedResult;
    }));
  }
  async exportExcelDetail(auditRecSearch: AuditRecSearch) {
    let url = this.baseUrl + "WTTrackingReport/SearchExcel/";
    this.http.post<any>(url, auditRecSearch).subscribe(res => {
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
        "Implement_Time"
      ];
      this.allAuditRecD = res;
      this.allAuditRecD.map(item => {
        delete item.audit_Type_ID;
        delete item.before_Picture;
        delete item.after_Picture;
      });
      let arr = [];
      let arr1 = [];

      this.allAuditRecD.forEach(item => {
        let bool = false;
        for (let i = 1; i <= arr.length; i++) {
          if (arr[i - 1][0] == item.record_ID) {
            bool = true;
            break;
          }
        }
        let itemConvert = [];
        let itemConvert1 = [];
        if (bool == false) {
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
          arr.push(itemConvert);
        }

        itemConvert1[0] = item.record_ID;
        itemConvert1[1] = item.item_no;
        itemConvert1[2] = item.ercs;
        itemConvert1[3] = item.audit_Type;
        itemConvert1[4] = item.audit_Item;
        itemConvert1[5] = item.issue_ZW;
        itemConvert1[6] = item.issue_LL;
        itemConvert1[7] = item.issue_EN;
        itemConvert1[8] = item.pD_PIC;
        itemConvert1[9] = item.pD_Department;
        itemConvert[10] = item.pD_Building;
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

      // Create workbook and worksheet
      const workbook = new ExcelJS.WorkBook();
      const worksheet = workbook.addWorksheet("AuditRecM");
      const worksheet1 = workbook.addWorksheet("AuditRecD");
      // add header row
      const headerRow = worksheet.addRow(header);
      const headerRow1 = worksheet1.addRow(header);
      //Cell Style: Fill and Border
      headerRow.font = {
        size: 12
      };

      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "33ff33" },
          bgColor: { argb: "33ff33" }
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" }
        };
      });
      headerRow1.font = {
        size: 12
      };
      headerRow1.eachCell((cell, number) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "33ff33" },
          bgColor: { argb: "33ff33" }
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" }
        };
      });
      // Add Data and Conditional Formatting
      arr.forEach(d => {
        const row = worksheet.addRow(d);
      });
      arr1.forEach(d => {
        const row = worksheet.addRow(d);
      });
      worksheet.getColumn(1).with = 17;
      worksheet.getColumn(2).with = 17;
      worksheet.getColumn(3).with = 17;
      worksheet.getColumn(4).with = 20;
      worksheet.getColumn(6).with = 15;
      worksheet.getColumn(6).with = 13;
      worksheet.getColumn(6).with = 13;
      worksheet.getColumn(10).with = 30;
      worksheet.getColumn(1).with = 13;
      worksheet.getColumn(2).with = 10;
      worksheet.getColumn(4).with = 14;
      worksheet.getColumn(6).with = 30;
      worksheet.getColumn(7).with = 30;
      worksheet.getColumn(8).with = 30;
      worksheet.getColumn(11).with = 17;
      worksheet.getColumn(12).with = 20;
      worksheet.getColumn(13).with = 17;
      worksheet.getColumn(14).with = 17;
      worksheet.getColumn(15).with = 17;
      worksheet.getColumn(16).with = 20;
      worksheet.getColumn(17).with = 20;
      worksheet.getColumn(18).with = 20;
      const countAudit = arr1.length;
      for (let i = 0; i < countAudit + 2; i++) {
        worksheet.getCell("J" + i).alignment = { wrapText: true };
        worksheet.getCell("F" + i).alignment = { wrapText: true };
        worksheet.getCell("G" + i).alignment = { wrapText: true };
        worksheet.getCell("H" + i).alignment = { wrapText: true };
        worksheet.getCell("J" + i).alignment = { wrapText: true };
        worksheet.getCell("R" + i).alignment = { wrapText: true };
      }
      //Generate Excel File with given name
      workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        fs.saveAs(blob, "ME_Detail.xlsx");
      });
    });
  }
  async getSearchExcel(auditRecSearch: AuditRecSearch) {
    let url = this.baseUrl + "WTTrackingReport/SearchExcel";
    this.http.post<any>(url, auditRecSearch).subscribe(res => {
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
        "PD_Builing",
        "ME_PIC",
        "Finished_Date",
        "Status",
        "Remark",
        "Updated_By",
        "Updated_Time",
        "Implement_By",
        "Implement_Time"
      ];
      this.searchAuditRecD = res;
      this.searchAuditRecD.map(item => {
        delete item.audit_Type_ID;
        delete item.before_Picture;
        delete item.after_Picture;
      });
      let arr = [];
      this.searchAuditRecD.forEach(item => {
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
        itemConvert[14] = item.issue_EN;
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
      //Create workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet();
      //Add header Row
      const headerRow = worksheet.addRow(header);
      //Cell Style : Fill and Border
      headerRow.font = {
        size: 12
      };

      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgcolor: { argb: "33ff33" },
          bgcolor: { argb: "33ff33" },
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      //Add Data and Conditional Formating 
      arr.forEach(d => {
        const row = worksheet.addRow(d);
      });
      worksheet.getColumn(1).with = 17;
      worksheet.getColumn(2).with = 17;
      worksheet.getColumn(3).with = 17;
      worksheet.getColumn(6).with = 15;
      worksheet.getColumn(6).with = 13;
      worksheet.getColumn(10).with = 30;
      worksheet.getColumn(15).with = 30;
      worksheet.getColumn(16).with = 30;
      worksheet.getColumn(17).with = 30;
      worksheet.getColumn(21).with = 17;
      worksheet.getColumn(24).with = 17;
      worksheet.getColumn(25).with = 17;
      worksheet.getColumn(26).with = 17;
      worksheet.getColumn(27).with = 20;
      const countAudit = arr.length;
      for (let i = 1; i < countAudit + 2; i++) {
        worksheet.getCell("K" + i).alignment = { wrapText: true };
        worksheet.getCell("O" + i).alignment = { wrapText: true };
        worksheet.getCell("P" + i).alignment = { wrapText: true };
        worksheet.getCell("Q" + i).alignment = { wrapText: true };
      }
      //Generate Excel File with given name
      workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        fs.saveAs(blob, "ME.xlsx");
      });
    });
  }
  async exportWTTracking(auditRecSearch: AuditRecSearch) {
    return this.http.post(this.baseUrl + "WTTrackingReport/ExportExcelWTTrackingList", auditRecSearch, { responseType: "blob" }).subscribe((result: Blob) => {
      if (result.type !== "application/xlsx") {
        alert(result.type);
      }
      const blob = new Blob([result]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      const currentTime = new Date();
      const filename = "WT_Tracking_List" + currentTime.getFullYear().toString() + (currentTime.getMonth() + 1) + currentTime.getDate() + currentTime.toLocaleTimeString().replace(/[ ]|[,]|[:]/g, "").trim() + ".xlsx";
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    });
  }
  dateFormat(today: Date) {
    if (today === null || today === undefined) {
      return null;
    } else {
      let arr = today.toString().split("T");
      let result = arr[0] + "" + arr[1];
      return result;
    }
  }
  getListStatus() {
    return this.http.get<any>(this.baseUrl + "WTTrackingReport/status", {});
  }
}
