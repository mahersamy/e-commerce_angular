import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Cart } from '../../interfaces/cart';
import { NavbarComponent } from "../../../core/layouts/navbar/navbar.component";
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AppRoutes } from '../../../core/const/app-routes-name';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carts',
  imports: [NavbarComponent,NgxSpinnerModule,RouterLink],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.scss'
})
export class CartsComponent implements OnInit {
 
  private readonly _ngxSpinnerService=inject(NgxSpinnerService) 
  private readonly _cartService= inject(CartService);
  private readonly destroy$ = takeUntilDestroyed();

  appRoutes=AppRoutes;
  cart!:Cart;




  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this._ngxSpinnerService.show()
    this._cartService.getLoggedUserCart().pipe(this.destroy$).subscribe(
      {
        next:(res:any)=>{
          this.cart=res;
          this._ngxSpinnerService.hide()

        },
        error:(err)=>{
          this._ngxSpinnerService.hide()
        },
        complete:()=>{}
      }
    )

  }


  changeCount(id:string,count:string){
    this._ngxSpinnerService.show()
    this._cartService.updateProductQuanitity(id,count).pipe(this.destroy$).subscribe({
      next:(res:any)=>{
        this.cart=res;
        this._cartService.cartNumber.set(this.cart.numOfCartItems);
        this._ngxSpinnerService.hide()

      },
      error:(err)=>{
        this._ngxSpinnerService.hide()

      },
    })
  }


  deleteCount(id:string){
    this._ngxSpinnerService.show()
    this._cartService.deleteProductFromCart(id).pipe(this.destroy$).subscribe({
      next:(res:any)=>{
        this.cart=res;
        this._cartService.cartNumber.set(this.cart.numOfCartItems);
        this._ngxSpinnerService.hide()

      },
      error:(err)=>{
        this._ngxSpinnerService.hide()

      },
    })
  }

  clearCart(){
    this._ngxSpinnerService.show()
    this._cartService.clearCart().pipe(this.destroy$).subscribe({
      next:(res:any)=>{
        this.cart=res;
        this._cartService.cartNumber.set(this.cart.numOfCartItems);
        this._ngxSpinnerService.hide()

      },
      error:(err)=>{
        this._ngxSpinnerService.hide()

      },
    })
  }

}
