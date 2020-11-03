import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Brand } from '../_model/brand';
import { HttpClient, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable, } from 'rxjs';
import { PaginationResult } from '../_model/pagination';
import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  brandSource = new BehaviorSubject<Object>({});
  currentBrand = this.brandSource.asObservable();
  flagSource = new BehaviorSubject<string>('0');
  currentFlag = this.flagSource.asObservable();
  private _refreshNeeded = new Subject<void>();

  getBrands(page?, itemsPerPage?): Observable<PaginationResult<Brand[]>> {

    const paginatedResult: PaginationResult<Brand[]> = new PaginationResult<Brand[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Brand[]>(this.baseUrl + 'brand', { observe: 'response', params })
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

  get refreshNeeded() {
    return this._refreshNeeded;
  }


  search(page?, itemsPerPage?, text?): Observable<PaginationResult<Brand[]>> {
    const paginatedResult: PaginationResult<Brand[]> = new PaginationResult<Brand[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pagaSize', itemsPerPage);
    }

    return this.http.get<Brand[]>(this.baseUrl + 'brand/search/' + text, { observe: 'response', params })
      .pipe(
        map(response => {
          console.log(response);
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      )
  }

  createBrand(brand: Brand) {
    // Tao moi Brand
    return this.http.post(this.baseUrl + 'brand/create', brand);
  }
  // lay tat ca danh sach Brand
  getAllBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'brand/all', {});
  }
  // cap nhat Brand
  updateBrand(brand: Brand) {
    return this.http.put(this.baseUrl + 'brand/edit', brand);
  }
  // xoa Brand 
  deleteBrand(id: string) {
    return this.http.post(this.baseUrl + 'brand/delete/' + id, {});
  }

  changeBrand(brand: Brand) {
    this.brandSource.next(brand);
  }

  changeFlag(flag: string) {
    this.flagSource.next(flag);
  }
}
