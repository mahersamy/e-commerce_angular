import { Component, inject, OnInit, signal } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WishList } from '../../../shared/interfaces/wishlist';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ProductItemComponent } from '../../../shared/components/ui/product-item/product-item.component';
import { CartService } from '../../../shared/services/cart/cart.service';
import { NavbarComponent } from '../../../core/layouts/navbar/navbar.component';

@Component({
  selector: 'app-wishlist',
  imports: [ProductItemComponent,NgxSpinnerModule,NavbarComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  
  

  private readonly _ngxSpinnerService=inject(NgxSpinnerService);
  private readonly  _wishlistService= inject(WishlistService);
  private readonly  _cartService= inject(CartService);
  
  private readonly destroy$ = takeUntilDestroyed();
  wishList!:WishList;
  wishlistReady = signal<boolean>(false);
  
  
  ngOnInit(): void {
   this.getWishList()
  }

  addToCart(id:string){
    this._cartService.addToCart(id).pipe(this.destroy$).subscribe(
      {
        next:(res:any)=>{
          this._cartService.cartNumber.set(res.numOfCartItems);
        },
        error:(err)=>{},
        complete:()=>{}

      }
    )

  }

  // git with
  getWishList(){
    this._ngxSpinnerService.show();
    this._wishlistService.getAllWishList().pipe(this.destroy$).subscribe(
     {
       next:(res:any)=>{
         this.wishList=res;
         this.wishlistReady.set(true);
         this._ngxSpinnerService.hide();

       }
     }
    )
 
   }

   isLove(id:string):boolean{
    for (let index = 0; index < this.wishList?.data.length; index++) {
     if(this.wishList.data[index].id===id){
       return true;
     }
    
     
    }
    return false;
   }
 
}
