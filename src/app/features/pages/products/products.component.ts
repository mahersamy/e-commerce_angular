import { Product, ProductPage } from './../../interfaces/product-page';
import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent } from "../../../core/layouts/navbar/navbar.component";
import { ProductService } from '../../../shared/services/product/product.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductItemComponent } from '../../../shared/components/ui/product-item/product-item.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../../shared/services/cart/cart.service';
import { WishList } from '../../../shared/interfaces/wishlist';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [NavbarComponent, ProductItemComponent,NgxSpinnerModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
 

  private readonly _productService=inject(ProductService);
  private readonly _cartService=inject(CartService);
  private readonly _ngxSpinnerService=inject(NgxSpinnerService);
  private readonly  _wishlistService= inject(WishlistService);
  private readonly destroy$ = takeUntilDestroyed();
  
  
  wishlistReady = signal<boolean>(false);
  
  
  currentPage:number=1;
  productPage!:ProductPage;
  products!:Product[];
  wishList!:WishList;



  ngOnInit(): void {
    this.getPageOfProducts();
    this.getWishList();
  }


  getPageOfProducts(){
    this._ngxSpinnerService.show();
    this._productService.getPageOfProducts(this.currentPage).pipe(this.destroy$).subscribe({
      next:(res:any)=>{
        this.productPage=res;
        this.currentPage=this.productPage.metadata.currentPage
        this.products=this.productPage.data;

      },
      error:(err)=>{},
      complete:()=>{
        this._ngxSpinnerService.hide();
      }
    });
  }


  changePage(currentPage:number){
    this.currentPage=currentPage;
    this.getPageOfProducts();
    
  }

  addToCart(id:string){
    this._cartService.addToCart(id).subscribe({
      next:(res)=>{
        this._cartService.cartNumber.set(res.numOfCartItems);
      }
    });
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
