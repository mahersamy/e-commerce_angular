import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../core/token/api-token';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly _httpClient=inject(HttpClient);
  private readonly _BASE_URL=inject(API_BASE_URL);
  


  getProducts():Observable<any>{
    return this._httpClient.get(`${this._BASE_URL}/products`);
  }

  getProductById(id:string):Observable<any>{
    return this._httpClient.get(`${this._BASE_URL}/products/${id}`);
  }


  getRelatedProducts(id:string):Observable<any>{
    return this._httpClient.get(`${this._BASE_URL}/products/?category[in]=${id}`);
  }


  getPageOfProducts(page:number):Observable<any>{
    return this._httpClient.get(`${this._BASE_URL}/products?page=${page}`);
  }

}
