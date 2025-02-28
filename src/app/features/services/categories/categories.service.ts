import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../core/token/api-token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly _httpClient=inject(HttpClient);
  private readonly _BASE_URL=inject(API_BASE_URL);
  token = localStorage.getItem("userToken")!;


  getAllCategories():Observable<any>{
      return  this._httpClient.get(`${this._BASE_URL}/categories`);
    }
    
}
