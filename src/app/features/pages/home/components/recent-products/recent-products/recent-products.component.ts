import { Product } from './../../../../../../shared/interfaces/product';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../../../../shared/services/product/product.service';
import { ProductItemComponent } from "../../../../../../shared/components/ui/product-item/product-item.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../../../../../shared/services/cart/cart.service';
import { WishlistService } from '../../../../../../shared/services/wishlist/wishlist.service';
import { WishList } from '../../../../../../shared/interfaces/wishlist';

@Component({
  selector: 'app-recent-products',
  imports: [ProductItemComponent,NgxSpinnerModule],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.scss'
})
export class RecentProductsComponent implements OnInit {
  private readonly _ngxSpinnerService=inject(NgxSpinnerService);
  private readonly _productService = inject(ProductService);
  private readonly  _cartService= inject(CartService);
  private readonly  _wishlistService= inject(WishlistService);
  private readonly destroy$ = takeUntilDestroyed();


  products!: Product[];
  wishList!:WishList;
  wishlistReady = signal<boolean>(false); // Track wishlist status



  ngOnInit(): void {
    this.getProducts();
    this.getWishList();
   
  }



  getProducts(): void {
    this._ngxSpinnerService.show();
    this._productService.getProducts().pipe(this.destroy$).subscribe(
      {
        next: (res:any) => {
          this.products = res.data

        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {
          this._ngxSpinnerService.hide();

        }
      }
    )
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




  getWishList(){
   this._wishlistService.getAllWishList().pipe(this.destroy$).subscribe(
    {
      next:(res:any)=>{
        this.wishList=res;
        this.wishlistReady.set(true);
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
