import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../const/app-routes-name';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ErrorMessageComponent } from "../../../shared/components/ui/error-message/error-message.component";
import { CustomInputComponent } from "../../../shared/components/ui/custom-input/custom-input.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ErrorMessageComponent, CustomInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent{
  apiError!:string;
  isCallingApi:boolean=false;
  
  registerForm:FormGroup=new FormGroup(
    {
      name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required,Validators.pattern(/^[\w]{6,}$/)]),
      rePassword:new FormControl(null,[Validators.required]),
      phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    },{validators:[this.validateRePassword]}
  );

  private readonly destroy$ = takeUntilDestroyed();


  _router=inject(Router);
  _authService=inject(AuthService);

  register():void{
    if(this.registerForm?.invalid){
      this.registerForm.markAllAsTouched();
      console.log(this.registerForm.get("phone")?.getError("pattern").requiredPattern==="/^01[0125][0-9]{8}$/");
    }else{
      
      this.apiError='';
      if(this.isCallingApi==false){
        this.isCallingApi=true
        this._authService.registerUser(this.registerForm.value).pipe(this.destroy$).subscribe({
          next:(res)=>{
            this.registerForm.reset();
            this.isCallingApi=false;
            this._router.navigate([AppRoutes.AUTH,AppRoutes.LOGIN])
          },
          error:(err)=>{
            this.apiError=err.error.message;
            this.isCallingApi=false;
          },
          complete:()=>{
            console.log("compeleted");
            
  
          },
        })
      }
      
      
    }
  }

  validateRePassword(form:AbstractControl){
    const password=form.get('password')?.value;
    const rePassword=form.get('rePassword')?.value;
    if(password===rePassword){
      return null;
    }else{
      return {misMatch:true}
    }


  }
}
