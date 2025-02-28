import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../core/token/api-token';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly _httpClient=inject(HttpClient);
  private readonly _BASE_URL=inject(API_BASE_URL);
  token = localStorage.getItem("userToken")!;



  cashOrder(id:string,shippingAddress:{details:String,phone:string,city:string}):Observable<any>{
    return this._httpClient.post(`${this._BASE_URL}/orders/${id}`,{shippingAddress},{
      headers:{
        token:this.token
      }
    });
  }


  getAllOrders():Observable<any>{
    return this._httpClient.get(`${this._BASE_URL}/orders`);
  }

  getAllUsersOrders(id:string):Observable<any>{
    return this._httpClient.get(`${this._BASE_URL}/orders/user/${id}`);
  }

  onlinePayment(id:string,shippingAddress:{details:String,phone:string,city:string}):Observable<any>{
    return this._httpClient.post(`${this._BASE_URL}/orders/checkout-session/${id}?url=http://localhost:3000`,{shippingAddress},{
      headers:{
        token:this.token
      }
    });
  }





}
