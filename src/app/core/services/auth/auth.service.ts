import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser, LoginUser } from '../../interfaces/auth-user';
import { API_BASE_URL } from '../../token/api-token';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _httpClient=inject(HttpClient);
  private readonly _BASE_URL=inject(API_BASE_URL);
  userData:BehaviorSubject<any>=new BehaviorSubject('');


  registerUser(userInfo:AuthUser):Observable<any>{
    return this._httpClient.post(`${this._BASE_URL}/auth/signup`,userInfo)
  }
  
  loginUser(userInfo:LoginUser):Observable<any>{
    return this._httpClient.post(`${this._BASE_URL}/auth/signin`,userInfo)
  }

  saveUser(){
    if(localStorage.getItem("userToken")){
      this.userData.next(jwtDecode(localStorage.getItem("userToken")!)) 
    }
  }

  isLogedInUser(){
    
    if(typeof window !== 'undefined' && localStorage.getItem("userToken")){
      this.userData.next(jwtDecode(localStorage.getItem("userToken")!))
      return true;
    }else{
      return false;
    }
  }


  forgetPassword(email:string):Observable<any>{
    return this._httpClient.post(`${this._BASE_URL}/auth/forgotPasswords`,{email:email})
  }




  verifyResetCode(code:string):Observable<any>{
    return this._httpClient.post(`${this._BASE_URL}/auth/verifyResetCode`,{resetCode:code})
  }

  resetPassword(email:string,newPassword:string):Observable<any>{
    return this._httpClient.put(`${this._BASE_URL}/auth/resetPassword`,{email,newPassword})

  }



}
