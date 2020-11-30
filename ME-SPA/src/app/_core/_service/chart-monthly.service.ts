import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartMonthlyService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTypes() {
    return this.http.get<any>(this.baseUrl + 'chartMonthly/types', {});
  }

  getChartByMonthly(param: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'chartMonthly/chartMonthly', param, {});
  }
  getChartByMonthlyPrevious() {
    return this.http.get<any>(this.baseUrl + 'chartMonthly/getChartPreviousMonth/', {});
  }
  sendMail() {
    return this.http.get<any>(this.baseUrl + 'chartMonthly/sendMail', {});
  }
}
