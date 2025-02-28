import { Data } from './../../interfaces/cart';
import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../services/brands/brands.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Brand } from '../../../shared/interfaces/brand';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NavbarComponent } from "../../../core/layouts/navbar/navbar.component";

@Component({
  selector: 'app-brand',
  imports: [NgxSpinnerModule, NavbarComponent],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent implements OnInit{

    private readonly _ngxSpinnerService=inject(NgxSpinnerService) 
    private readonly _brandsService = inject(BrandsService);
    private readonly destroy$ = takeUntilDestroyed();
    brands!:Brand[];
  
    ngOnInit(): void {
      this.getAllBrands()
    }

    getAllBrands(){
      this._ngxSpinnerService.show()
      this._brandsService.getAllBrands().pipe(this.destroy$).subscribe({
        next:(res:any)=>{
          this.brands=res.data;
        },
        error:(err)=>{},
        complete:()=>{
          this._ngxSpinnerService.hide()
        }
      });
    }

    
}
