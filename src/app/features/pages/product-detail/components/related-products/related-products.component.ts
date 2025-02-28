import { Component , inject, Input, input, OnInit } from '@angular/core';
import { Product } from '../../../../../shared/interfaces/product';
import { ProductService } from '../../../../../shared/services/product/product.service';
import { ProductItemComponent } from '../../../../../shared/components/ui/product-item/product-item.component';

@Component({
  selector: 'app-related-products',
  imports: [ProductItemComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.scss'
})
export class RelatedProductsComponent implements OnInit{
 
  @Input({required:true}) id!:string;
  private readonly _productService = inject(ProductService);
  products!: Product[];
  


  ngOnInit(): void {
    this.getAllRelatedProduct();
  }

  getAllRelatedProduct(){
    this._productService.getRelatedProducts(this.id).subscribe(
      {
        next:(res)=>{
          this.products=res.data;
        },
        error:(error)=>{
        },
        complete:()=>{}
      }
    );
  }

}
