import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRoutes } from '../../../../../core/const/app-routes-name';

@Component({
  selector: 'app-prouduct-notfound',
  imports: [RouterLink],
  templateUrl: './prouduct-notfound.component.html',
  styleUrl: './prouduct-notfound.component.scss'
})
export class ProuductNotfoundComponent {
  appRoutes=AppRoutes;
}
