import { AppRoutes } from './../../../../core/const/app-routes-name';
import { RouterLink } from '@angular/router';
import { Product } from './../../../interfaces/product';
import { Component, EventEmitter, inject, input, Input, InputSignal, OnInit, Output, signal, WritableSignal,  } from '@angular/core';
import { WishlistService } from '../../../services/wishlist/wishlist.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit {
appRoutes=AppRoutes;
private readonly  _wishlistService= inject(WishlistService);
private readonly destroy$ = takeUntilDestroyed();

  
@Input() product!:Product;

isWishList:InputSignal<boolean | undefined>=input<boolean>();
localWishList:WritableSignal<boolean> = signal<boolean>(false);



@Output() fireAddToCart:EventEmitter<string>=new EventEmitter();


handelAddToCart(id:string){
  this.fireAddToCart.emit(id);
  
}




ngOnInit() {
  this.localWishList.set(this.isWishList()!);
}





addToWishList(id:string){
  
  this._wishlistService.addProductToWishList(id).pipe(this.destroy$).subscribe(
   {
     next:(res)=>{
       console.log(res);
     }
   }
  )

 }



 deleteWishList(id:string){
  this._wishlistService.deleteProductToWishList(id).pipe(this.destroy$).subscribe(
   {
     next:(res:any)=>{
     }
   }
  )

 }


toggleWishlist(event:Event){
  
  event.preventDefault(); // Prevents default link behavior
  event.stopPropagation(); // Prevents event bubbling
  if(this.localWishList()){
    this.deleteWishList(this.product._id);
  }else{
    this.addToWishList(this.product._id);

  }
  this.localWishList.update((prev)=>!prev);
}



  
  

}
