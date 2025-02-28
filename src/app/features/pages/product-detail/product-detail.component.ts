import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../../core/layouts/navbar/navbar.component';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { RelatedProductsComponent } from "./components/related-products/related-products.component";
import { ProuductNotfoundComponent } from "./components/prouduct-notfound/prouduct-notfound.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartService } from '../../../shared/services/cart/cart.service';


@Component({
  selector: 'app-product-detail',
  imports: [NavbarComponent, NgxSpinnerModule, RelatedProductsComponent, ProuductNotfoundComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  private readonly _ngxSpinnerService=inject(NgxSpinnerService) 
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productService = inject(ProductService);
  private readonly  _cartService= inject(CartService);

  private readonly destroy$ = takeUntilDestroyed();


  product!: Product;
  id!:string;
  err!:string;

  isLoading!:boolean;


  ngOnInit(): void {
    this.getId();
    this.getProduct(this.id);
  }


  getId() {
    this._activatedRoute.paramMap.pipe(this.destroy$).subscribe(
      {
        next: (res:any) => {
          this.id=res.params.id;
        },
        error: (error) => { 
         
          
        },
        complete: () => { 
        }
      }
    )
  }

  getProduct(id: string) {
    this._ngxSpinnerService.show();

    this._productService.getProductById(id).pipe(this.destroy$).subscribe(
      {
        next: (res:any) => {
          this.product = res.data;
          console.log(this.product);

        },
        error: (error) => { 
          this.err=error.message;
          this._ngxSpinnerService.hide();
        },
        complete: () => { 
          this._ngxSpinnerService.hide();

        }
      }
    )
  }


  addToCart(id:string){
    this.isLoading=true;
    this._cartService.addToCart(id).pipe(this.destroy$).subscribe(
      {
        next:(res)=>{
          this.isLoading=false;
        },
        error:(err)=>{
          this.isLoading=false;
        },
        complete:()=>{}

      }
    )

  }

  changeImage(img:string):void{
    this.product.imageCover=img;
  }

}
