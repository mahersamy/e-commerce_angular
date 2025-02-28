import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AppRoutes } from '../../const/app-routes-name';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ErrorMessageComponent } from '../../../shared/components/ui/error-message/error-message.component';
import { CustomInputComponent } from "../../../shared/components/ui/custom-input/custom-input.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ErrorMessageComponent, CustomInputComponent,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly destroy$ = takeUntilDestroyed();
  private readonly _router = inject(Router);
  private readonly  _authService = inject(AuthService);
  appRoutes=AppRoutes;
  apiError!: string;
  isCallingApi: boolean = false;
  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl("mahersamy699@yahoo.com", [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^[\w]{6,}$/)]),
    }
  );

  logIn(): void {
    if (this.loginForm?.invalid) {
      this.loginForm.markAllAsTouched();
    } else {

      this.apiError = '';
      if (this.isCallingApi == false) {
        this.isCallingApi = true
        this._authService.loginUser(this.loginForm.value).pipe(this.destroy$).subscribe({
          next: (res: any) => {
            this.loginForm.reset();
            this.isCallingApi = false;
            localStorage.setItem("userToken", res.token)
            this._authService.saveUser();
            this._router.navigate(["/", AppRoutes.HOME])
          },
          error: (err) => {
            this.apiError = err.error.message;
            this.isCallingApi = false;
          },
          complete: () => {
            console.log("compeleted");


          },
        })
      }


    }
  }

}
