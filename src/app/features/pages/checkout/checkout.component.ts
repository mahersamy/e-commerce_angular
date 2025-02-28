import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../core/layouts/navbar/navbar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from '../../../shared/components/ui/error-message/error-message.component';
import { CustomInputComponent } from '../../../shared/components/ui/custom-input/custom-input.component';
import { OrderService } from '../../../shared/services/order/order.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppRoutes } from '../../../core/const/app-routes-name';

@Component({
  selector: 'app-checkout',
  imports: [NavbarComponent,ReactiveFormsModule, ErrorMessageComponent, CustomInputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  
  private readonly _activatedRoute=inject(ActivatedRoute);
  private readonly _orderService=inject(OrderService);
  private readonly _router=inject(Router);
  private readonly destroy$ = takeUntilDestroyed();


  cardId!:string;
  checkoutForm!:FormGroup;
  isCallingApi:boolean=false;
  isOnlinePayment:boolean=false;


  ngOnInit(): void {
    this.getCartId();
    this.initForm();
  }

  getCartId(){
    this.cardId=this._activatedRoute.snapshot.params['cartId'];
  }


  initForm(){
    this.checkoutForm= new FormGroup({
      address:new FormControl(null,[Validators.minLength(6)]),
      city:new FormControl(null,[Validators.minLength(6)]),
      phone:new FormControl(null,[Validators.pattern(/^01[0125][0-9]{8}$/)]),
      
    })
  }


  compeleteOrderCash(){
    this.isCallingApi=true
    this._orderService.cashOrder(this.cardId,this.checkoutForm.value).pipe(this.destroy$).subscribe({
      next:(res)=>{
        this.isCallingApi=false;
        this._router.navigate(['/',AppRoutes.HOME])
      },
      error:(err)=>{
        this.isCallingApi=false;
      }
    })
  }


  onlinePay(){
    this._orderService.onlinePayment(this.cardId,this.checkoutForm.value).pipe(this.destroy$).subscribe(
      {
        next:(res:any)=>{
          this.isCallingApi=false;
          open(res.session.url)
        },
        error:(err)=>{
          this.isCallingApi=false;
        }
      }
    )
  }


  setPaymentMethod(isOnline: boolean) {
    this.isOnlinePayment = isOnline;
  }

  submitOrder() {
    if (this.isOnlinePayment) {
      this.onlinePay();
    } else {
      this.compeleteOrderCash();
    }
  }


}
