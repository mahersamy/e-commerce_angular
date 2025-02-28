import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../core/token/api-token';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(API_BASE_URL);
  


  getAllBrands():Observable<any>{
    return  this._httpClient.get(`${this._BASE_URL}/brands`);
  }
  
}
