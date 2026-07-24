import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideHttpClient( withFetch() ),
    //Para trabajar con el nuevo estandar del fetch, indicamos el withFetch()
    //Aquí estamos proveendo al cliente, que va a ser utilizado en los servicios de los gifs
  ]
};
