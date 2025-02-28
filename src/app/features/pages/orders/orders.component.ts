import { Order } from './../../interfaces/order';
import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../core/layouts/navbar/navbar.component";
import { OrderService } from '../../../shared/services/order/order.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProuductNotfoundComponent } from '../product-detail/components/prouduct-notfound/prouduct-notfound.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { RelatedProductsComponent } from '../product-detail/components/related-products/related-products.component';

@Component({
  selector: 'app-orders',
  imports: [NavbarComponent, NgxSpinnerModule, RelatedProductsComponent, ProuductNotfoundComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  private readonly _orderService = inject(OrderService);
  private readonly _authService = inject(AuthService);
  private readonly _ngxSpinnerService=inject(NgxSpinnerService) 
  
  private readonly destroy$ = takeUntilDestroyed();


  orders!:Order[];
  isLoading:boolean=false;

  ngOnInit(): void {
    this.getAllOrders();
  }
  getAllOrders() {
    this._ngxSpinnerService.show();
    this._authService.userData.pipe(this.destroy$).subscribe(
      {
        next: (res: any) => {
          this._orderService.getAllUsersOrders(res.id).pipe(this.destroy$).subscribe({
            next: (res:any) => {
              this.orders=res;
              this.isLoading=false;
              this._ngxSpinnerService.hide();


            }
          }
        );


        },


      }
    )

  }

}
