import { OwlOptions } from './../../../../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../../shared/services/categories/categories.service';
import { Category } from '../../../../../shared/interfaces/category';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss'
})
export class PopularCategoriesComponent implements OnInit {
  private readonly _categoriesService=inject(CategoriesService);
  categories!:Category[];
  private readonly destroy$ = takeUntilDestroyed();

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  
  ngOnInit(): void {
    this.getCategories();

  }

  getCategories():void{
    this._categoriesService.getCategories().pipe(this.destroy$).subscribe(
      {
        next:(res:any)=>{
          this.categories=res.data;
        },
        error:(error)=>{
          console.log("error")
        },
        complete:()=>{}
      }
    );
  }
  
}
