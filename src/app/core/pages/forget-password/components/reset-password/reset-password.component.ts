import { AppRoutes } from './../../../../const/app-routes-name';
import { Component, EventEmitter, inject, Input, Output, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';
import { CustomInputComponent } from '../../../../../shared/components/ui/custom-input/custom-input.component';
import { ErrorMessageComponent } from '../../../../../shared/components/ui/error-message/error-message.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, CustomInputComponent, ErrorMessageComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  private readonly _authServices=inject(AuthService);
  private readonly _router=inject(Router);
  
    
    @Input({ required: true }) validCode!: Signal<boolean>;
    @Output() validCodeChange = new EventEmitter<boolean>(); // Output event to notify parent


    appRoutes=AppRoutes;
    isCallingApi:boolean=false;
    apiError!: string;
  
    resetPasswordForm: FormGroup = new FormGroup(
          {
            email: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            newPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
          }
        );
  
  
    setNewPassword(){
      this.isCallingApi=true;
      this._authServices.resetPassword(this.resetPasswordForm.get("email")?.value,this.resetPasswordForm.get("newPassword")?.value).subscribe(
        {
          next:(res)=>{
            this.isCallingApi=false;
            this._router.navigate([this.appRoutes.AUTH,this.appRoutes.LOGIN]);
            
          },
          error:(err)=>{
            this.isCallingApi=false;
            this.validCodeChange.emit(false); // Correct way to notify the parent
            this.apiError = err.error.message;
  
          },
          complete:()=>{
           
          }
        }
      )
    }
}
