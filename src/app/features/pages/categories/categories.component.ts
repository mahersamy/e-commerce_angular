import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories/categories.service';
import { Category } from '../../../shared/interfaces/category';
import { NavbarComponent } from "../../../core/layouts/navbar/navbar.component";
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  imports: [NgxSpinnerModule,NavbarComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  private readonly _ngxSpinnerService=inject(NgxSpinnerService);
  private readonly _categoriesService=inject(CategoriesService);
  private readonly destroy$=takeUntilDestroyed();
  categories!:Category[];


  ngOnInit(): void {
  this.getAllCategories();
  }

  getAllCategories(){
    this._ngxSpinnerService.show();
    this._categoriesService.getAllCategories().pipe(this.destroy$).subscribe(
      {
        next:(res:any)=>{
          this.categories=res.data;
          this._ngxSpinnerService.hide();
        },
        error:(err)=>{
          this._ngxSpinnerService.hide();

        }
      }
    )
  }
  }
