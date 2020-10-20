import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Brand } from '../_model/brand';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  brandSource = new BehaviorSubject<Object>({});
  flagSource = new BehaviorSubject<Object>('0');

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
