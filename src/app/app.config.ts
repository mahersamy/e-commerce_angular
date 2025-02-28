import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {API_BASE_URL} from './core/token/api-token';

import {environment} from './core/environment/environment'
import { tokenInterceptor } from './core/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withHashLocation()),
    
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([tokenInterceptor])),
    importProvidersFrom(BrowserAnimationsModule),
    
    {
      provide:API_BASE_URL,
      useValue:environment.baseUrl

    }
  ],

};
