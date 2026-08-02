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

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');
  // El viewChild o viewChildren nos van a ayudar a tomar información o referencias de partes
  // del HTML. El viewChild es solo para un elemento, el viewChildren cuando tenemos más de un 
  // elemento

  onScroll( event: Event ) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if ( !scrollDiv ) return;

    const scrollTop = scrollDiv.scrollTop; // Posición que tenemos de scroll en un momento concreto
    const clientHeight = scrollDiv.clientHeight; // Cuánto espacio tiene la pantalla (viewport/viewpoint)
    const scrollHeight = scrollDiv.scrollHeight;//Tamaño máximo de scroll posible

    // console.log({scrollTotal: scrollTop +  clientHeight, scrollHeight})
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;
    console.log({isAtBottom})

    if( isAtBottom ) {
      this.gifService.loadTrendingGifs();
    }
  }


}
