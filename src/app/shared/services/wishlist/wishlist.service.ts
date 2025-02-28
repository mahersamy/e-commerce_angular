import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../core/token/api-token';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
    private readonly _httpClient=inject(HttpClient);
    private readonly _BASE_URL=inject(API_BASE_URL);
    token = typeof window !== 'undefined' ? localStorage.getItem("userToken")! : '';



    getAllWishList(){
      return this._httpClient.get(`${this._BASE_URL}/wishlist`,{
        headers:{
          token: this.token
        }
      });
    }


    addProductToWishList(productId:string){
      return this._httpClient.post(`${this._BASE_URL}/wishlist`,{productId},{
        headers:{
          token: this.token
        }
      });
    }



    deleteProductToWishList(productId:string){
      return this._httpClient.delete(`${this._BASE_URL}/wishlist/${productId}`,{
        headers:{
          token: this.token
        }
      });
    }


    
}
