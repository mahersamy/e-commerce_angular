import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { API_BASE_URL } from '../../../core/token/api-token';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _BASE_URL = inject(API_BASE_URL);
  cartNumber:WritableSignal<number>=signal(0);

  token = typeof window !== 'undefined' ? localStorage.getItem("userToken")! : '';


  addToCart(productId: string): Observable<any> {
    return this._httpClient.post(`${this._BASE_URL}/cart`, { productId },
      {
        headers: {
          token: this.token
        }
      }
    )
  }

  updateProductQuanitity(productId: string, count: string): Observable<any> {
    return this._httpClient.put(`${this._BASE_URL}/cart/${productId}`, { count }, {
      headers: {
        token: this.token
      }
    }
    )
  }


  getLoggedUserCart(): Observable<any> {
    return this._httpClient.get(`${this._BASE_URL}/cart`,{
      headers:{
        token:this.token
      }
    })
  }


 deleteProductFromCart(productId: string): Observable<any> {
    return this._httpClient.delete(`${this._BASE_URL}/cart/${productId}`, {
      headers: {
        token: this.token
      }
    }
    )
  }


  clearCart(): Observable<any> {
    return this._httpClient.delete(`${this._BASE_URL}/cart`,{
      headers:{
        token:this.token
      }
    })
  }




}
