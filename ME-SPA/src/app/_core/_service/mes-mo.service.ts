import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MesMoService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getModelNo() {
    return this.http.get<any>(this.baseUrl + 'mesMo/allModelNo', {});
  }
  getModelName(text: any){
    const url = this.baseUrl + 'mesMo/getModelName/' + text;
    return this.http.get<any>(url, {});
  }
}
