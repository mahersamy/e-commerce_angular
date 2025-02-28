import { Component, EventEmitter, inject, Input, Output, Signal } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInputComponent } from '../../../../../shared/components/ui/custom-input/custom-input.component';
import { ErrorMessageComponent } from '../../../../../shared/components/ui/error-message/error-message.component';

@Component({
  selector: 'app-reset-code',
  imports: [ReactiveFormsModule, CustomInputComponent, ErrorMessageComponent],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.scss'
})
export class ResetCodeComponent {

  private readonly _authServices=inject(AuthService);

  
  @Input({ required: true }) validEmail!: Signal<boolean>;
  @Output() validEmailChange = new EventEmitter<boolean>(); 
  @Output() validCodeChange = new EventEmitter<boolean>(); 

  isCallingApi:boolean=false;
  apiError!: string;

  resetForm: FormGroup = new FormGroup(
        {
          resetCode: new FormControl(null, [Validators.required, Validators.minLength(4)]),
        }
      );


  verifyResetCode(){
    this.isCallingApi=true;
    this._authServices.verifyResetCode(this.resetForm.get("resetCode")?.value).subscribe(
      {
        next:(res)=>{
          this.isCallingApi=false;
          this.validCodeChange.emit(true)
          this.validEmailChange.emit(false);
        },
        error:(err)=>{
          this.isCallingApi=false;
          this.validEmailChange.emit(false); // Correct way to notify the parent
          this.apiError = err.error.message;

        },
        complete:()=>{
         
        }
      }
    )
  }

}
