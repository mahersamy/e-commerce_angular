import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CustomInputComponent } from "../../../shared/components/ui/custom-input/custom-input.component";
import { ErrorMessageComponent } from "../../../shared/components/ui/error-message/error-message.component";
import { AuthService } from '../../services/auth/auth.service';
import { ResetCodeComponent } from "./components/reset-code/reset-code.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, CustomInputComponent, ErrorMessageComponent, ResetCodeComponent, ResetPasswordComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent{
  
  private readonly _authServices=inject(AuthService);

  validEmail = signal(false);
  validCode = signal(false);
  isCallingApi:boolean=false;
  apiError!: string;


  forgetForm: FormGroup = new FormGroup(
      {
        email: new FormControl("mahersamy699@yahoo.com", [Validators.required, Validators.email]),
      }
    );


   


    forgetPassword(){
      this.isCallingApi=true;
      
      this._authServices.forgetPassword(this.forgetForm.get("email")?.value).subscribe(
        {
          next:(res)=>{
            this.isCallingApi=false;
            this.validEmail.set(true); // Ensure it updates every time

          },
          error:(err)=>{
            this.isCallingApi=false;
            this.apiError = err.error.message;

          },
          complete:()=>{
           
          }
        }
      )
    }




}
