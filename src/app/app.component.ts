import { routes } from './app.routes';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FlowbiteService } from './shared/services/flowbite.service';
import { NavbarComponent } from "./core/layouts/navbar/navbar.component";
import { FooterComponent } from "./core/layouts/footer/footer.component";
import { AuthService } from './core/services/auth/auth.service';
import { AppRoutes } from './core/const/app-routes-name';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet , FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'fresh-cart';
  private readonly _flowbiteService= inject(FlowbiteService);
  private readonly _authService=inject(AuthService);
  private readonly _router=inject(Router);
  

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded', flowbite);
    });

    if(this._authService.isLogedInUser()){
      // this._router.navigate(["/",AppRoutes.HOME])
    }
  }
}
