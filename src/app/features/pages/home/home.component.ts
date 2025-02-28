import { Component } from '@angular/core';
import { RecentProductsComponent } from "./components/recent-products/recent-products/recent-products.component";
import { NavbarComponent } from "../../../core/layouts/navbar/navbar.component";
import { CategoriesComponent } from "../categories/categories.component";
import { PopularCategoriesComponent } from "./components/popular-categories/popular-categories.component";
import { MainSliderComponent } from "./components/main-slider/main-slider.component";

@Component({
  selector: 'app-home',
  imports: [RecentProductsComponent, NavbarComponent,PopularCategoriesComponent, MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
