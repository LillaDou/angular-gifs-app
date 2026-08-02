import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  imports: [
  
  ],
  templateUrl: './trending-page.html',
})
export default class TrendingPage {

  gifService = inject( GifService );
  // Con esto, Angular va a verificar si hay una instancia del GifSevice ya creada. 
  // En caso de que sí haya, va a regresar e inyectar esa instancia aquí con la información que tenga. 
  // Si no haya una instancia, creará una nueva por mi.

  scrollDivRef = viewChild<ElementRef>('groupDiv');
  // El viewChild o viewChildren nos van a ayudar a tomar información o referencias de partes
  // del HTML. El viewChild es solo para un elemento, el viewChildren cuando tenemos más de un 
  // elemento

  onScroll( event: Event ) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    console.log(scrollDiv);

  }


}
