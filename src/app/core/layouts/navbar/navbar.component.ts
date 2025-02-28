import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {AppRoutes} from "../../const/app-routes-name";
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  
  private readonly _authService=inject(AuthService);
  private readonly _cartService=inject(CartService);
  private readonly _router=inject(Router);
  private readonly destroy$ = takeUntilDestroyed();
  
  isLogin:boolean=false;
  isShow:boolean=true;
  countCart=computed(()=>this._cartService.cartNumber());
  appRoutes = AppRoutes;


  ngOnInit(): void {
    this.getUserData();
    this.getLogedUserCart();
   

  }

  getUserData(){
    this._authService.userData.pipe(this.destroy$).subscribe({
      next: (res:any) => {
        this.isLogin = res ? true : false;

        

      },
      error: (err:any) => {
        console.error('Error fetching user data:', err);
      },
    });
  }


  getLogedUserCart(){
    this._cartService.getLoggedUserCart().pipe(this.destroy$).subscribe(
      {
        next:(res:any)=>{
          this._cartService.cartNumber.set(res.numOfCartItems);
          
        },
        error:(err)=>{}
      }
    )
  }


  signOut():void{
    this._authService.userData.next(null);
    localStorage.clear();
    this.isLogin=false;
    this._router.navigate([this.appRoutes.AUTH,this.appRoutes.LOGIN]);

  }


  changeHidden(){
    this.isShow=!this.isShow;
  }

}
